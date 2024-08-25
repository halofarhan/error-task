import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
// import PostDetailScreen from '../screens/PostDetail';
// import SearchPage from '../screens/SearchScreen';
// import ChatScreen from '../screens/ChatScreen';
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PostDetail" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default function MainTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Dashboard") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name === "Chat") {
                        iconName = focused
                            ? "chatbubble-ellipses-outline"
                            : "chatbubble-ellipses-sharp";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#b0bec5",
                headerShown: false, // Disable the header for all tabs
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopColor: "#333",
                    height: 50,
                    paddingHorizontal: 70,
                    paddingTop: 10
                },
                tabBarItemStyle: {
                    height: 30,
                    backgroundColor: "black",
                    paddingHorizontal: 30,
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={HomeStack} />
            <Tab.Screen name="Search" component={HomeStack} />
            <Tab.Screen name="Chat" component={HomeStack} />
            <Tab.Screen name="Profile" component={HomeStack} />
        </Tab.Navigator>
    );
}
