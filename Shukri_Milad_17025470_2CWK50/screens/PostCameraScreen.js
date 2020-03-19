import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';

class PostCameraScreen extends Component{

    constructor(props) {
        super(props);
        this.state ={
            isLoading: true,
            //photoData: '',
        }

        const {state} = props.navigation;
        id = state.params.id;
        token = state.params.token;

        global.photoData
    }

    // removes the header at the top of the application
    static navigationOptions = {
        header: null
    }

    componentDidMount(){
             console.log(id, token);
             console.log(global.photoData);
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

     //when the picture is taken grabs the photodate and navigates to the post screen.
     takePicture = async() => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            global.photoData=(data);
            this.props.navigation.navigate('PostScreen');
            Alert.alert("Photo Taken!");

        }
     };
}

export default PostCameraScreen;

// All the styling for the post camera screen page is done here.
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