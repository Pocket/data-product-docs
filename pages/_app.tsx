import React from 'react';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme'
import {Navigation} from "../components/navigation";
import Container from "@material-ui/core/Container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Navigation/>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
export default MyApp
