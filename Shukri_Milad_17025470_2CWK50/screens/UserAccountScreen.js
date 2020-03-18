import React, { Component } from 'react';
import { TextInput, Button, Text, View, Image, Alert, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

class UserAccount extends Component{

    constructor(props) {
        super(props);
        this.state ={
            isLoading: true,
            accountData:[]
        }

        const {state} = props.navigation;
        id = state.params.id;
        token = state.params.token;
    }

    static navigationOptions = {
        header: null
    }

    getAccountInfo(){
            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                     isLoading: false,
                     accountData: responseJson,
                });

            })
            .catch((error) =>{
                console.log(error);

            });
    }

    followingFunc(id){
            this.props.navigation.navigate('FollowingScreen', {id})
    }

    followersFunc(id){
            this.props.navigation.navigate('FollowersScreen', {id})
    }

    componentDidMount(){
             this.getAccountInfo();
             console
    }

//    componentDidUpdate(){
//             this.getAccountInfo();
//    }

    render(){
        return(
            <View style={styles.container}>
                <Image
                    style={{width: 160, height: 160 }}
                    source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + id +'/photo?timestamp=' + Date.now()}}
                />

                <Text style = {styles.details}> Given Name: {this.state.accountData.given_name} </Text>
                <Text style = {styles.details}> Family Name: {this.state.accountData.family_name} </Text>
                <Text style = {styles.details}> Email: {this.state.accountData.email} </Text>

                <View style={styles.followButtonsContainer}>
                    <TouchableOpacity
                        style={styles.followButtons}
                        onPress={() => this.followersFunc(id)}
                    >
                        <Text style={styles.followText}> Followers </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.followButtons}
                        onPress={() => this.followingFunc(id)}
                    >
                        <Text style={styles.followText}> Following </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default UserAccount;

const styles = StyleSheet.create({

  container: {
      minHeight:"100%",
      backgroundColor: '#dedede'
  },

  button: {
      alignItems: 'center',
      backgroundColor: '#af7aff',
      padding: 10,
      alignSelf: 'flex-end',
      borderRadius:10,
  },

  updatePictureButton: {
      alignItems: 'center',
      backgroundColor: '#af7aff',
      padding: 10,
      width: 160,
      alignSelf: 'flex-start',
      borderRadius:10,
  },

  followButtonsContainer: {
      flexDirection: "row",
      justifyContent: 'space-around',
      top: 100,
  },

  followButtons: {
     backgroundColor: '#af7aff',
     padding: 20,
     borderRadius:10,
  },

  list: {
        height: 100
  },

  users: {
       alignItems:"center",
       justifyContent: 'space-between',
       flexDirection: "row",
       backgroundColor: '#e6ccff',
       padding: 10,
       marginVertical: 8,
       marginHorizontal: 16,
       borderRadius:20,
  },

  followText: {
      fontSize: 20,
  },

  details: {
       padding: 20,
       fontSize: 15,
  },

})