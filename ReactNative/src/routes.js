import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Product from './pages/Product';

const Stack = createStackNavigator();

function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator
         //headerMode="none"
         //screenOptions={{ cardStyle: { backgroundColor: '#f0f0f5' } }}
         >
            <Stack.Screen name="JSHunt" component={Main}
               options={{
                  headerStyle: {
                     backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                     fontWeight: 'bold',
                  },
               }}
            />
            <Stack.Screen name="Product" component={Product} options={{
               headerShown: false
            }} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default App;