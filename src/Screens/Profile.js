import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Text, Thumbnail, View } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


export default class Profile extends Component {
    state = {
        loggedInUser: ''
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
        return (
            <Container>
                <Content>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Thumbnail large source={{ uri: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png' }} />
                    </View>
                    <Form>
                        <Item fixedLabel last >
                            <Label>Full Name</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Age</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Contact</Label>
                            <Input />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Qualification</Label>
                            <Input />
                        </Item>
                    </Form>
                    <TouchableOpacity onPress={() => this.signOut()} style={{ margin: 10, borderWidth: 1, borderColor: '#1C468A', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#1C468A', fontFamily: 'Lemon' }}>Log Out</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}