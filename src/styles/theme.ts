import { Theme } from "@emotion/react";
import { Colors, colors } from "./colors";
import { variables } from "./variables";
import { zIndexes } from "./zIndexes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Example import for FontAwesome icons

declare module "@emotion/react" {
  export interface Theme {
    scheme: Scheme;
    colors: Colors;
    zIndexes: typeof zIndexes;
    variables: typeof variables;
  }
}

export type Scheme = "light" | "dark";

type Options = {
  scheme: Scheme;
};

export const createTheme = (options: Options): Theme => ({
  scheme: options.scheme,
  colors: colors[options.scheme],
  variables: variables,
  zIndexes: zIndexes,
});

// Define icons for light and dark modes
const lightIcon = <FontAwesomeIcon icon="sun" />; // Example FontAwesome icon for light mode
const darkIcon = <FontAwesomeIcon icon="moon" />; // Example FontAwesome icon for dark mode

export const getModeIcon = (scheme: Scheme) => {
  return scheme === "light" ? lightIcon : darkIcon;
};
