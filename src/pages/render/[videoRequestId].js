import { useRouter } from 'next/router'

export default function RenderPage() {
  const router = useRouter()
  const { videoRequestId } = router.query
  return (
    <p style={{ color: 'white' }}>
      {videoRequestId}
    </p>
  )
}
