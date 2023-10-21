import { Theme } from "@emotion/react";
import { Colors, colors } from "./colors";
import { variables } from "./variables";
import { zIndexes } from "./zIndexes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"; // Import the IconDefinition type

declare module "@emotion/react" {
  export interface Theme {
    scheme: Scheme;
    colors: Colors;
    zIndexes: typeof zIndexes;
    variables: typeof variables;
    modeIcon: IconDefinition; // Use IconDefinition for modeIcon
  }
}

export type Scheme = "light" | "dark";

type Options = {
  scheme: Scheme;
};

export const createTheme = (options: Options): Theme => {
  // Define functions to create FontAwesome icons
  const getSunIcon = () => <FontAwesomeIcon icon={["fas", "sun"]} />;
  const getMoonIcon = () => <FontAwesomeIcon icon={["fas", "moon"]} />;

  return {
    scheme: options.scheme,
    colors: colors[options.scheme],
    variables: variables,
    zIndexes: zIndexes,
    modeIcon: options.scheme === "light" ? getSunIcon() : getMoonIcon(),
  };
};
