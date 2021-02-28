import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import database from '@react-native-firebase/database';
import { List, ListItem, } from 'native-base';

export default class Student extends Component {
    state = {
        students: []
    }
    componentDidMount() {
        database().ref('users/students').once('value', data => {
            let arr = []
            for (var key in data.val()) {
                arr.push(data.val()[key])
            }
            this.setState({
                students: arr
            })
        })
    }
    list = () => {
        const { students } = this.state;
        return (
            students.map((student, id) => {
                return (
                    <List key={id}>
                        <ListItem first>
                            <View style={{ flexDirection: 'column', width: 320 }}>
                                <Text style={{ fontWeight: 'bold', color: '#1C468A', fontSize: 22, fontFamily: 'Lemon' }}>{student.name}</Text>
                                <Text style={{ fontSize: 18 }}>{student.email}</Text>
                                <Text style={{ fontSize: 18 }}>{student.accountType}</Text>
                            </View>
                        </ListItem>
                    </List>
                )
            })
        )
    }
    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <Text>{this.list()}</Text>
                </View>
            </ScrollView>

        )
    }
}


