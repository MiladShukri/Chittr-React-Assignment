import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreenLoggedOut from './screens/HomeScreen(Logged out)';
import HomeScreenLoggedIn from './screens/HomeScreen(Logged in)';
import SignUpScreen from './screens/SignUpScreen';
import LogInScreen from './screens/LogInScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import SearchedUserScreenLoggedOut from './screens/SearchedUserScreen(Logged out)';
import SearchedUserScreenLoggedIn from './screens/SearchedUserScreen(Logged in)';
import PostScreen from './screens/PostScreen';


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
    }
});


const AppContainer = createAppContainer(AppStackNav)

export default AppContainer;