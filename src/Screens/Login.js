import React, { Component } from 'react';
import { Item, Input, Label, Button, Text, View } from 'native-base';
import { TouchableOpacity, Image, Alert, ScrollView, TouchableHighlightBase } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';



const students = require('../assets/images/students.png')

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            accountType: '',
            secureTextEntry: true,
            iconName: 'eye',
            user: []
        }
    }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Dashboard');
                database().ref('users').once('value', ((data) => {
                    for (var key in data.val()) {
                        if (user.email === data.val()[key]) {
                            this.setState({
                                user: data.val()[key]
                            })
                        }
                    }
                }))
            }
        })
    }
    signInFunc = () => {
        if (this.state.email === "" || this.state.email === " " || this.state.email === undefined) {
            Alert.alert("email can't be empty!")
        } else if (this.state.password === "" || this.state.password === " " || this.state.password === undefined) {
            Alert.alert("passwod can't be empty!")
        } else {
            if (this.state.accountType === 'Student') {
                auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => {
                        Alert.alert('User logged in!');
                        this.props.navigation.navigate('Jobs');
                    })
                    .catch(error => {
                        alert(error);
                    });

            } else if (this.state.accountType === 'Company') {
                auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => {
                        Alert.alert('User logged in!');
                        this.props.navigation.navigate('Students');
                    })
                    .catch(error => {
                        alert(error);
                    });
            } else if (this.state.accountType === 'Admin') {
                auth()
                    .signInWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => {
                        Alert.alert('User logged in!');
                        this.props.navigation.navigate('Dashboard');
                    })
                    .catch(error => {
                        alert(error);
                    });
            } else {
                Alert.alert("You're Not An Admin")
            }
        }
    }


    onToggle = () => {
        let iconName = (this.state.secureTextEntry) ? 'eye-slash' : 'eye';
        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <View style={{ flex: 0.80 }}>
                        <View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={students} style={{ height: 150, width: 330, margin: 10 }} />
                        </View>
                        <Text style={{ fontSize: 26, fontFamily: 'Omegle', marginLeft: 5, color: '#1C468A', textAlign: 'center' }}>Campus Recruitment System</Text>
                        <Item style={{ paddingBottom: 5, marginTop: 20 }} floatingLabel last>
                            <Label>Email</Label>
                            <Input autoCapitalize='none' onChangeText={text => this.setState({ email: text })} />
                        </Item>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Input style={{ padding: 10, margin: 10 }} placeholder="Password" onChangeText={text => this.setState({ password: text })} {...this.props} secureTextEntry={this.state.secureTextEntry} />
                            <TouchableOpacity style={{ marginRight: 20, padding: 10 }} onPress={() => this.onToggle()} >
                                <FontAwesome5 name={this.state.iconName} size={20} />
                            </TouchableOpacity>
                        </View>
                        <DropDownPicker
                            items={[
                                { label: 'Company OR Organization', value: 'Company', icon: () => <FontAwesome5 name="building" size={18} color="#1C468A" /> },
                                { label: 'Student', value: 'Student', icon: () => <FontAwesome5 name="user-graduate" size={18} color="#1C468A" /> },
                                { label: 'Admin', value: 'Admin', icon: () => <FontAwesome5 name="user-tie" size={18} color="#1C468A" /> },
                            ]}
                            defaultValue={this.state.country}
                            containerStyle={{ height: 40, marginTop: 5 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={item => this.setState({
                                accountType: item.value
                            })}
                        />

                        <TouchableOpacity onPress={() => this.signInFunc()} style={{ margin: 10, borderWidth: 1, borderColor: '#1C468A', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: '#1C468A', fontFamily: 'Lemon' }}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.04 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 100 }}>
                            <Text style={{ color: '#6a6a6a' }}>Don't have an account?</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }}>
                                <Text style={{ fontFamily: 'Lemon' }} onPress={() => this.props.navigation.navigate('ChooseLogin')}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
