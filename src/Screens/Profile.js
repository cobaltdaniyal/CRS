import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Text, Thumbnail, View, Button } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


export default class Profile extends Component {
    state = {
        user: []
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
    signOut = () => {
        auth()
            .signOut()
            .then(() => {
                Alert.alert('User logged out!')
                this.props.navigation.navigate('Login')
            });
    }
    render() {
        console.log(this.state.user.username)
        return (
            <Container>
                <Content>
                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 30 }}>
                        <Thumbnail large source={{ uri: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png' }} />
                    </View>
                    <Form>
                        <Item fixedLabel last >
                            <Label style={{ color: '#1C468A' }}>Full Name</Label>
                            <Input placeholder={this.state.user.name} />
                        </Item>
                        {this.state.user.accountType === 'Company' ?
                            <></>
                            :
                            <Item fixedLabel last>
                                <Label style={{ color: '#1C468A' }}>Age</Label>
                                <Input placeholder={this.state.user.age} />
                            </Item>
                        }
                        <Item fixedLabel last>
                            <Label style={{ color: '#1C468A' }}>Email</Label>
                            <Input placeholder={this.state.user.email} disabled />
                        </Item>
                        <Item fixedLabel last>
                            <Label style={{ color: '#1C468A' }}>Contact</Label>
                            <Input placeholder={this.state.user.contact} disabled />
                        </Item>
                        {this.state.user.accountType === 'Company' || this.state.user.accountType === 'Admin' ?
                            <></>
                            :
                            <Item fixedLabel last>
                                <Label style={{ color: '#1C468A' }}>Qualification</Label>
                                <Input placeholder={this.state.user.qualification} />
                            </Item>
                        }
                    </Form>

                    <TouchableOpacity onPress={() => this.signOut()} style={{ margin: 10, borderWidth: 1, borderColor: '#1C468A', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#1C468A', fontFamily: 'Lemon' }}>Log Out</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}