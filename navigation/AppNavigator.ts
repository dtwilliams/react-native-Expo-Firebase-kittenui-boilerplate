import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginTabNavigator from './LoginTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Main: LoginTabNavigator,
  }),
);
