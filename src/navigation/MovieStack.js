import { createStackNavigator } from '@react-navigation/stack';
import MovieScreen from "../screens/Movie"
import SingleMovieScreen from "../screens/SingleMovie"

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
            <Stack.Navigator initialRouteName='MovieScreen' screenOptions={{headerShown:false}}>
                <Stack.Screen name="MovieScreen" component={MovieScreen} />
                <Stack.Screen name="SingleMovieScreen" component={SingleMovieScreen} />
            </Stack.Navigator>
    )
}