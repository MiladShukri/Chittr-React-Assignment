import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, TouchableOpacity, StyleSheet } from 'react-native';

class LogIn extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            token:[]
        };
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // Log in post request for the user to get into their account
    logIn(){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/login",
            {
                method: 'POST',
                headers: {
                    Accept:"application/json",
                    'Content-Type':'application/json',

                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                             isLoading: false,
                             token: responseJson,

                        });
                        console.log(responseJson);
                        Alert.alert("Logged in", "Welcome!");
                        this.props.navigation.navigate('HomeLoggedIn', responseJson);
                    })
            .catch((error) => {
                //console.error(error);
                Alert.alert("Incorrect details", "Please re-enter your email and password");
            });
        }

    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Email:"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                />

                <TextInput
                    secureTextEntry={true}
                    style={{height: 40}}
                    placeholder="Password:"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.logIn()}
                >
                    <Text> Log In </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LogIn;

// All the styling for the log in screen is done here.

const styles = StyleSheet.create({

  container: {
        minHeight:"100%",
        backgroundColor: '#dedede'
  },

  button: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#af7aff',
        padding: 10,
        borderRadius:10,
        width:200,
  },

})