import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'
import { templateId } from '../template'

export default function RenderVideoButton({ productData }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const renderVideo = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/render-video', { ...productData, templateId })
      const videoRequest = response.data
      router.push(`/render/${videoRequest.id}`)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <LoadingButton
      loading={isLoading}
      onClick={() => renderVideo()}
      variant="contained"
      color="secondary"
    >
      Render Video
    </LoadingButton>
  )
}

RenderVideoButton.propTypes = {
  productData: PropTypes.object,
}
