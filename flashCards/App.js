import React from 'react'
import { View , StyleSheet } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import appReducer from './reducers/index'
import ReduxThunk from 'redux-thunk';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { setLocalNotification, clearLocalNotification } from './utils/notifications'

const AppTabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="home" size={30} color={tintColor} />
    }
  },
  AddCard: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: 'cadetblue'
  }
});

const AppNavigator =  StackNavigator({
  Home: {
    screen: AppTabs,
    navigationOptions: {
      title: "Learn Spanish",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "cadetblue"
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: "Deck",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: 'cadetblue'
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: 'cadetblue'
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: 'cadetblue'
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount(){
    //Added for testing
    clearLocalNotification()
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(appReducer, {}, applyMiddleware( ReduxThunk ))}>
        <View style={ { flex : 1 }}>
          <AppNavigator/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex : 1,
		justifyContent: 'center',
		alignItems: 'center',
    margin: 20,
	}
})