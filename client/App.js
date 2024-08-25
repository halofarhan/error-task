import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/Register";
import LoginScreen from "./screens/Login";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "./context/AuthContext";
import PostDetailScreen from "./screens/PostDetail";
import MainTab from "./navigators/MainTab";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    console.log(token, "<<< token di app");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <ApolloProvider client={client}>
          <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                  <>
                    <Stack.Screen name="MainTab" component={MainTab} />
                    <Stack.Screen
                      name="ProductDetail"
                      component={PostDetailScreen}
                      options={{ headerShown: false }}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </ApolloProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
