import { AppPropsWithLayout } from "../types";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { RootLayout } from "src/layouts";
import { queryClient } from "src/libs/react-query";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "../styles/theme";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import { library } from "@fortawesome/fontawesome-svg-core"; // Import the library

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  const theme = createTheme({ scheme: "light" }); // Create your theme

  // Initialize the FontAwesome library with the icons
  library.add(faSun, faMoon);

  // Use the FontAwesome icons for light and dark modes
  theme.modeIcon = theme.scheme === "light" ? faSun : faMoon;

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
