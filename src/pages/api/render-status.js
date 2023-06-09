// Exemplo de URL da request
//
// http://localhost:3000/api/render-status?videoRequestId=342432532532

import videomatikAPI from '../../videomatikAPI'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const { videoRequestId } = req.query
  try {
    const videoRequest = await videomatikAPI.getOneVideoRequest(videoRequestId)
    res.status(200).json(videoRequest.renderJob)
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
  }
}
