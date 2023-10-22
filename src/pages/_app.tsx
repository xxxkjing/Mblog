import React from "react";
import { AppProps } from "next/app";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { queryClient } from "src/libs/react-query";
import { createTheme } from "../styles/theme";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import { library } from "@fortawesome/fontawesome-svg-core"; // Import the library

// Initialize FontAwesome library with the icons
library.add(faSun, faMoon);

function MyApp({ Component, pageProps }: AppProps) {
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
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;


