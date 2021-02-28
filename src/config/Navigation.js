import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login'
import Splash from '../Screens/Splash';
import Signup from '../Screens/Signup';
import Dashboard from '../Screens/Dashboard'
import Jobs from '../Screens/Jobs';
import Profile from '../Screens/Profile';
import Student from '../Screens/Student';
import PostJob from '../Screens/PostJob'
import Apply from '../Screens/Apply';


const Stack = createStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Jobs" component={Jobs} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Student" component={Student} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="PostJob" component={PostJob} />
                <Stack.Screen name="Apply" component={Apply} />
                {/* <Stack.Screen name="SideBar" component={SideBar} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="MySideBar" component={MySideBar} options={{ headerShown: null, headerBackTitle: '' }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;