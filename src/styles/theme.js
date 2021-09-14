import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#092435", //azul oscuro
    },
    secondary: {
      main: "#4A92A8", //azul palido
    },
    tertiary: {
      main: "#60CCD9", //turqueza
    },
    quaternary: {
      main: "#BBF0E8", //celestelight
    },
    quinary: {
      main: "#61908A", //verde
    },
    senary: {
      main: "#414A4F", //gris
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "100%",
      },
    },
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
  },
});

export default theme;
