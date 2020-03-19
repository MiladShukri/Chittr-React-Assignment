import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { RNCamera } from 'react-native-camera';
import HomeScreenLoggedOut from './screens/HomeScreen(Logged out)';
import HomeScreenLoggedIn from './screens/HomeScreen(Logged in)';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import UserAccountScreen from './screens/UserAccountScreen';
import UserAccountLoggedIn from './screens/UserAccountloggedIn';
import SearchedUserScreenLoggedOut from './screens/SearchedUserScreen(Logged out)';
import SearchedUserScreenLoggedIn from './screens/SearchedUserScreen(Logged in)';
import PostScreen from './screens/PostScreen';
import InfoScreen from './screens/UpdateInformation';
import FollowingScreen from './screens/Following';
import FollowersScreen from './screens/Followers';
import CameraScreen from './screens/CameraScreen';
import PostCameraScreen from './screens/PostCameraScreen';
// Import the stack navigation, camera and all the screens of my application

const AppStackNav = createStackNavigator({

    HomeLoggedOut: {
        screen: HomeScreenLoggedOut
    },
    HomeLoggedIn: {
        screen: HomeScreenLoggedIn
    },
    SignUp: {
        screen: SignUpScreen
    },
    LogIn: {
        screen: LogInScreen
    },
    MyAccount: {
        screen: MyAccountScreen
    },
    SearchLoggedOut: {
        screen: SearchedUserScreenLoggedOut
    },
    SearchLoggedIn: {
        screen: SearchedUserScreenLoggedIn
    },
    PostScreen: {
        screen: PostScreen
    },
    InformationScreen: {
        screen: InfoScreen
    },
    FollowingScreen: {
        screen: FollowingScreen
    },
    FollowersScreen: {
        screen: FollowersScreen
    },
    UserAccount: {
        screen: UserAccountScreen
    },
    UserLoggedIn: {
        screen: UserAccountLoggedIn
    },
    CameraScreen: {
        screen: CameraScreen
    },
    PostCameraScreen: {
        screen: PostCameraScreen
    },
    // Here i have set every screen into the stack navigator so i can navigate around my application.
});


const AppContainer = createAppContainer(AppStackNav)

export default AppContainer;