import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#eeeeee',
    },

    secondary: {
      main: '#eeeeee',
    },
  },
  typography: {
    body1: {
      fontWeight: 600,
    },
    link: {
      color: '#ffffff !important',
    },
  },
  components: {
    MuiTextField: {

    },
  },
})

export default theme
