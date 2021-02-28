import React, { Component } from 'react';
import { Text, View, Tab, Tabs, TabHeading } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Jobs from './Jobs'
import Student from './Student'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Profile from './Profile';


export default class Dashboard extends Component {
    state = {
        students: ''
    }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                database().ref('users').once('value', ((data) => {
                    for (var key in data.val()) {
                        if (user.email === data.val()[key].email) {
                            this.setState({
                                user: data.val()[key]
                            })
                        }
                    }
                }))
            }
        })
    }
    render() {
        return (
            <>
                <View style={{ flex: 1 }}>
                    <Tabs>
                        <Tab heading={<TabHeading><FontAwesome5 size={20} color='#fff' name="building" /><Text>Jobs</Text></TabHeading>}>
                            <Jobs navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading><FontAwesome5 size={20} color='#fff' name="graduation-cap" /><Text>Students</Text></TabHeading>}>
                            <Student navigation={this.props.navigation} />
                        </Tab>
                        <Tab heading={<TabHeading><FontAwesome5 size={20} color='#fff' name="user-tie" /><Text>Profile</Text></TabHeading>}>
                            <Profile navigation={this.props.navigation} />
                        </Tab>
                    </Tabs>
                </View>
            </>
        );
    }
}
