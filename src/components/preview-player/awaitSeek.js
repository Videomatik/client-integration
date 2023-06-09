const NEAR_VALUE_THRESHOLD = 0.1
const isNearValue = (a, b) => Math.abs(a - b) <= NEAR_VALUE_THRESHOLD

const awaitSeek = (playerRef, time) => {
  if (!playerRef.current) {
    return null
  }

  return new Promise((resolve) => {
    let seekFinishInterval = null

    const resolveSeekFinish = () => {
      clearTimeout(seekFinishInterval)
      resolve()
    }

    const checkSeekFinished = () => {
      if (isNearValue(playerRef.current.currentTime, time)) {
        resolveSeekFinish()
      }
    }

    seekFinishInterval = setInterval(() => {
      checkSeekFinished()
    }, 1000 / 30)
    checkSeekFinished()

    // If the seek did not resolve within 3 seconds, consider it resolved
    setTimeout(resolveSeekFinish, 3000)
  })
}

export default awaitSeek
