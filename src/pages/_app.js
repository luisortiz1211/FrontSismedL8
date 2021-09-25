import Appbar from "@/components/AppBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import "../styles/globals.css";
import theme from "../styles/theme";

export default function App(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>SISMED</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Appbar />

          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
