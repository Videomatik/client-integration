// Exemplo de Body da request
//
// {
// 	"name": "produto",
// 	"image": "https://storage.videomatik.com.br/videomatik/templates/oferta-varejo-nujyuua/assets/espykfb8--compressed-png.png",
// 	"price": "1000",
// 	"description": "description wfwg.rewn whfwheoiw",
// 	"templateId": "oferta-varejo-nujyuua"
// }

import getCustomJSON from '../../getCustomJson'
import postVideoRequest from '../../videomatik-api/postVideoRequest'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const {
    templateId, name, image, description, price,
  } = req.body
  const customJSON = getCustomJSON(name, image, description, price)
  try {
    const videoRequest = await postVideoRequest({
      templateId,
      customJSON,
    })
    res.status(200).json(videoRequest)
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data)
      return
    }
    res.status(400).json({ error: error.message })
    console.log('err', error)
  }
}
