
// import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Provider } from 'react-redux';
// import FlashMessage from 'react-native-flash-message';
// import store from './src/redux/store';
import { useState } from 'react';
// import { getData } from './src/utils/helperFunctions';
// import { storeUserData } from './src/redux/actions/appSettings';
// import { saveUserData } from './src/redux/reducers/auth';
import { useFonts } from 'expo-font';
import { AuthProvider } from './src/context/AuthContext';
import { AppNav } from './src/navigation/AppNav'; 
import i18n from "./src/languages/index"; //don't remove this line
import { WebSocketContext } from './src/context/webSockets.context';

export default function App() {
  const [socket, setsocket] = useState()
  const [loaded] = useFonts({
    Bold: require("./assets/fonts/Montserrat-Bold.otf"),
    SemiBold: require("./assets/fonts/Montserrat-SemiBold.otf"),
    Regular: require("./assets/fonts/Montserrat-Regular.otf"),
    Medium: require("./assets/fonts/Montserrat-Medium.otf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <AuthProvider>
      <WebSocketContext.Provider value={[socket, setsocket]}>
        <GestureHandlerRootView style={{flex:1}} >
        < AppNav />
        </GestureHandlerRootView>
      </WebSocketContext.Provider>
    </AuthProvider>
  );
}
 
