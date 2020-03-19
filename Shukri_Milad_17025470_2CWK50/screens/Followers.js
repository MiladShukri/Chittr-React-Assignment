import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

class FollowersScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            followersData: []
        };

        const {state} = props.navigation;
        id = state.params.id;
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // get request to grab the followers from the api
    getFollowers(){
            return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/followers')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                     isLoading: false,
                     followersData: responseJson,
                });
                console.log(responseJson);
            })
            .catch((error) =>{
                console.log(error);

            });
    }

    componentDidMount(){
             this.getFollowers();
    }

    render(){
        return(
            <View>
                    <FlatList
                        data={this.state.followersData}
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

export default FollowersScreen;

// All the styling for the followers screen is done here.
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