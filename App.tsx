import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';

import { Home } from './src/screens/Home';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/styles/theme';
import { CarDetails } from './src/screens/CarDetails';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Agendamentos } from './src/screens/Agendamentos';
import { AgendamentoDetails } from './src/screens/AgendamentoDetails';
import { AgendamentoComplete } from './src/screens/AgendamentoComplete';


export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView
        style={
          {
            flex: 1
          }
        }
      >
        <AgendamentoComplete />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

