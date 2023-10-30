import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  icon: IconDefinition;
  size?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ icon, size, color }) => {
  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
};

export default Icon;

