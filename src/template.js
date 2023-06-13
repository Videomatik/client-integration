// CustomJSON do template: https://app.videomatik.com.br/docs/#get-/v1/templates/-templateId-/custom-json
// videomatikApi.getTemplateCustomJSON(oferta-varejo-nujyuua)

const templateId = 'oferta-varejo-nujyuua'

const formatCurrency = (value) => value.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const getCustomJSON = ({
  name, image, description, price,
}) => {
  const formattedPriceNumber = formatCurrency(parseFloat(price))
  const formattedInstallmentPriceNumber = formatCurrency(parseFloat(price) / 10)
  return {
    soundtrack: {
      startTime: 0,
      source: '',
    },
    images: [
      {
        path: 'assets[0]',
        source: 'https://storage.videomatik.com.br/videomatik/templates/oferta-varejo-nujyuua/assets/oxdh6mre.png',
      },
      {
        path: 'assets[1]',
        source: image,
      },
    ],
    version: '1',
    texts: [
      {
        fillColor: '#ffffff',
        fontStyle: 'Bold',
        path: 'assets[3].layers[0].t.d.k[0]',
        fontWeight: '700',
        fontAscent: 71.5988159179688,
        hidden: null,
        time: 0,
        fontSize: 53,
        value: `ou 10x de R$ ${formattedInstallmentPriceNumber}`,
        justification: 'CENTER',
        fontFamily: 'Arial',
        stroke: null,
        fontName: 'Arial-BoldMT',
        lineHeight: 63.6,
      },
      {
        fillColor: '#ffffff',
        fontStyle: 'Bold',
        path: 'assets[3].layers[1].t.d.k[0]',
        fontWeight: '700',
        fontAscent: 71.5988159179688,
        hidden: null,
        time: 0,
        fontSize: 129,
        value: `R$ ${formattedPriceNumber}`,
        justification: 'CENTER',
        fontFamily: 'Arial',
        stroke: null,
        fontName: 'Arial-BoldMT',
        lineHeight: 154.8,
      },
      {
        fillColor: '#000000',
        fontStyle: 'Bold',
        path: 'assets[3].layers[3].t.d.k[0]',
        fontWeight: '700',
        fontAscent: 71.5988159179688,
        hidden: null,
        time: 0,
        fontSize: 31,
        value: description,
        justification: 'CENTER',
        fontFamily: 'Arial',
        stroke: null,
        fontName: 'Arial-BoldMT',
        lineHeight: 39,
      },
      {
        fillColor: '#000000',
        fontStyle: 'Bold',
        path: 'assets[3].layers[5].t.d.k[0]',
        fontWeight: '700',
        fontAscent: 71.5988159179688,
        hidden: null,
        time: 0,
        fontSize: 88,
        value: name,
        justification: 'CENTER',
        fontFamily: 'Arial',
        stroke: null,
        fontName: 'Arial-BoldMT',
        lineHeight: 98,
      },
      {
        fillColor: '#ffffff',
        fontStyle: 'Bold',
        path: 'assets[4].layers[2].t.d.k[0]',
        fontWeight: '700',
        fontAscent: 71.5988159179688,
        hidden: null,
        time: 0,
        fontSize: 134,
        value: 'APROVEITE\nAS OFERTAS',
        justification: 'CENTER',
        fontFamily: 'Arial',
        stroke: null,
        fontName: 'Arial-BoldMT',
        lineHeight: 151,
      },
    ],
    shapes: [
      {
        path: 'assets[2].layers[2].shapes[0].it[2]',
        color: '#aa1e0d',
      },
      {
        path: 'assets[3].layers[2].shapes[0].it[2]',
        color: '#aa1e0d',
      },
      {
        path: 'assets[3].layers[9].shapes[0].it[2]',
        color: '#aa1e0d',
        // shapes: [
        //   {
        //     path: 'layers[2].shapes[0].it[1]',
        //     color: '#db9300',
        //   },
        //   {
        //     path: 'layers[3].shapes[0].it[1]',
        //     color: '#ffffff',.it[2]',
        // color: '#ffffff',
      },
      {
        path: 'assets[4].layers[3].shapes[0].it[2]',
        color: '#aa1e0d',
      },
    ],
  }
}

module.exports = { templateId, getCustomJSON }
