import React from 'react';
import Icon from './Icon'; // Adjust the import path as needed
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  icon: IconDefinition;
  size: string;
  color: string;
}

function MyComponent() {
  return (
    <div>
      <Icon icon={faSun} size="2x" color="orange" />
      <Icon icon={faMoon} size="2x" color="gray" />
      {/* Other content */}
    </div>
  );
}

export default MyComponent;
