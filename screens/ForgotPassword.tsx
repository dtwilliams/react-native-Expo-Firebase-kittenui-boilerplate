import React, { useState, useEffect }  from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';
import { Button, Text } from '@kitten/ui';
import { ForgotPasswordForm, ForgotPasswordFormData} from '@src/components/auth';
import { ScrollableAvoidKeyboard, ImageOverlay, textStyle } from '@src/components/common';
import { imageForgotPasswordBg, ImageSource } from '@src/assets/images';
import { useAction } from '@src/utils/hooks';
import { forgotPassword } from '@src/utils/auth';

interface ComponentProps {
  onResetPress: (formData: ForgotPasswordFormData) => void;
  navigation: { navigate: (screen) => void };
}

export type ForgotPasswordProps = ThemedComponentProps & ComponentProps;

const ForgotPasswordComponent: React.FunctionComponent<ForgotPasswordProps> = (props) => {
  const [formData, setFormData] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [{ data, isLoading, error }, doAction] = useAction(() => {});
  const backgroundImage: ImageSource = imageForgotPasswordBg;

  const onFormDataChange = (formData: ForgotPasswordFormData) => {
    setFormData(formData);
  };

  useEffect(() => {
    if (data) setResult(data.success);
  }, [data]);

  const onResetPasswordButtonPress = () => {
    doAction(forgotPassword(formData));
  };

  const onCancelButtonPress = () => {
    props.navigation.navigate('login_screen');
  }

  const { themedStyle } = props;

  return (
    <ScrollableAvoidKeyboard>
      <ImageOverlay
        style={themedStyle.container}
        source={backgroundImage.imageSource}>
        <Text
          style={themedStyle.forgotPasswordLabel}
          appearance='alternative'
          category='h4'>
          Forgot Password
        </Text>
        <Text
          style={themedStyle.enterEmailLabel}
          appearance='alternative'>
          Please enter your email address
        </Text>
        <ForgotPasswordForm
          style={themedStyle.formContainer}
          onDataChange={onFormDataChange}
        />

        {(error || result) && <Text
          style={{...themedStyle.signInLabel, left: 20, width: 340 }}
          category='s1'>
          {error && error.message}
          {result}
        </Text>}

        <Button
          style={themedStyle.resetButton}
          textStyle={textStyle.button}
          size='giant'
          disabled={!formData}
          onPress={onResetPasswordButtonPress}>
          RESET PASSWORD
        </Button>
        {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
        
        <Button
          style={themedStyle.signInButton}
          textStyle={themedStyle.enterEmailLabel}
          appearance='ghost'
          activeOpacity={0.75}
          onPress={onCancelButtonPress}>
          Cancel
        </Button>
      </ImageOverlay>
    </ScrollableAvoidKeyboard>
  );
}

export const ForgotPassword = withStyles(ForgotPasswordComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 24,
  },
  forgotPasswordLabel: {
    alignSelf: 'center',
    marginTop: 24,
    color: 'white',
    ...textStyle.headline,
  },
  enterEmailLabel: {
    alignSelf: 'center',
    marginTop: 64,
    color: 'white',
    ...textStyle.subtitle,
  },
  resetButton: {},
  signInLabel: {
    color: 'white',
  },
}));
