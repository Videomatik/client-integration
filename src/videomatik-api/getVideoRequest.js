// for more information go to Videomatik Docs: https://app.videomatik.com.br/docs/#get-/v1/video-requests
import videomatikAPI from './videomatik'

const getVideoRequest = (templateId, customJSON, compositionId = 'default') => (
  videomatikAPI.createVideoRequest({
    templateId,
    customJSON,
    compositionId,
  })
)

module.exports = getVideoRequest
