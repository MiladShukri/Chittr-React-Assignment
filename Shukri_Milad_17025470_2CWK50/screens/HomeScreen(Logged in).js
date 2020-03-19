import React, { Component } from 'react';
import { TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity, StyleSheet, Image} from 'react-native';

class HomeScreenLoggedIn extends Component{

    constructor(props) {
        super(props);
        this.state ={
            isLoading: true,
            // variable for all the data we get from the chits
            chittsData:[],
        }

        const {state} = props.navigation;
        id = state.params.id;
        token = state.params.token;
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    // post request function to log out
    logOut(){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                    // Grabs the token from the header
                    'X-Authorization': token
                },

            })
            .then((response) => {
                // from the response go to the logged out home screen and send an alert
                this.props.navigation.navigate('HomeLoggedOut');
                Alert.alert("Logged out!", "Bye!");
            })
            .catch((error) => {
                console.error(error);
            });
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
           //console.log("logged in with: ", token, id);
        })
        .catch((error) =>{
            console.log(error);

        });
    }
    //function to take the token and send it to the post screen as well as clear the global.photoData.
    postFunc(token){
        this.props.navigation.navigate('PostScreen', {id, token})
        global.photoData=('');
    }

    //function to take id and the token and send it to my account screen.
    accountFunc(id, token){
        this.props.navigation.navigate('MyAccount', {id, token})
    }

    // calls the get request when on the page
    componentDidMount(){
         this.getData();
         console.log(id, token)
    }

    // calls the request every second to keep the chits updating
    componentDidUpdate(){
         this.getData();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style= {styles.title}>
                         Chittr
                </Text>{/*Shows the title chittr*/}

                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={() => this.logOut()}
                >
                    <Text> Log Out </Text>
                </TouchableOpacity>{/*Button that calls the log out post request and navigates to the logged out home screen*/}

                <TouchableOpacity
                    style={styles.myAccountButton}
                    onPress={() => this.accountFunc(id, token)}
                >
                    <Text> My Account </Text>
                </TouchableOpacity>{/*Button that navigates to the my account page and sends the token and id*/}

                <TouchableOpacity
                    style={styles.postButton}
                    onPress={() => this.postFunc(token) }
                >
                    <Text> Post </Text>
                </TouchableOpacity>{/*Button that navigates to the post page and send the token*/}

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => this.props.navigation.navigate('SearchLoggedIn')}
                >
                    <Text> Search </Text>
                </TouchableOpacity>{/*Button that navigates to the search page*/}

                <FlatList style={styles.list}
                    data={this.state.chittsData}
                        renderItem={({item}) =>
                            <View style={styles.chits}>
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
        );
    }
}

export default HomeScreenLoggedIn;

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
        alignSelf: 'flex-end',
        backgroundColor: '#af7aff',
        padding: 10,
        borderRadius: 10,
        width: 100,
        bottom: 75,
        right: 20,
  },

  logOutButton: {
        alignItems: 'center',
        alignSelf:"flex-start",
        backgroundColor: '#af7aff',
        padding: 10,
        borderRadius: 10,
        width: 100,
        left: 20,
        bottom: 25,
  },

  myAccountButton: {
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
        borderRadius:20,
  },

  postButton: {
        alignItems:'center',
        alignSelf: 'flex-start',
        backgroundColor: '#af7aff',
        padding: 10,
        borderRadius: 10,
        width: 100,
        bottom: 35,
        left: 20,
  }

})