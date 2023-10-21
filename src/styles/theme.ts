import { Theme } from "@emotion/react";
import { Colors, colors } from "./colors";
import { variables } from "./variables";
import { zIndexes } from "./zIndexes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

declare module "@emotion/react" {
  export interface Theme {
    scheme: Scheme;
    colors: Colors;
    zIndexes: typeof zIndexes;
    variables: typeof variables;
    modeIcon: IconDefinition;
  }
}

export type Scheme = "light" | "dark";

type Options = {
  scheme: Scheme;
};

export const createTheme = (options: Options): Theme => {
  library.add(faSun, faMoon); // Add FontAwesome icons to the library

  return {
    scheme: options.scheme,
    colors: colors[options.scheme],
    variables: variables,
    zIndexes: zIndexes,
    modeIcon: options.scheme === "light" ? faSun : faMoon,
  };
};
