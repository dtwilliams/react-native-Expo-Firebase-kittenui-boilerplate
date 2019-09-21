import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import twitter from 'react-native-simple-twitter';

import firebase from './firebase'
import { authStateChanged, isInitialized } from '@src/utils/auth';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    isInitialized().then(val => {
      const { consumerKey, consumerSecret, callbackUrl } = Expo.Constants.manifest.extra.twitter;
      twitter.setConsumerKey(consumerKey, consumerSecret);
			setFirebaseInitialized(true);
		})
  })
  
  if (!isLoadingComplete && !firebaseInitialized && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <Layout style={{ flex: 1 }}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Layout>
      </ApplicationProvider>
    );
  }
}

async function loadResourcesAsync() {
  const fontResult = await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    // if you get font loading errors, run yarn add @expo/vector-icons
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
      'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
      'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
      'opensans-light': require('./assets/fonts/opensans-light.ttf'),
      'opensans-regular': require('./assets/fonts/opensans-regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn('handleLoadingError', error);
}

function handleFinishLoading(setLoadingComplete) {
  // console.log('handleFinishLoading');
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
