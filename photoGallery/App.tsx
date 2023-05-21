import React from 'react';
import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppContainer from './src/index';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        style={[backgroundStyle]}
        contentInsetAdjustmentBehavior="automatic">
        <AppContainer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
