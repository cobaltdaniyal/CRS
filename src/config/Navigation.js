import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login'
import Splash from '../Screens/Splash';
import CompanySign from '../Screens/CompanySign';
import Dashboard from '../Screens/Dashboard'
import PostJob from '../Screens/PostJob'
import Apply from '../Screens/Apply';
import ChooseLogin from '../Screens/ChooseLogin';
import StudentSign from '../Screens/StudentSign';


const Stack = createStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="ChooseLogin" component={ChooseLogin} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="CompanySign" component={CompanySign} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="StudentSign" component={StudentSign} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="PostJob" component={PostJob} />
                <Stack.Screen name="Apply" component={Apply} />
                {/* <Stack.Screen name="SideBar" component={SideBar} options={{ headerShown: null, headerBackTitle: '' }} />
                <Stack.Screen name="MySideBar" component={MySideBar} options={{ headerShown: null, headerBackTitle: '' }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;