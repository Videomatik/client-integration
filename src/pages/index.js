// Example URL:
// http://localhost:3000/?name=produto&image=https%3A%2F%2Fstorage.videomatik.com.br%2Fvideomatik%2Ftemplates%2Foferta-varejo-nujyuua%2Fassets%2Fespykfb8--compressed-png.png&price=1000&description=description%20wfwg.rewn%20whfwheoiw&templateId=oferta-varejo-nujyuua

import { useRouter } from 'next/router'
import PreviewPlayer from '../components/preview-player/PreviewPlayer'

export default function Home() {
  const router = useRouter()
  const productData = router.query

  if (!productData.name) {
    return <div />
  }

  return (
    <div className="index-page">
      <PreviewPlayer
        templateId="oferta-varejo-nujyuua"
        data={productData}
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
