import React from 'react';
import Icon from './icon'; // Import your custom Icon component
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

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
