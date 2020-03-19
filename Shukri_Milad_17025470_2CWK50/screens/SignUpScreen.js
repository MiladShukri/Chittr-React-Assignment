import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, TouchableOpacity, StyleSheet, Header } from 'react-native';

class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            given_name:'',
            family_name:'',
            email:'',
            password:''
        };
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // post reqeust to add an account to the api.
    addAccount(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user",
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                given_name: this.state.given_name,
                family_name: this.state.family_name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => {
            Alert.alert("Account Made!", "You will be redirected to the log in screen");
            this.props.navigation.navigate('LogIn');
        })
        .catch((error) => {
            //console.error(error);
            Alert.alert("Incorrect details", "Please re-enter your sign up details");
        });
    }

    render(){
        return(
            <View style={styles.container}>

                <TextInput
                    style={{height: 40}}
                    placeholder="Given Name:"
                    onChangeText={(given_name) => this.setState({given_name})}
                    value={this.state.given_name}
                />

                <TextInput
                    style={{height: 40}}
                    placeholder="Family Name:"
                    onChangeText={(family_name) => this.setState({family_name})}
                    value={this.state.family_name}
                />

                <TextInput
                    style={{height: 40}}
                    placeholder="Email:"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                />

                <TextInput
                    style={{height: 40}}
                    secureTextEntry={true}
                    placeholder="Password:"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.addAccount()}
                >
                    <Text> Sign up </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SignUp;


// All the styling for the sign up page is done here.
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