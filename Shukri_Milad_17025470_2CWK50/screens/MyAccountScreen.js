import React, { Component } from 'react';
import { TextInput, Button, Text, View, Image, Alert, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

class MyAccount extends Component{

    constructor(props) {
        super(props);
        this.state ={
                        isLoading: true,
                        chittsData:[]
                    }
    }


    render(){
        return(
            <View style={styles.container}>
                <Image
                    style={{width: 160, height: 160 }}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />

                <TouchableOpacity
                    style={styles.updatePictureButton}
                >
                    <Text> Update Profile Picture </Text>
                </TouchableOpacity>



                <TouchableOpacity
                    style={styles.button}
                >
                    <Text> Update Account Information </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default MyAccount;

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

  list: {
        height: 100
  },

  details: {
        backgroundColor: '#e6ccff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20,
  },

})