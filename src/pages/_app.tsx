import { AppPropsWithLayout } from "../types";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { RootLayout } from "src/layouts";
import { queryClient } from "src/libs/react-query";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "../styles/theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// Initialize FontAwesome library with the icons
library.add(faSun, faMoon);

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Create your theme based on the selected scheme
  const theme = createTheme({ scheme: "light" });

  // Use the FontAwesome icons for light and dark modes
  theme.modeIcon = theme.scheme === "light" ? faSun : faMoon;

  // Define the layout to be used, or use the page component if not specified
  const getLayout = Component.getLayout || ((page) => page);

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

