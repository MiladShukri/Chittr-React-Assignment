import React, { Component } from 'react';
import { TextInput, Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';


class PostScreen extends Component{

    constructor(props) {
        super(props);
        this.state ={
            chit_id: [],
            timestamp: [],
            chit_content:'',
        }

        const {state} = props.navigation;
        id = state.params.id;
        token = state.params.token;
    }

    static navigationOptions = {
        header: null
    }

    postChit(token, id){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/chits",
            {
                method: 'POST',
                headers: {
                    Accept:"application/json",
                    'Content-Type':'application/json',
                    'X-Authorization': token
                },
                body: JSON.stringify({
                    chit_content: this.state.chit_content,
                    // grabs todays date and uses it to timestamp
                    timestamp: Date.now()
                })
            })
            .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                             chit_id: responseJson,
                        });
                        console.log(responseJson);
                        this.props.navigation.navigate('HomeLoggedIn', id)
                    })
            .catch((error) => {
                console.error(error);
            });
        }

    componentDidMount(){
        console.log("post screen token: ", token);
        console.log("post screen id: ", id);
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