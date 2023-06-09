// for more information go to Videomatik Docs: https://app.videomatik.com.br/docs/#post-/v1/video-requests
import videomatikAPI from './videomatik'

const postVideoRequest = ({ templateId, customJSON, compositionId = 'default' }) => (
  videomatikAPI.createVideoRequest({
    templateId,
    customJSON,
    compositionId,
  })
)

module.exports = postVideoRequest
