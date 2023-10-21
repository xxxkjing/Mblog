import { AppPropsWithLayout } from "../types";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { RootLayout } from "src/layouts";
import { queryClient } from "src/libs/react-query";
import { ThemeProvider } from "@emotion/react"; // Import ThemeProvider
import { createTheme } from "../styles/theme"; // Import your theme configuration

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  const theme = createTheme({ scheme: "light" }); // Create your theme

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default App;

