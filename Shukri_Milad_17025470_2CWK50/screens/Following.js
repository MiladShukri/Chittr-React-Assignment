import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

class FollowingScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            followingData: []
        };

        const {state} = props.navigation;
        id = state.params.id;
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // get request to grab who the user is following from the api
    getFollowing(){
            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/following')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                     isLoading: false,
                     followingData: responseJson,
                });
                console.log(responseJson);
            })
            .catch((error) =>{
                console.log(error);

            });
    }

    componentDidMount(){
             this.getFollowing();
    }
    render(){
        return(
            <View>
                    <FlatList
                        data={this.state.followingData}
                        renderItem={({item}) =>
                            <Text style={styles.chits}>

                            {item.given_name}

                            </Text>}
                        keyExtractor={({id}, index) => id}
                    />
            </View>
        );
    }
}

export default FollowingScreen;

// All the styling for the following screen is done here.
const styles = StyleSheet.create({

  container: {
      minHeight:"100%",
      backgroundColor: '#dedede'
  },



  chits: {
          backgroundColor: '#e6ccff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 20,
  }

})