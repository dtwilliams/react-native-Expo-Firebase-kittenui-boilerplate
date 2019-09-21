import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { ThemedComponentProps, ThemeType, withStyles } from '@kitten/theme';

import { textStyle } from '../components/common'
// import { RkStyleSheet } from 'react-native-ui-kitten';
import { Button, Text } from '@kitten/ui';
import { useDataApi } from '@src/utils/hooks';

// import {Walkthrough} from './../components/walkthrough';
// import {Walkthrough1} from './walkthroughs/walkthrough1';
// import {Walkthrough2} from './walkthroughs/walkthrough2';
// import {Walkthrough3} from './walkthroughs/walkthrough3';
// import {PaginationIndicator} from './../components';
// import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
// import AppSpinner from './../components/Loading/AppSpinner';
// import NavigatorService from './../utils/navigator';
// import ErrorMessage from './../components/ErrorMessage';
// import loadAssetsAsync from './../utils/loadFonts';

interface ComponentProps {
  themedStyle: {},
  navigation: {},
}

export type WelcomeProps = ThemedComponentProps & ComponentProps;

const WelcomeScreenComponent: React.FunctionComponent<WelcomeProps> = (props) => {
  const { themedStyle } = props;

  const [{ data, isLoading, error }, doFetch] = useDataApi(
      'http://hn.algolia.com/api/v1/search?query=redux',
      { hits: [] },
    );

  const getStarted = () => {
    // doFetch(`http://hn.algolia.com/api/v1/search?query=test`);
    props.navigation.navigate('login_screen');
  }
  // if ( this.props.loginStatus == 'initial' || !this.props.fontLoaded ) {
  //     return ( <AppSpinner /> );
  // }
  
  return (
    // <View style={styles.screen}>
    <View>
      {/* <ErrorMessage />
      <Walkthrough onChanged={(index) => this.changeIndex(index)}>
        <Walkthrough1/>
        <Walkthrough2/>
        <Walkthrough3/>
      </Walkthrough> */}
      {/* <PaginationIndicator length={3} current={this.state.index}/> */}
      {error && <Text>Something went wrong ...</Text>}
      {isLoading ? (
          <Text>Loading ...</Text>
        ) : (
          <Text style={{ top: 100, left: 50, width: 300, height: 600 }}>{JSON.stringify(data)}</Text>
        )}

      <Button
        style={themedStyle.signInButton}
        textStyle={textStyle.button}
        size='giant'
        onPress={getStarted}>
        GET STARTED
      </Button>
    </View>
  );
}

export const WelcomeScreen = withStyles(WelcomeScreenComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
