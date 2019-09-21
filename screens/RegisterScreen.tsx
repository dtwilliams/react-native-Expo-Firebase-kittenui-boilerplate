import React, { useState, useEffect } from 'react';
import { ButtonProps, ImageProps, View, ActivityIndicator } from 'react-native';
import { StyleType, ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { SignUpForm2, SignUpForm2Data, SocialAuth } from '@src/components/auth';
import { ProfilePhoto } from '@src/components/social';
import { ImageOverlay, ScrollableAvoidKeyboard, textStyle } from '@src/components/common';
import { IconSource, PlusIconFill } from '@src/assets/icons';
import { imageSignUp4Bg, ImageSource } from '@src/assets/images';
import { useAction } from '@src/utils/hooks';
import { signInWithFacebook, signInWithTwitter, signUp } from '@src/utils/auth';

interface ComponentProps {
  onSignUpPress: (formData: SignUpForm2Data) => void;
  onSignInPress: () => void;
  onGooglePress: () => void;
  onFacebookPress: () => void;
  onTwitterPress: () => void;
  onPhotoPress: () => void;
  navigation: { navigate: (screen) => void };
}

export type SignUp4Props = ThemedComponentProps & ComponentProps;

const RegisterScreenComponent: React.FunctionComponent<SignUp4Props> = (props) => {
  const [formData, setFormData] = useState(undefined);
  const [{ data, isLoading, error }, doAction] = useAction(() => {});
  const backgroundImage: ImageSource = imageSignUp4Bg;
  const profileImage: IconSource = require('../assets/icons/eva/person.png');

  const onFormDataChange = (formData: SignUpForm2Data) => {
    setFormData(formData);
  };

  useEffect(() => {
    if (data) props.navigation.navigate('main_screen');
  }, [data, isLoading, error]);

  const onSignUpButtonPress = () => {
    doAction(signUp(formData));
  };

  const onSignInButtonPress = () => {
    props.navigation.navigate('login_screen');
  };

  const onGoogleButtonPress = () => {
    // this.props.onGooglePress();
  };

  const onFacebookButtonPress = () => {
    // this.props.onFacebookPress();
  };

  const onTwitterButtonPress = () => {
    // this.props.onTwitterPress();
  };

  const onPhotoButtonPress = () => {
    // this.props.onPhotoPress();
  };

  const renderPhotoButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { themedStyle } = props;

    return PlusIconFill({ ...style, ...themedStyle.photoButtonIcon });
  };

  const renderPhotoButton = (): React.ReactElement<ButtonProps> => {
    const { themedStyle } = props;

    return (
      <Button
        style={themedStyle.photoButton}
        textStyle={textStyle.button}
        size='small'
        icon={renderPhotoButtonIcon}
        onPress={onPhotoButtonPress}
      />
    );
  };

  const { themedStyle } = props;

  return (
    <ScrollableAvoidKeyboard>
      <ImageOverlay
        style={themedStyle.container}
        source={backgroundImage.imageSource}>
        <View style={themedStyle.headerContainer}>
          <ProfilePhoto
            style={themedStyle.photo}
            resizeMode='center'
            source={profileImage.imageSource}
            button={renderPhotoButton}
          />
        </View>
        
        <SignUpForm2
          style={themedStyle.formContainer}
          onDataChange={onFormDataChange}
        />

        {error && <Text
          style={{...themedStyle.signInLabel, left: 20, width: 380 }}
          category='s1'>
          {error.message}
        </Text>}

        <Button
          style={themedStyle.signUpButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!formData}
          onPress={onSignUpButtonPress}>
          SIGN UP
        </Button>
        {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
        
        <SocialAuth
          iconStyle={themedStyle.socialAuthIcon}
          hint='Or Sign In using Social Media'
          hintStyle={themedStyle.hintStyle}
          onGooglePress={onGoogleButtonPress}
          onFacebookPress={onFacebookButtonPress}
          onTwitterPress={onTwitterButtonPress}
        />
        <Button
          style={themedStyle.signInButton}
          textStyle={themedStyle.signUpText}
          appearance='ghost'
          activeOpacity={0.75}
          onPress={onSignInButtonPress}>
          Already have account? Sign In
        </Button>
      </ImageOverlay>
    </ScrollableAvoidKeyboard>
  );
}

export const RegisterScreen = withStyles(RegisterScreenComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 160,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  photo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: 'center',
    backgroundColor: theme['background-basic-color-1'],
    tintColor: theme['text-hint-color'],
  },
  photoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    transform: [{ translateY: 64 }],
  },
  photoButtonIcon: {
    width: 20,
    height: 20,
  },
  socialAuthIcon: {
    tintColor: 'white',
  },
  hintStyle: {
    color: 'white',
  },
  signUpButton: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
  signInLabel: {
    marginTop: 16,
    color: 'white',
    ...textStyle.subtitle,
  },
}));

