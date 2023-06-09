// Example URL:
// http://localhost:3000/render/< video request id>
/* eslint-disable jsx-a11y/media-has-caption */

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Box,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material'

const FINISHED_RENDER_STATES = new Set(['finished', 'error'])
const isFinishedVideoRequest = (videoRequest) => FINISHED_RENDER_STATES.has(videoRequest.state)

const getVideoRequest = async (videoRequestId) => {
  const response = await axios.get('/api/render-status', {
    params: {
      videoRequestId,
    },
  })

  return response.data
}

const useVideoRequest = (videoRequestId) => {
  const [videoRequest, setVideoRequest] = useState({ state: 'queued', downloadURL: null })

  useEffect(() => {
    if (!videoRequestId) {
      return () => { }
    }

    const intervalId = setInterval(async () => {
      const updatedVideoRequest = await getVideoRequest(videoRequestId)
      setVideoRequest(updatedVideoRequest)

      if (isFinishedVideoRequest(updatedVideoRequest)) {
        clearInterval(intervalId)
      }
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [videoRequestId])

  return { videoRequest }
}

function CenterBox({ children }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%">
      {children}
    </Box>
  )
}

CenterBox.propTypes = {
  children: PropTypes.node,
}

export default function RenderPage() {
  const router = useRouter()
  const { videoRequestId } = router.query
  const { videoRequest } = useVideoRequest(videoRequestId)
  const videoIsReady = isFinishedVideoRequest(videoRequest)
  const videoIsErrored = videoRequest.state === 'error'

  if (!videoIsReady) {
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    )
  }

  if (videoIsErrored) {
    return (
      <CenterBox>
        <Alert severity="error">
          <AlertTitle>Oops, something went wrong!</AlertTitle>
          {videoRequest.error?.message || 'An unknown error has occurred'}
        </Alert>
      </CenterBox>
    )
  }

  return (
    <CenterBox>
      <video
        className="video"
        src={videoRequest.downloadURL}
        controls
      />
      <style jsx>
        {`
        .video {
          height: 100%;
        }
        `}
      </style>
    </CenterBox>
  )
}
