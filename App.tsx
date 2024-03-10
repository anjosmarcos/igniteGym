import { StatusBar, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';

import { Loading } from '@components/Loading';
import {THEME} from './src/theme';
import { SingIn } from '@screens/Singin';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME} >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#202024"
        translucent
      />
     {fontsLoaded ? <SingIn /> : <Loading />}
    </NativeBaseProvider>
  )
}