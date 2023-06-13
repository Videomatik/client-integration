// Example URL:
// http://localhost:3000/?data={"name":"produto","price":"1000", "description":"description fhergmeru rufghnerhg", "image":"https://storage.videomatik.com.br/videomatik/templates/oferta-varejo-nujyuua/assets/espykfb8--compressed-png.png"}

import { useMemo } from 'react'
import { useRouter } from 'next/router'
import PreviewPlayer from '../components/preview-player/PreviewPlayer'
import { templateId } from '../template'

export default function Home() {
  const router = useRouter()
  const { data } = router.query

  const dataJSON = useMemo(() => data && JSON.parse(data), [data])
  if (!data) {
    return (
      <>
        URL Parameter (Data) is missing
      </>
    )
  }
  return (
    <div className="index-page">
      <PreviewPlayer
        templateId={templateId}
        data={dataJSON}
      />
      <style jsx>
        {`
        .index-page {
          height: 100%;
        }
        `}
      </style>
    </div>
  )
}
