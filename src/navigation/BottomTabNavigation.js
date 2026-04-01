import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from "../screens/Home"
import MovieScreen from "../screens/Movie"
import ProfileScreen from "../screens/Profile"
import COLORS from "../utils/colors"

import HomeIcon from '../assets/icons/HomeIcon'
import ExploreIcon from '../assets/icons/ExploreIcon'
import UserIcon from '../assets/icons/UserIcon'

export default function BottomTabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => {
                if (route.name === "HomeTab") {
                    return <HomeIcon width={24} color={color} />
                }
                else if (route.name == "MovieTab") {
                    return <ExploreIcon width={24} color={color} />
                }
                else if (route.name == "ProfileTab") {
                    return <UserIcon width={24} color={color} />
                }
            },
            tabBarIconStyle: {
                flex: 1,
            },
            tabBarStyle: {
                backgroundColor: COLORS.white,
                elevation: 10,
                shadowOpacity: 0.8,
                borderTopWidth: 0,
                height: 60,
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: COLORS.brandPrimary,
            tabBarInactiveTintColor: COLORS.inActiveTintColor
        })} >
            <Tab.Screen name="HomeTab" component={HomeScreen} options={{ unmountOnBlur: true }} />
            <Tab.Screen name="MovieTab" component={MovieScreen} options={{ unmountOnBlur: true }}  />
            <Tab.Screen name="ProfileTab" component={ProfileScreen} />
        </Tab.Navigator >
    )
}