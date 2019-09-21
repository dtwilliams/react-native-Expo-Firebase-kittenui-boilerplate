import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ForgotPassword } from '../screens/ForgotPassword';
// import ProfileScreen from '../screens/ProfileScreen';
// import ResetScreen from '../screens/ResetScreen';

const LoginTabNavigator = createStackNavigator({
    welcome_screen: { screen: WelcomeScreen },
    register_screen: { screen: RegisterScreen },
    forgotPassword: { screen: ForgotPassword },
    // profile_screen: { screen: ProfileScreen },
    login_screen: { screen: LoginScreen },
    main_screen: { screen: MainTabNavigator }
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    },
    // navigationOptions: {
    //   tabBarVisible: false,
    //   header: null,
    // },
    // wipeEnabled: false,
    // lazy: true
  });

  export default LoginTabNavigator;
  