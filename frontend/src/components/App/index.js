import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";

import { Container } from "./styles";

import Header from "../Header";
import Routes from '../../Routes';

import ToastContainer from "../Toast/ToastContainer";

function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />
          <ToastContainer />
          <Container>
            <Header />
            <Routes />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </StyleSheetManager>
  );
}

export default App;
