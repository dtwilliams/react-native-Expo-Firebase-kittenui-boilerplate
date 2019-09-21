
// import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import { useAction } from '@src/utils/hooks';
import { getCurrentUsername } from '@src/utils/auth';
import { Button, Text } from '@kitten/ui';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

interface ComponentProps {
  themedStyle: {},
  navigation: {},
}

export type HomeProps = ThemedComponentProps & ComponentProps;

const HomeScreenComponent: React.FunctionComponent<HomeProps> = (props) => {
  const [{ data, isLoading, error }, doAction] = useAction(getCurrentUsername);
  const { themedStyle } = props;

  return (
    <View>
      <Text style={themedStyle.helloLabel}>
        {data && data.email}
      </Text>
      {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
      {error && <Text
          style={{...themedStyle.signInLabel, left: 20, width: 300 }}
          category='s1'>
          {error.message}
        </Text>}
    </View>
  );
}

export const HomeScreen = withStyles(HomeScreenComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationOptions: {
    title: 'Home',
  },
}));
