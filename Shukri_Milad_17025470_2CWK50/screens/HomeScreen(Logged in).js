import React, { Component } from 'react';
import { TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity, StyleSheet, Image} from 'react-native';

class HomeScreenLoggedIn extends Component{

    constructor(props) {
        super(props);
        this.state ={
            isLoading: true,
            chittsData:[],
        }

        const {state} = props.navigation;
        id = state.params.id;
        token = state.params.token;
    }

    static navigationOptions = {
        header: null
    }

    logOut(){
            return fetch("http://10.0.2.2:3333/api/v0.0.5/logout",
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json',
                    'X-Authorization': token
                },

            })
            .then((response) => {
                this.props.navigation.navigate('HomeLoggedOut');
                Alert.alert("Logged out!", "Bye!");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getData(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                 isLoading: false,
                 chittsData: responseJson,
            });
           //console.log("logged in with: ", token, id);
        })
        .catch((error) =>{
            console.log(error);

        });
    }

    postFunc(token){
        this.props.navigation.navigate('PostScreen', {id, token})
    }

    accountFunc(id, token){
        this.props.navigation.navigate('MyAccount', {id, token})
    }

    componentDidMount(){
         this.getData();
         console.log(id, token)
    }

    componentDidUpdate(){
         this.getData();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style= {styles.title}>
                         Chittr
                </Text>

                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={() => this.logOut()}
                >
                    <Text> Log Out </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.myAccountButton}
                    onPress={() => this.accountFunc(id, token)}
                >
                    <Text> My Account </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.postButton}
                    onPress={() => this.postFunc(token) }
                >
                    <Text> Post </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => this.props.navigation.navigate('SearchLoggedIn')}
                >
                    <Text> Search </Text>
                </TouchableOpacity>

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
                                />
                            </View>
                            }
                    keyExtractor={({id}, index) => id}
                />
            </View>
        );
    }
}

export default HomeScreenLoggedIn;

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