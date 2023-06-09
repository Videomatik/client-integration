import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import {
  IoPause, IoPlay, // IoVolumeMute, IoVolumeHigh,
} from 'react-icons/io5'
import {
  Box,
  IconButton,
  CircularProgress,
  Slider,
} from '@mui/material'
import RenderVideoButton from '../RenderVideoButton'
import VideomatikPreview from './VideomatikPreview'
import awaitSeek from './awaitSeek'

const ASPECT_RATIO = 9 / 16

function AnimationSlider({
  currentTime,
  setCurrentTime,
  setLoading,
  duration,
  playerRef,
}) {
  const [seekValue, setSeekValue] = useState(null)
  const [isSeeking, setIsSeeking] = useState(false)

  const value = useMemo(() => {
    if (!duration) {
      return 0
    }

    if (isSeeking) {
      return seekValue
    }

    return (currentTime / duration) * 100
  }, [
    duration,
    isSeeking,
    seekValue,
    currentTime,
  ])

  const onChange = useCallback((event, newPercent) => {
    setIsSeeking(true)
    setSeekValue(newPercent)
    setCurrentTime((newPercent / 100) * duration)
  }, [])

  const onChangeEnd = useCallback(async () => {
    setLoading(true)
    const seekTime = (seekValue * duration) / 100
    playerRef.current?.seekTo(seekTime)
    await awaitSeek(playerRef, seekTime)
    setIsSeeking(false)
    setLoading(false)
  }, [seekValue])

  return (
    <>
      <Slider
        value={value}
        size="small"
        onChange={onChange}
        onChangeCommitted={onChangeEnd}
        sx={{
          transition: 'none',
        }}
      />
      <style jsx>
        {`
        :global(.MuiSlider-root .MuiSlider-track), :global(.MuiSlider-root .MuiSlider-thumb) {
          transition: none; 
        }
        `}
      </style>
    </>
  )
}

AnimationSlider.propTypes = {
  currentTime: PropTypes.number,
  setCurrentTime: PropTypes.func,
  setLoading: PropTypes.func,
  duration: PropTypes.number,
  playerRef: PropTypes.object,
}

export default function PreviewPlayer({ templateId, data }) {
  const playerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [duration, setDuration] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(null)
  // eslint-disable-next-line
  const [muted, setMuted] = useState(true)
  // eslint-disable-next-line
  const [interacted, setInteracted] = useState(false)
  const [controlsWidth, setControlsWidth] = useState(0)
  // const isInitialized = currentTime !== null

  const iconButtonComponent = useMemo(() => {
    if (loading) {
      return <CircularProgress size={24} />
    }

    if (isPlaying) {
      return <IoPause />
    }

    return <IoPlay />
  }, [loading, isPlaying])

  const toggleMute = useCallback(() => {
    setMuted((currentMuted) => {
      const player = playerRef.current
      if (!player) {
        return currentMuted
      }

      const nextMuted = !currentMuted
      player.iframe.contentWindow.postMessage({
        action: 'setMuted',
        payload: { muted: nextMuted },
      }, '*')
      return nextMuted
    })
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      height="100%"
      position="relative"
    >
      <VideomatikPreview
        ref={playerRef}
        data={data}
        templateId={templateId}
        composition="default"
        playing={isPlaying}
        setCurrentTime={setCurrentTime}
        setLoading={setLoading}
        setDuration={setDuration}
        setIsPlaying={setIsPlaying}
        aspectRatio={ASPECT_RATIO}
        setControlsWidth={setControlsWidth}
        onInteract={() => {
          const player = playerRef.current
          if (!player || player.interacted) {
            return
          }

          player.interacted = true

          const { playerState } = player

          setInteracted(true)
          toggleMute()

          // The browser may auto pause the player, so we need to force to to play here
          if (playerState === 'playing') {
            setTimeout(() => {
              player.play()
            }, 500)
          }
        }}
      />
      <Box display="flex" gap={2} width={controlsWidth}>
        <IconButton
          onClick={() => setIsPlaying((currentIsPlaying) => !currentIsPlaying)}
        >
          {iconButtonComponent}
        </IconButton>
        <Box display="flex" alignItems="center" width="100%" paddingRight={2}>
          <AnimationSlider
            playerRef={playerRef}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            setLoading={setLoading}
            duration={duration}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" width={controlsWidth}>
        <RenderVideoButton
          productData={data}
        />
      </Box>
      {/* Only use this on templates with audio */}
      {/* {isInitialized && (
        <IconButton
          onClick={toggleMute}
          sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            pointerEvents: !interacted ? 'none' : null,
          }}
        >
          {muted ? <IoVolumeMute /> : <IoVolumeHigh />}
        </IconButton>
      )} */}
    </Box>
  )
}

PreviewPlayer.propTypes = {
  templateId: PropTypes.string,
  data: PropTypes.object,
}
