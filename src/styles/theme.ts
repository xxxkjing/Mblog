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
    modeIcon: JSX.Element; // Add modeIcon property to the Theme
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
  modeIcon: options.scheme === "light" ? <FontAwesomeIcon icon="sun" /> : <FontAwesomeIcon icon="moon" />, // Define modeIcon based on the scheme
});
