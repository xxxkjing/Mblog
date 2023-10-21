import { Theme } from "@emotion/react";
import { Colors, colors } from "./colors";
import { variables } from "./variables";
import { zIndexes } from "./zIndexes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome from @fortawesome/react-fontawesome
import { IconDefinition } from "@fortawesome/fontawesome-common-types"; // Import IconDefinition for TypeScript typings

declare module "@emotion/react" {
  export interface Theme {
    scheme: Scheme;
    colors: Colors;
    zIndexes: typeof zIndexes;
    variables: typeof variables;
    modeIcon: IconDefinition; // Use IconDefinition for modeIcon property
  }
}

export type Scheme = "light" | "dark";

type Options = {
  scheme: Scheme;
};

export const createTheme = (options: Options): Theme => {
  const getSunIcon = (): IconDefinition => ["fas", "sun"];
  const getMoonIcon = (): IconDefinition => ["fas", "moon"];

  return {
    scheme: options.scheme,
    colors: colors[options.scheme],
    variables: variables,
    zIndexes: zIndexes,
    modeIcon: options.scheme === "light" ? getSunIcon() : getMoonIcon(),
  };
};
