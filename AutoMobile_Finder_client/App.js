import React, {Component} from 'react';
import { YellowBox } from 'react-native';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {StatusBar} from 'react-native';
import reducer from './src/reducers/main';
import Router from './src/navigation/Router';
import FlashMessage from 'react-native-flash-message';

class App extends Component {
  componentDidMount() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    YellowBox.ignoreWarnings([
      'Animated: `useNativeDriver` was not specified.',
    ]);
    return (
      <Provider store={store}>
        <Router />
        <FlashMessage
          duration={1000}
          floating={true}
          position="bottom"
          icon="auto"
          //style={{marginTop: '10%'}}
        />
      </Provider>
    );
  }
}

export default App;
