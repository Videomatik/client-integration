import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'transparent',
    },

    primary: {
      main: '#333',
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
    LoadingButton: {
      background: '#000',
    },
    MuiTextField: {

    },
  },
})

export default theme
