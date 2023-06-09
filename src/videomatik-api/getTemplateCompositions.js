// for more information go to Videomatik Docs: https://app.videomatik.com.br/docs/#get-/v1/templates/-templateId-/compositions
import videomatikAPI from './videomatik'

const getTemplateCompositions = (templateId) => (
  videomatikAPI.getTemplateCompositions(templateId)
)

module.exports = getTemplateCompositions
