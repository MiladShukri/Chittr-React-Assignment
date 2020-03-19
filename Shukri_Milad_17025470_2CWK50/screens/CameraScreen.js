import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';

class CameraScreen extends Component{

    constructor(props) {
        super(props);
        this.state ={
            isLoading: true,
            photoData:'',
        }

        const {state} = props.navigation;
        id = state.params.id;
        token = state.params.token;
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    componentDidMount(){
             console.log(id, token);
    }

    // post request to update the photo for your account
    updatePhoto(data){
        return fetch("http://10.0.2.2:3333/api/v0.0.5/user/photo",
        {
            method: 'POST',
            headers: {
                'Content-Type':'image/png',
                'X-Authorization': token
            },
            body: data
        })
        .then((response) => {
            Alert.alert("Photo Updated!");
            this.props.navigation.navigate('HomeLoggedIn');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                        style={styles.preview}
                />

                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{ fontSize: 16 }}>
                            CAPTURE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
    //when the picture is taken calls the update photo function
     takePicture = async() => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.updatePhoto(data);
        }
     };
}

export default CameraScreen;

// All the styling for the camera screen is done here.
const styles = StyleSheet.create({

 container: {
    flex: 1,
    flexDirection: 'column'
 },

 preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
 },

 capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
 }
});
