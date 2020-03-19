import React, { Component } from 'react';
import { ActivityIndicator, TextInput, FlatList, Button, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

class HomeScreenLoggedOut extends Component{

    constructor(props) {
            super(props);
            this.state ={
                isLoading: true,
                // variable for all the data we get from the chits
                chittsData:[]
            }
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // get request function for the chits
    getData(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                 isLoading: false,
                 // sets the variable to the json response
                 chittsData: responseJson,
            });
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    // calls the get request when on the page
    componentDidMount(){
             this.getData();
    }

    // calls the request every second to keep the chits updating
    componentDidUpdate(){
             this.getData();
    }


    render(){
            return(
                <View style= {styles.container}>
                    <Text style= {styles.title}>
                        Chittr
                    </Text>{/*Shows the title chittr*/}
                    <TouchableOpacity
                        style={styles.logInButton}
                        onPress={() => this.props.navigation.navigate('LogIn')}
                    >
                        <Text> Log In </Text>
                    </TouchableOpacity>{/*Button that navigates to the log in page*/}

                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    >
                        <Text> Sign up </Text>
                    </TouchableOpacity>{/*Button that navigates to the sign in page*/}

                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => this.props.navigation.navigate('SearchLoggedOut')}
                    >
                        <Text> Search </Text>
                    </TouchableOpacity>{/*Button that navigates to the search page*/}

                    <FlatList style={styles.list}
                        data={this.state.chittsData}
                        renderItem={({item}) =>
                            <View  style={styles.chits}>
                            <Text>

                            <Text style={{fontWeight: "bold"}}> {item.user.given_name}: </Text>

                            {item.chit_content}

                            </Text>
                                <Image
                                        style={{width: 50, height: 50, marginTop: 10}}
                                        source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + item.chit_id +'/photo'}}
                                />{/*Use the uri to get the chitt images of the posts from the api*/}
                            </View>
                            }
                    keyExtractor={({id}, index) => id}
                />
                </View>
            )
    }
}

export default HomeScreenLoggedOut;

// All the styling for the home logged out page is done here.
const styles = StyleSheet.create({

  list: {
          height: 100
  },

  title: {
          top: 20,
          alignSelf: 'center',
          fontSize:40,
          fontFamily: "Arial",
          color: '#9933ff',
          fontWeight: "bold",
  },

  container: {
          minHeight:"100%",
          backgroundColor: '#dedede'
  },

  searchButton: {
          alignItems:'center',
          alignSelf: 'center',
          backgroundColor: '#af7aff',
          padding: 10,
          borderRadius: 10,
          width: 100,
          bottom: 45,
  },

  logInButton: {
          alignItems: 'center',
          alignSelf:"flex-start",
          backgroundColor: '#af7aff',
          padding: 10,
          borderRadius: 10,
          width: 100,
          left: 20,
          bottom: 25,
  },

  signUpButton: {
          alignItems: 'center',
          alignSelf:"flex-end",
          backgroundColor: '#af7aff',
          padding: 10,
          borderRadius: 10,
          width: 100,
          right: 20,
          bottom: 65,

  },

  chits: {
          backgroundColor: '#e6ccff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 20,
  }

})

