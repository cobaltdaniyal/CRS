import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Text, Thumbnail, View, Textarea } from 'native-base';
import { Alert, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';


export default class PostJob extends Component {
    state = {
        company: '',
        title: '',
        postedBy: '',
        contact: '',
        email: '',
        description: ''
    }


    PostJob = () => {
        if (this.state.company === "" || this.state.company === " " || this.state.company === undefined) {
            Alert.alert("Please enter your Company Name")
        } else if (this.state.title === "" || this.state.title === " " || this.state.title === undefined) {
            Alert.alert("Please enter Job Title")
        } else if (this.state.postedBy === "" || this.state.postedBy === " " || this.state.postedBy === undefined) {
            Alert.alert("Please enter Your Name")
        } else if (this.state.contact === "" || this.state.contact === " " || this.state.contact === undefined) {
            Alert.alert("Please enter Contact no.")
        } else if (this.state.email === "" || this.state.email === " " || this.state.email === undefined) {
            Alert.alert("Please enter Email")
        } else if (this.state.description === "" || this.state.description === " " || this.state.description === undefined) {
            Alert.alert("Please enter Description")
        }
        else {
            database()
                .ref('/job')
                .push({
                    company: this.state.company,
                    title: this.state.title,
                    postedBy: this.state.postedBy,
                    contact: this.state.contact,
                    email: this.state.email,
                    description: this.state.description
                })
                .then(() => {
                    Alert.alert('Your Add was Posted')
                    this.setState({
                        company: '',
                        title: '',
                        postedBy: '',
                        contact: '',
                        email: '',
                        description: ''
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
                            <Label>Company</Label>
                            <Input onChangeText={text => this.setState({ company: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Job Title</Label>
                            <Input onChangeText={text => this.setState({ title: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Posted By</Label>
                            <Input onChangeText={text => this.setState({ postedBy: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Contact</Label>
                            <Input keyboardType={'phone-pad'} onChangeText={text => this.setState({ contact: text })} />
                        </Item>
                        <Item fixedLabel last>
                            <Label>Email</Label>
                            <Input autoCapitalize='none' keyboardType={'email-address'} onChangeText={text => this.setState({ email: text })} />
                        </Item>

                        <Textarea onChangeText={text => this.setState({ description: text })} rowSpan={5} bordered placeholder="Job Description" />
                    </Form>
                    <TouchableOpacity onPress={() => this.PostJob()} style={{ margin: 10, borderWidth: 1, borderColor: '#1C468A', justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: '#1C468A', fontFamily: 'Lemon' }}>Post Job</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}