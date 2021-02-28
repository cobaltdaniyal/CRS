import React, { Component } from 'react';
import { Item, Input, Label, Button, Text, View } from 'native-base';
import { TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth';


const students = require('../assets/images/students.png')

export default class Login extends Component {
    state = {
            email: '',
            password: ''
        }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Dashboard');
            }
        })
    }
    signInFunc = () => {
        if (this.state.email === "" || this.state.email === " " || this.state.email === undefined) {
            Alert.alert("email can't be empty!")
        } else if (this.state.password === "" || this.state.password === " " || this.state.password === undefined) {
            Alert.alert("passwod can't be empty!")
        } else {
            auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    Alert.alert('User logged in!');
                    this.props.navigation.navigate('Dashboard');
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <View style={{ flex: 0.75 }}>
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
                        <Item style={{ padding: 5, margin: 10 }} floatingLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={text => this.setState({ password: text })} secureTextEntry />
                        </Item>
                        <TouchableOpacity onPress={() => this.signInFunc()} style={{ margin: 10, borderWidth: 1, borderColor: '#1C468A', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: '#1C468A', fontFamily: 'Lemon' }}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.08 }}>
                        <Text style={{ textAlign: 'center', margin: 10, color: '#6a6a6a' }}>OR via social links</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 40,
                                    backgroundColor: '#3f51b5',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <FontAwesome5
                                    name='facebook-f' color='#fff' size={20}
                                />
                            </Button>

                            <Button
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 40,
                                    backgroundColor: '#e40707',
                                    marginHorizontal: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <FontAwesome5
                                    name='google' color='#fff' size={20}
                                />
                            </Button>

                            <Button
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 40,
                                    backgroundColor: '#1565c0',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <FontAwesome5
                                    name='linkedin-in' color='#fff' size={20}
                                />
                            </Button>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={{ color: '#6a6a6a' }}>Don't have an account?</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }}>
                                <Text style={{ fontFamily: 'Lemon' }} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
