import React, { Component } from 'react';
import { Item, Input, Label, Text, View, Button } from 'native-base';
import { TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DropDownPicker from 'react-native-dropdown-picker';



const study = require('../assets/images/study.png')

export default class CompanySign extends Component {
    state = {
        name: '',
        username: '',
        contact: '',
        email: '',
        password: '',
        accountType: '',
        secureTextEntry: true,
        iconName: 'eye',
        user:[]
    };

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
    signupFunc = () => {
        if (this.state.name === "" || this.state.name === " " || this.state.name === undefined) {
            Alert.alert("Please enter your Company Name")
        } else if (this.state.username === "" || this.state.username === " " || this.state.username === undefined) {
            Alert.alert("Please enter your Full Name")
        } else if (this.state.contact === "" || this.state.contact === " " || this.state.contact === undefined) {
            Alert.alert("Please enter your Contact")
        } else if (this.state.email === "" || this.state.email === " " || this.state.email === undefined) {
            Alert.alert("Please enter your Full Name")
        } else if (this.state.password === "" || this.state.password === " " || this.state.password === undefined) {
            Alert.alert("Passwod can't be empty!")
        } else if (this.state.accountType === "" || this.state.accountType === " " || this.state.accountType === undefined) {
            Alert.alert("Please Select Account Type")
        } else {
            auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    Alert.alert('Account created & logged in!');
                    this.props.navigation.navigate('Dashboard');
                    database()
                        .ref('/users')
                        .push({
                            name: this.state.name,
                            username: this.state.username,
                            contact: this.state.contact,
                            email: this.state.email,
                            password: this.state.password,
                            accountType: this.state.accountType
                        })
                        .then((res) => console.log(res))
                })
                .catch(error => {
                    alert(error);
                });
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
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 0.80 }}>
                        <Text style={{ fontSize: 26, fontFamily: 'Omegle', margin: 10, color: '#1C468A', textAlign: 'center' }}>Campus Recruitment System</Text>
                        <Item style={{ padding: 5, margin: 5 }} floatingLabel last>
                            <Label>Name Of Company</Label>
                            <Input onChangeText={text => this.setState({ name: text })} />
                        </Item>
                        <Item style={{ padding: 5, margin: 5 }} floatingLabel last>
                            <Label>User Name</Label>
                            <Input onChangeText={text => this.setState({ username: text })} />
                        </Item>
                        <Item style={{ padding: 5, margin: 5 }} floatingLabel last>
                            <Label>Contact No.</Label>
                            <Input onChangeText={text => this.setState({ contact: text })} keyboardType={'phone-pad'} />
                        </Item>
                        <Item style={{ padding: 5, margin: 5 }} floatingLabel last>
                            <Label>Email</Label>
                            <Input onChangeText={text => this.setState({ email: text })} autoCapitalize='none' keyboardType={'email-address'} />
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



                        <TouchableOpacity onPress={() => this.signupFunc()} style={{ marginTop: 15, marginHorizontal: 5, borderWidth: 1, borderColor: '#1C468A', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: '#1C468A', fontFamily: 'Lemon' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 0.05 }}>
                        <Text style={{ textAlign: 'center', margin: 5, color: '#6a6a6a' }}>OR via social links</Text>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                            <Text style={{ color: '#6a6a6a' }}>Already a member?</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }}>
                                <Text style={{ fontFamily: 'Lemon' }} onPress={() => this.props.navigation.navigate('Login')}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
