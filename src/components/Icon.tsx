import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  icon: IconDefinition;
  size?: SizeProp;  // Use SizeProp type here instead of string
  color?: string;
}

const Icon: React.FC<IconProps> = ({ icon, size, color }) => {
  // Since FontAwesomeIcon expects size to be SizeProp or undefined,
  // we cast size to SizeProp if it's not undefined.
  return <FontAwesomeIcon icon={icon} size={size as SizeProp | undefined} color={color} />;
};

export default Icon;
