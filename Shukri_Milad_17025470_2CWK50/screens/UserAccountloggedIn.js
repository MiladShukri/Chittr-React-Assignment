import React, { Component } from 'react';
import { TextInput, Button, Text, View, Image, Alert, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

class UserLoggedIn extends Component{

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

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // this function uses a get request to get the users account information
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

    // this function uses a post request to follow a user
    follow(){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + id + "/follow",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                    'X-Authorization': token
                },

            })
            .then((response) => {
                Alert.alert("Account Followed");
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Failed to follow account");
            });
    }

    // this function uses a delete request to unfollow a user
    unfollow(){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/user/" + id + "/follow",
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                    'X-Authorization': token
                },

            })
            .then((response) => {
                Alert.alert("Account Unfollowed");
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Failed to unfollow account");
            });
    }

    // this function navigates to the following screen and sends the id
    followingFunc(id){
            this.props.navigation.navigate('FollowingScreen', {id})
    }

    // this function navigates to the followers screen and sends the id
    followersFunc(id){
            this.props.navigation.navigate('FollowersScreen', {id})
    }

    componentDidMount(){
             this.getAccountInfo();
    }



    render(){
        return(
            <View style={styles.container}>

                <View style={styles.topRow}>

                    <Image
                        style={{width: 160, height: 160 }}
                        source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + id +'/photo?timestamp=' + Date.now()}}
                    />

                    <View style={styles.followUnfollowButtons}>
                        <TouchableOpacity
                            style={styles.followButtons}
                            onPress={() => this.follow()}
                        >
                            <Text style={styles.followText}> Follow </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.unfollowButton}
                            onPress={() => this.unfollow()}
                        >
                            <Text style={styles.followText}> Unfollow </Text>
                        </TouchableOpacity>
                    </View>

                </View>

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

export default UserLoggedIn;

// All the styling for the user account page is done here.
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

  unfollowButton: {
      marginTop:10,
      backgroundColor: '#af7aff',
      padding: 20,
      borderRadius:10,
      alignSelf:"center",
  },

  followButtons: {
     backgroundColor: '#af7aff',
     padding: 20,
     borderRadius:10,
     alignSelf:"center",
  },

  list: {
        height: 100
  },

  followUnfollowButtons: {
       flexDirection: "column",
       paddingRight: 50,
       alignSelf: "center",
  },

  topRow: {
       flexDirection: "row",
       justifyContent: 'space-between',
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