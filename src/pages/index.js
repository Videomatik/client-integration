// Example URL:
// http://localhost:3000/?data={"name":"produto","templateId":"oferta-varejo-nujyuua","price":"1000", "description":"description fhergmeru rufghnerhg", "image":"https://storage.videomatik.com.br/videomatik/templates/oferta-varejo-nujyuua/assets/espykfb8--compressed-png.png"}

import { useMemo } from 'react'
import { useRouter } from 'next/router'
import PreviewPlayer from '../components/preview-player/PreviewPlayer'

export default function Home() {
  const router = useRouter()
  const { data } = router.query

  if (!data) {
    return 'URL Parameter (Data) is missing'
  }

  const dataJSON = useMemo(() => JSON.parse(data), [data])
  return (
    <div className="index-page">
      <PreviewPlayer
        templateId="oferta-varejo-nujyuua"
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
