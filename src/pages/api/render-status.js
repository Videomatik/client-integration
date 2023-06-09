// Request querystring example on the url
//
// videoRequestId=<video request id>
// http://localhost:3000/api/render-status?videoRequestId=<video request id>

import videomatikAPI from '../../videomatikAPI'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const { videoRequestId } = req.query
  try {
    const videoRequest = await videomatikAPI.getOneVideoRequest(videoRequestId)
    // Response example:
    //
    // {
    //   "state": "waiting || "rendering" || "finished" || "error",
    //   "downloadURL": null  || "<url to download the video>"
    //   "error": {
    //     "code": null,
    //     "message": "Your CustomJSON is invalid"
    //   }
    // }
    res.status(200).json(videoRequest.renderJob)
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
  }
}
