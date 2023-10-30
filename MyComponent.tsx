import React from 'react';
import Icon from './src/components/Icon';
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

