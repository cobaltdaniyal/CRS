import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import database from '@react-native-firebase/database';
import { List, ListItem, } from 'native-base';

export default class Student extends Component {
    state = {
        students: []
    }
    componentDidMount() {
        database().ref('users').once('value', data => {
            let arr = []
            for (var key in data.val()) {
                if (data.val()[key].accountType === 'Student') {
                    arr.push(data.val()[key])
                }
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
                                <Text style={{ fontWeight: 'bold', color: '#1C468A', fontSize: 18, fontFamily: 'Lemon' }}>{student.name}</Text>
                                <Text style={{ fontSize: 16 }}>Age: {student.age}</Text>
                                <Text style={{ fontSize: 16 }}>Qualification: {student.qualification}</Text>
                                <Text style={{ fontSize: 16 }}>Contact: {student.contact}</Text>
                                <Text style={{ fontSize: 16 }}>Email: {student.email}</Text>
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


