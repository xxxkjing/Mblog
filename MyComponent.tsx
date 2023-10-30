import React from 'react';
import Icon from './Icon'; // This imports the Icon component from Icon.tsx
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const MyComponent: React.FC = () => {
  return (
    <div>
      <Icon icon={faSun} size="2x" color="orange" />
      <Icon icon={faMoon} size="2x" color="gray" />
      {/* Other content */}
    </div>
  );
}

export default MyComponent;

