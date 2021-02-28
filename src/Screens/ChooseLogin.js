import React, { Component } from 'react'
import { View, Text, Button } from 'native-base'
import { Image, TouchableOpacity } from 'react-native'


const study = require('../assets/images/study.png')

export default class ChooseLogin extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
                <View>
                    <Image source={study} style={{ width: 350, height: 300, marginTop: 20 }} />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 26, fontFamily: 'Omegle', marginLeft: 5, color: '#1C468A', textAlign: 'center' }}>Campus Recruitment System</Text>
                    <Text style={{ margin: 30, fontSize: 22 }}>Sign up as</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Button rounded 
                        style={{ margin: 5, width: 150, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.props.navigation.navigate('CompanySign')}
                        >
                            <Text>Company</Text>
                        </Button>
                        <Button rounded 
                        style={{ margin: 5, width: 150, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this.props.navigation.navigate('StudentSign')}
                        >
                            <Text>Student</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
                    <Text style={{ color: '#6a6a6a' }}>Already a member?</Text>
                    <TouchableOpacity style={{ marginLeft: 5 }}>
                        <Text style={{ fontFamily: 'Lemon' }} onPress={() => this.props.navigation.navigate('Login')}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
