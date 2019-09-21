import React, { useState, useEffect } from 'react';
import { ViewProps, View, ActivityIndicator } from 'react-native';

import { textStyle, ScrollableAvoidKeyboard, ImageOverlay } from '@src/components/common'
import { SignInForm2, SignInForm2Data, SocialAuth } from '@src/components/auth';

import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { imageSignIn4Bg, ImageSource } from '@src/assets/images';
import { StarIconFill } from '@src/assets/icons';
import { useAction } from '@src/utils/hooks';
import { signInWithFacebook, signInWithTwitter, signIn, getCurrentUsername } from '@src/utils/auth';

interface ComponentProps {
  navigation: { navigate: (screen) => void },
}

export type LoginProps = ThemedComponentProps & ViewProps & ComponentProps;

const LoginScreenComponent: React.FunctionComponent<LoginProps> = (props) => {
  const [formData, setFormData] = useState(undefined);
  const [{ data, isLoading, error }, doAction] = useAction(getCurrentUsername);

  useEffect(() => {
    if (data) props.navigation.navigate('main_screen');
  }, [data, isLoading, error]);

  const backgroundImage: ImageSource = imageSignIn4Bg;

  const onForgotPasswordButtonPress = () => {
    props.navigation.navigate('forgotPassword');
  };

  const onSignInButtonPress = async () => {
    doAction(signIn(formData));
  };

  const onSignUpButtonPress = () => {
    props.navigation.navigate('register_screen');
  };

  const onGoogleButtonPress = () => {
    // props.onGooglePress();
  };

  const onFacebookButtonPress = async () => {
    doAction(signInWithFacebook);
  };

  const onTwitterButtonPress = async token => {
    doAction(signInWithTwitter(token));
  };

  const onFormDataChange = (formData: SignInForm2Data) => {
    setFormData(formData);
  };
    
  const { themedStyle } = props;

  return (
    <ScrollableAvoidKeyboard>
      <ImageOverlay
        style={themedStyle.container}
        source={backgroundImage.imageSource}
      >
        <View style={themedStyle.headerContainer}>
          <Text
            style={themedStyle.helloLabel}
            category='h1'>
            Hello
          </Text>
          <Text
            style={themedStyle.signInLabel}
            category='s1'>
            Sign in to your account
          </Text>
        </View>
        <SignInForm2
          style={themedStyle.formContainer}
          onForgotPasswordPress={onForgotPasswordButtonPress}
          onDataChange={onFormDataChange}
        />

        {error && <Text
          style={{...themedStyle.signInLabel, left: 20, width: 380 }}
          category='s1'>
          {error.message}
        </Text>}

        <Button
          style={themedStyle.signInButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!formData}
          onPress={onSignInButtonPress}
        >
          SIGN IN
        </Button>
        
        {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
        
        <SocialAuth
          style={themedStyle.socialAuthContainer}
          iconStyle={themedStyle.socialAuthIcon}
          hint='Or Sign In using Social Media'
          hintStyle={themedStyle.hintStyle}
          onGooglePress={onGoogleButtonPress}
          onFacebookPress={onFacebookButtonPress}
          onTwitterPress={onTwitterButtonPress}
        />
        <Button
          style={themedStyle.signUpButton}
          textStyle={themedStyle.signUpText}
          appearance='ghost'
          activeOpacity={0.75}
          onPress={onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button>

      </ImageOverlay>
    </ScrollableAvoidKeyboard>
  );
}

export const LoginScreen = withStyles(LoginScreenComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  hintStyle: {
    color: 'white',
  },
  helloLabel: {
    color: 'white',
    ...textStyle.headline,
  },
  signInLabel: {
    marginTop: 16,
    color: 'white',
    ...textStyle.subtitle,
  },
  socialAuthIcon: {
    tintColor: 'white',
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));
