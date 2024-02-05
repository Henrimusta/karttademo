
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from "./components/MainAppBar";
import Map from "./screens/Map";
import { Marker } from "react-native-maps";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from "./screens/Settings";

const settings = {
  backgroundColor: "#00a484"
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}

const Stack = createNativeStackNavigator();

export default function App() {

  const [mapType, setMapType] = useState('standard');
  const [icon, setIcon] = useState(icons.location_not_known);
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 15.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const getLocation = async () => {
    setIcon(icons.location_searching)
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setIcon(icons.location_found);
      setLocation({ ...location, "latitude": location.coords.latitude, "longitude": location.coords.longitude });
    } catch (error) {
      console.log(error);
    }
  }

  /* useEffect(() => {
     (async () => {
       getLocation();
       setIcon(icons.location_found);
     })();
   }, [])*/





  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Map'
          screenOptions={{
            header: (props) =>
              <MainAppBar {...props} backgroundColor={settings.backgroundColor}
                icon={icon}
                getLocation={getLocation} />
          }}>
          <Stack.Screen name="Map">
            {() =>
              <Map location={location} mapType={mapType} />
            }
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {() =>
              <Settings backgroundColor={settings.backgroundColor} mapType={mapType} setMapType={setMapType} />
            }
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>


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
