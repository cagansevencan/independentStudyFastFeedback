import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { AuthProvider } from '@/lib/auth'
import customTheme from '@/styles/theme';


const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
        
          ::selection{
          background-color: #47a3f3
          color: #000000;
          }

          html {
            min-width: 360px;
            scroll-behavior: smooth;
            // background-color: #edf2f7;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
       
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
