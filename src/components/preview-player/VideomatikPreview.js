// Videomatik Preview Documentation:
// https://github.com/Videomatik/player
import React, { useRef, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import useDimensions from 'react-use-dimensions'
import VideomatikPlayer from '@videomatik/player'

import useDebounce from './useDebounce'
import { getCustomJSON } from '../../template'

const CUSTOM_JSON_DEBOUNCE_TIME = 0
const RESIZE_DEBOUNCE_TIME = 300

const VideomatikPreview = forwardRef(({
  data: rawData,
  playing,
  templateId,
  composition,
  setIsPlaying,
  setCurrentTime,
  setControlsWidth,
  setLoading,
  setDuration,
  aspectRatio,
  onInteract,
  sx,
}, ref) => {
  const [previewDivRef, { height: currentHeight }] = useDimensions()

  // Avoid rapid changes to to animation getting the page too slow
  const debouncedData = useDebounce(rawData, CUSTOM_JSON_DEBOUNCE_TIME)
  const height = useDebounce(currentHeight, RESIZE_DEBOUNCE_TIME)

  const playerRef = useRef(null)

  useEffect(() => {
    const customJSON = getCustomJSON(debouncedData)
    // Videomatik Preview Documentation:
    // https://github.com/Videomatik/player
    playerRef.current = new VideomatikPlayer('#animation', {
      apiKey: process.env.VIDEOMATIK_API_KEY,
      templateId,
      compositionId: 'default',
      height,
      width: height * aspectRatio,
      customJSON,
    })
    // eslint-disable-next-line no-param-reassign
    ref.current = playerRef.current

    const onIFrameMessages = (event) => {
      const { data } = event
      switch (data.action) {
        case '_onLoad':
          setDuration(data.payload.duration)
          setLoading(false)
          break

        case 'currentTime':
          setCurrentTime(data.payload.currentTime)
          break

        case 'playerState':
          setIsPlaying(data.payload.playerState === 'playing')
          break

        default:
          break
      }
    }

    window.addEventListener('message', onIFrameMessages)

    const onIFrameInteract = () => {
      setTimeout(() => {
        if (document.activeElement.tagName === 'IFRAME') {
          onInteract()
        }
      })
    }
    // Reference:
    // https://stackoverflow.com/questions/2381336/detect-click-into-iframe-using-javascript
    window.addEventListener('blur', onIFrameInteract)
    setControlsWidth(height * aspectRatio)

    return () => {
      window.removeEventListener('message', onIFrameMessages)
      window.removeEventListener('blur', onIFrameInteract)
      playerRef.current.destroy()
      // eslint-disable-next-line no-param-reassign
      ref.current = null
    }
  }, [height])

  useEffect(() => {
    if (!playerRef.current) {
      return
    }

    if (playing) {
      playerRef.current.play()
      return
    }

    playerRef.current.pause()
  }, [playerRef.current, playing])

  useEffect(() => {
    if (!playerRef.current) {
      return
    }

    playerRef.current.setComposition(composition)
  }, [playerRef.current, composition])

  useEffect(() => {
    if (!playerRef.current) {
      return
    }
    const customJSON = getCustomJSON(debouncedData)
    playerRef.current.setCustomJSON(customJSON)
  }, [debouncedData])

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      height="100%"
      width={`${height * aspectRatio}px`}
      overflow="hidden"
      ref={previewDivRef}
      sx={sx}
    >
      {/*
        Keeping Animation as a position absolute ensures it will not lead to a loop
        in which it can lead to previewDivRef to change size and so on
      */}
      <Box
        id="animation"
        position="absolute"
      />
    </Box>
  )
})

VideomatikPreview.propTypes = {
  data: PropTypes.object,
  playing: PropTypes.bool,
  templateId: PropTypes.string,
  composition: PropTypes.string,
  setIsPlaying: PropTypes.func,
  setCurrentTime: PropTypes.func,
  setLoading: PropTypes.func,
  setControlsWidth: PropTypes.func,
  setDuration: PropTypes.func,
  aspectRatio: PropTypes.number,
  onInteract: PropTypes.func,
  sx: PropTypes.object,
}

export default React.memo(VideomatikPreview, (previousProps, nextProps) => (
  previousProps.data === nextProps.data
  && previousProps.playing === nextProps.playing
  && previousProps.templateId === nextProps.templateId
  && previousProps.composition === nextProps.composition
  && previousProps.aspectRatio === nextProps.aspectRatio
))
