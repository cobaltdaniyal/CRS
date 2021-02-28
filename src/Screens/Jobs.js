import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { View, Card, CardItem, Body, Button, Item, Label, Input, Spinner } from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export default class Jobs extends Component {
    state = {
        jobs: [],
        company: [],
        students: [],
        isData: false,
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
        database()
            .ref('/job')
            .once('value', data => {
                setTimeout(() => {
                    let arr = []
                    for (var key in data.val()) { arr.push(data.val()[key]) }
                    this.setState({ jobs: arr, isData: true })
                }, 1000);
            })
    }
    list = () => {
        const { jobs, isData } = this.state;
        return (
            isData ? jobs.map((job, id) => {
                return (
                    <View key={id} style={{ flex: 1, margin: 10 }}>
                        <Card style={{ width: 355 }} >
                            <CardItem header bordered>
                                <Text style={{ fontWeight: 'bold', color: '#1C468A', fontSize: 22, fontFamily: 'Lemon' }}>{job.company}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Item fixedLabel last>
                                        <Label style={{ color: '#1C468A' }}>Job Title</Label>
                                        <Input disabled placeholder={job.title} />
                                    </Item>
                                    <Item fixedLabel last>
                                        <Label style={{ color: '#1C468A' }}>Posted By</Label>
                                        <Input disabled placeholder={job.postedBy} />
                                    </Item>
                                    <Item fixedLabel last>
                                        <Label style={{ color: '#1C468A' }}>Contact</Label>
                                        <Input disabled placeholder={job.contact} />
                                    </Item>
                                    <Item fixedLabel last>
                                        <Label style={{ color: '#1C468A' }}>Email</Label>
                                        <Input disabled placeholder={job.email} />
                                    </Item>
                                    <Item fixedLabel last>
                                        <Label style={{ color: '#1C468A' }}>Description</Label>
                                        <Input disabled placeholder={job.description} />
                                    </Item>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                );
            })

                : (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='#1C468A' />
                </View>)
        )
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView >
                    <View>
                        <Text>{this.list()}</Text>
                    </View>
                </ScrollView>
                {this.state.user.accountType === 'Company' ?
                    <Button onPress={() => this.props.navigation.navigate('PostJob')}
                        style={{ position: 'absolute', bottom: 20, right: 20, borderRadius: 60, width: 65, height: 65, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C468A' }}>
                        <Text>
                            <FontAwesome5 name='plus' size={30} color='#fff' />
                        </Text>
                    </Button>
                    : this.state.user.accountType === 'Student' ?
                        <Button onPress={() => this.props.navigation.navigate('Apply')}
                            style={{ position: 'absolute', bottom: 20, right: 20, borderRadius: 60, width: 65, height: 65, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C468A' }}>
                            <Text style={{ color: '#fff' }}>
                                Apply
                    </Text>
                        </Button>
                        :
                        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                            <Button onPress={() => this.props.navigation.navigate('PostJob')}
                                style={{ borderRadius: 60, width: 65, height: 65, justifyContent: 'center', margin: 2, alignItems: 'center', backgroundColor: '#1C468A' }}>
                                <Text>
                                    <FontAwesome5 name='plus' size={30} color='#fff' />
                                </Text>
                            </Button>
                            <Button onPress={() => this.props.navigation.navigate('Apply')}
                                style={{ borderRadius: 60, width: 65, height: 65, justifyContent: 'center', margin: 2, alignItems: 'center', backgroundColor: '#1C468A' }}>
                                <Text style={{ color: '#fff' }}>Apply</Text>
                            </Button>
                        </View>

                }
            </View>
        )
    }
}