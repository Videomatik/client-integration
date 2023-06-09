// for more information go to Videomatik Docs: https://app.videomatik.com.br/docs/#get-/v1/templates/-templateId-/custom-json
import videomatikAPI from './videomatik'

const getTemplateCustomJson = (templateId) => (
  videomatikAPI.getTemplateCustomJSON(templateId)
)

module.exports = getTemplateCustomJson
