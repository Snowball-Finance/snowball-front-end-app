import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    // fontFamily: language === 'ar' ? 'ar' : 'Open Sans',
  },
  // direction: language === 'ar' ? 'rtl' : 'ltr',
  direction: 'ltr',
  palette: {
    secondary: {
      main: '#d20e42',
    },
    primary: {
      main: '#0085EB',
    },
    action: {
      disabledBackground: '#efefef',
      disabled: '#333333'
    }
  },
});

