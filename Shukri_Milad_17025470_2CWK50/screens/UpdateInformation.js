import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, TouchableOpacity, StyleSheet } from 'react-native';

class InfoScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            given_name:'',
            family_name:'',
            email:'',
            password:'',
        };

        const {state} = props.navigation;
        id = state.params.id;
        token = state.params.token;
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // patch request to update the user info
    updateAccount(){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + id,
        {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({
                given_name: this.state.given_name,
                family_name: this.state.family_name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => {
            Alert.alert("Account Updated");
            this.props.navigation.navigate('MyAccount');
        })
        .catch((error) => {
            //console.error(error);
            Alert.alert("Incorrect details", "Please re-enter your updated details");
        });
    }

    componentDidMount(){
             console.log(token, id);
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
                    placeholder="Password:"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.updateAccount()}
                >
                    <Text> Update </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default InfoScreen;


// All the styling for the update information page page is done here.
const styles = StyleSheet.create({

  container: {
      minHeight:"100%",
      backgroundColor: '#dedede'
  },

  button: {
      alignItems: 'center',
      backgroundColor: '#af7aff',
      padding: 10,
      borderRadius:10,
  },

})