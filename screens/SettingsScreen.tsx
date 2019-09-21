import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemeType, withStyles, ThemedComponentProps } from '@kitten/theme';
import { Toggle, Text } from '@kitten/ui';
import { ContainerView, textStyle } from '@src/components/common';
import { logOut } from '@src/utils/auth';

interface ComponentProps {
  soundEnabled: boolean;
  onEditProfilePress: () => void;
  onChangePasswordPress: () => void;
  onNotificationPress: () => void;
  onPrivacyPress: () => void;
  onSoundEnabledValueChange: (value: boolean) => void;
  onLogOut: () => void;
}

export type SettingsProps = ThemedComponentProps & ComponentProps;

const SettingsComponent: React.FunctionComponent<SettingsProps> = (props) => {

  const onEditProfilePress = () => {
    // this.props.onEditProfilePress();
  };

  const onChangePasswordPress = () => {
    // this.props.onChangePasswordPress();
  };

  const onSoundEnabledPress = () => {
    const { soundEnabled } = this.props;
    // this.onSoundEnabledChange(!soundEnabled);
  };

  const onSoundEnabledChange = (value: boolean) => {
    // this.props.onSoundEnabledValueChange(value);
  };

  const onLogOut = async () => {
    await logOut();
    props.navigation.navigate('login_screen');
  }

  const { themedStyle, soundEnabled } = props;

  return (
    <ContainerView style={themedStyle.container}>
      <Section
        style={themedStyle.section}
        onPress={onEditProfilePress}>
        <Text
          style={themedStyle.sectionText}
          category='s2'>
          Edit Profile
        </Text>
      </Section>
      <Section
        style={themedStyle.section}
        onPress={onChangePasswordPress}>
        <Text
          style={themedStyle.sectionText}
          category='s2'>
          Change Password
        </Text>
      </Section>
      <Section
        style={[themedStyle.section, themedStyle.notificationSection]}
        onPress={onChangePasswordPress}>
        <Text
          style={themedStyle.sectionText}
          category='s2'>
          Notification
        </Text>
      </Section>
      <Section
        style={themedStyle.section}
        onPress={onChangePasswordPress}>
        <Text
          style={themedStyle.sectionText}
          category='s2'>
          Privacy
        </Text>
      </Section>
      <Section
        style={[themedStyle.section, themedStyle.soundEnabledSection]}
        onPress={onSoundEnabledPress}>
        <Text
          style={themedStyle.sectionText}
          category='s2'>
          Sound Enabled
        </Text>
        <Toggle
          checked={soundEnabled}
          onChange={onSoundEnabledChange}
        />
      </Section>
      <Section
        style={themedStyle.section}
        onPress={onLogOut}>
        <Text
          style={themedStyle.sectionText}
          category='s2'>
          Log Out
        </Text>
      </Section>
    </ContainerView>
  );
}

interface SectionProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const Section = (props?: SectionProps): React.ReactElement<TouchableOpacityProps> => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      {...props}
    />
  );
};

export const SettingsScreen = withStyles(SettingsComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  notificationSection: {
    paddingTop: 40,
  },
  soundEnabledSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 40,
  },
  sectionText: textStyle.subtitle,
  navigationOptions: {
    title: 'Settings',
  },
}));
