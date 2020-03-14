import React, { Component } from 'react';
import { TextInput, Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';


class PostScreen extends Component{

    constructor(props) {
        super(props);
        this.state ={
            chit_id: 0,
            timestamp: 0,
            chit_content:'',
            user_id: 0,
            given_name:'',
            family_name:'',
            email:'',
            chittsData:[]
        }

        const {state} = props.navigation;
        token = state.params.token;
    }

    postChit(token){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
            {
                method: 'POST',
                headers: {
                    Accept:"application/json",
                    'Content-Type':'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify({
                    chit_id: this.state.chit_id,
                    timestamp: this.state.timestamp,
                    chit_content: this.state.chit_content,
                    user_id: this.state.user_id,
                    given_name: this.state.given_name,
                    family_name: this.state.family_name,
                    email: this.state.email,
                })
            })
            .then((response) => {
                this.props.navigation.navigate('HomeLoggedIn');
                console.log(this.state.chit_content);
                console.log("post screen token: ", token);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.postInput}
                    placeholder="What's on your mind?"
                    onChangeText={(chit_content) => this.setState({chit_content})}
                    multiline={true}
                    maxLength={141}
                />

                <TouchableOpacity
                    style = {styles.button}
                    onPress={() => this.postChit(token)}
                >
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default PostScreen;


const styles = StyleSheet.create({

    container: {
        minHeight:"100%",
        backgroundColor: '#dedede'
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#af7aff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:30,
        paddingRight: 30,
        borderRadius:10,
        marginRight: 20,
        alignSelf: 'flex-end',
    },

    postInput: {
        fontSize: 20,
    }

})