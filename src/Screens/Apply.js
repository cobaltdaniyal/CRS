import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Text, Thumbnail, View, Textarea } from 'native-base';
import { Alert, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';


export default class Apply extends Component {
    state = {
        name: '',
        age: '',
        qualification: '',
        contact: '',
        email: '',
    }


    apply = () => {
        if (this.state.name === "" || this.state.name === " " || this.state.name === undefined) {
            Alert.alert("Please enter your Name")
        } else if (this.state.age === "" || this.state.age === " " || this.state.age === undefined) {
            Alert.alert("Please enter Age")
        } else if (this.state.qualification === "" || this.state.qualification === " " || this.state.qualification === undefined) {
            Alert.alert("Please enter Your Qualification")
        } else if (this.state.contact === "" || this.state.contact === " " || this.state.contact === undefined) {
            Alert.alert("Please enter Contact no.")
        } else if (this.state.email === "" || this.state.email === " " || this.state.email === undefined) {
            Alert.alert("Please enter Email")
        } else {
            database()
                .ref('/apply')
                .push({
                    name: this.state.name,
                    age: this.state.age,
                    qualification: this.state.qualification,
                    contact: this.state.contact,
                    email: this.state.email,
                })
                .then(() => {
                    Alert.alert('Your request has been submitted')
                    this.setState({
                        name: '',
                        age: '',
                        qualification: '',
                        contact: '',
                        email: '',
                    })
                    this.props.navigation.navigate('Dashboard');
                })
        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ padding: 10 }}>
                        <Item fixedLabel last>
                            <Label>Full Name</Label>
                            <Input onChangeText={text => this.setState({ name: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Age</Label>
                            <Input onChangeText={text => this.setState({ age: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Qualification</Label>
                            <Input onChangeText={text => this.setState({ qualification: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Contact</Label>
                            <Input keyboardType={'phone-pad'} onChangeText={text => this.setState({ contact: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Email</Label>
                            <Input autoCapitalize='none' keyboardType={'email-address'} onChangeText={text => this.setState({ email: text })} />
                        </Item>

                        {/* <Textarea onChangeText={text => this.setState({ description: text })} rowSpan={5} bordered placeholder="Job Description" /> 
                            File Upload
                        */}
                    </Form>
                    <TouchableOpacity onPress={() => this.apply()} style={{ margin: 10, borderWidth: 1, borderColor: '#1C468A', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#1C468A', fontFamily: 'Lemon' }}>Apply For Job</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}