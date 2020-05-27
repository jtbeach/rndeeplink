/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useEffect, useCallback, useState} from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';

const useDeepLink = () => {
  const [currentURL, setCurrentURL] = useState(null);
  const [consumedInitialUrl, setConsumedInitialUrl] = useState(false);

  const onUrlEvent = useCallback(({url}) => {
    setCurrentURL(url);
    console.log(`onUrlEvent received: ${url}`);
  }, []);

  useEffect(() => {
    if (!consumedInitialUrl) {
      setConsumedInitialUrl(true);
      (async () => {
        const url: string | null = await Linking.getInitialURL();
        console.log(`getInitialURL received: ${url}`);
        onUrlEvent({url});
      })();
    }
  }, [onUrlEvent, consumedInitialUrl]);

  useEffect(() => {
    Linking.addEventListener('url', onUrlEvent);
    return () => {
      Linking.removeEventListener('url', onUrlEvent);
    };
  }, [onUrlEvent]);

  return currentURL;
};

export default function App() {
  const url = useDeepLink();

  return (
    <View style={styles.container}>
      <Text>Current URL: {url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
