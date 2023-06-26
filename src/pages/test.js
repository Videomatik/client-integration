import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function TestPage() {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const productJson = JSON.stringify({
    name: productName,
    price: productPrice,
    description: productDescription,
    image: 'https://storage.videomatik.com.br/videomatik/templates/oferta-varejo-nujyuua/assets/espykfb8--compressed-png.png',
  })
  return (
    <Box padding={2}>
      <Box display="flex" gap={1} padding={2}>
        <TextField
          id="outlined-basic"
          label="Produto"
          variant="outlined"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Preço"
          variant="outlined"
          value={productPrice}
          onChange={(event) => setProductPrice(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Descrição"
          variant="outlined"
          value={productDescription}
          onChange={(event) => setProductDescription(event.target.value)}
        />
      </Box>
      <div>
        <iframe
          title="test-page"
          style={{ height: '800px', width: '800px' }}
          src={`http://localhost:3000/?data=${productJson}`}
        />

      </div>
    </Box>
  )
}
