import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Props = {
  icon: IconDefinition; // FontAwesome icon definition
  className?: string;
  children?: ReactNode;
  size?: string; // FontAwesome size (e.g., 'lg', '2x', '3x', 'xs', etc.) or undefined
  color?: string; // FontAwesome icon color
};

const Icon = ({ icon, className, children, size, color = "currentColor" }: Props) => {
  return (
    <FontAwesomeIcon icon={icon} size={size} color={color} className={className}>
      {children}
    </FontAwesomeIcon>
  );
};

export default Icon;


