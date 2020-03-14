import React, { Component } from 'react';
import { TextInput, Button, Text, View, StyleSheet, TouchableOpacity, FlatList, Alert, Image} from 'react-native';

class SearchUserScreenLoggedIn extends Component{

    constructor(props) {
        super(props);
        this.state = {
                    given_name: '',

                };
    }

    getAccount(){
        console.log('http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + this.state.given_name);
                return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + this.state.given_name)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        searchData: responseJson,
                    });
                })
                .catch((error) =>{
                    console.log(error);

                });
        }

    test(){
        console.log(given_name)
    }

    componentDidMount(){
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search users:"
                    onChangeText={(given_name) => this.setState({given_name})}
                    value={this.state.given_name}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => this.getAccount()}
                >
                    <Text> Search </Text>
                </TouchableOpacity>

                <FlatList style = {styles.list}
                    data={this.state.searchData}
                        renderItem={({item}) =>
                        <View style = {styles.users}>

                            <Image
                                style={{width: 50, height: 50 }}
                                source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                            />

                            <Text style = {styles.userText} >
                                {item.given_name}
                            </Text>

                                <View style = {styles.buttonSection}>


                                    <TouchableOpacity style = {styles.followButtons}>
                                        <Text>Follow</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style = {styles.followButtons}>
                                        <Text>Followers</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style = {styles.followButtons}>
                                        <Text>Following</Text>
                                    </TouchableOpacity>

                                </View>
                        </View>
                        }
                    keyExtractor={({id}, index) => id}
                />
            </View>
        );
    }
}

export default SearchUserScreenLoggedIn;

const styles = StyleSheet.create({

  list: {
        height: 100
  },

  container: {
      minHeight:"100%",
      backgroundColor: '#dedede'
  },

  followButtons: {
      backgroundColor: '#af7aff',
      flexDirection: "row",
      alignItems: 'center',
      backgroundColor: '#af7aff',
      padding: 10,
      borderRadius:10,
      margin: 5,
  },

  userText: {
      fontSize:15,
  },

  buttonSection: {
    justifyContent: 'space-around',
    flexDirection: "row",
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

  button: {
      alignItems: 'center',
      backgroundColor: '#af7aff',
      padding: 10,
      borderRadius:10,
  },

  searchBar: {
      margin: 15,
      height: 40,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft:10,
      paddingRight:10,
      bottom: 0,
  },

  searchButton: {
        alignItems:'center',
        alignSelf: 'flex-end',
        backgroundColor: '#af7aff',
        padding: 10,
        borderRadius: 10,
        width: 100,
        right: 25,
  },

})