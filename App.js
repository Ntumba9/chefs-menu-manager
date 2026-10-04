import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddMenuItemScreen from './src/screens/AddMenuItemScreen';
import EditMenuItemScreen from './src/screens/EditMenuItemScreen';
import MenuStatisticsScreen from './src/screens/MenuStatisticsScreen';
import useMenuItems from './src/hooks/useMenuItems';
import { colors } from './src/theme/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  // The whole menu lives here, at the top of the app, and every screen
  // reads and changes it through this one hook. That is what keeps the
  // list, the search results and the statistics all in step whenever a
  // dish is added, edited or deleted.
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, getMenuItemById } =
    useMenuItems();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={colors.primary} />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />

          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} menuItems={menuItems} />}
          </Stack.Screen>

          <Stack.Screen name="AddMenuItem">
            {(props) => (
              <AddMenuItemScreen
                {...props}
                menuItems={menuItems}
                addMenuItem={addMenuItem}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="EditMenuItem">
            {(props) => (
              <EditMenuItemScreen
                {...props}
                menuItems={menuItems}
                getMenuItemById={getMenuItemById}
                updateMenuItem={updateMenuItem}
                deleteMenuItem={deleteMenuItem}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="MenuStatistics">
            {(props) => (
              <MenuStatisticsScreen {...props} menuItems={menuItems} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
