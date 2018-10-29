import React from 'react'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

class Quiz extends React.Component {
	state = {
		questionNumber : 0,
		showAnswer: false,
		score: 0,
		displayScore: false,
	}
	render() {
		var deckName = this.props.navigation.state.params.deckName
		var deck = this.props.deck
		var displayNumber = this.state.questionNumber + 1
		var questionNumber = this.state.questionNumber
		if( this.state.displayScore == true ){
			return ( 
				<View style={ styles.container }>
					<Text style={ styles.textContent }> 
					Your score: { this.state.score } out of { deck[ deckName ].questions.length } 
					</Text> 
					<TouchableOpacity style= { styles.correctButton } 
						onPress={ () => {
							this.setState( { 
								questionNumber : 0,
								showAnswer: false,
								score: 0,
								displayScore: false,
							})
							clearLocalNotification()
							.then( setLocalNotification )
						}}>
						<Text style={ { color: "white" } }>Start Again</Text>
					</TouchableOpacity>
					<TouchableOpacity style= { styles.inCorrectButton } 
						onPress={ () => {
							//Going back to home screen, resetting the links
							const resetAction = NavigationActions.reset({
								index: 0,
								actions: [
									NavigationActions.navigate({ routeName: 'Home'})
								] })
							this.props.navigation.dispatch(resetAction);
							//this.props.navigation.navigate(
							//	'Home', null )
							clearLocalNotification()
							.then( setLocalNotification )
						}}>
						<Text style={ { color: "white" } }>Return to Decks</Text>
					</TouchableOpacity>
				</View>
			)
		}

		return (
			<View  style={ styles.container }>
				<Text style={ styles.topText }> { displayNumber }/{deck[ deckName ].questions.length}</Text>
				{ this.state.showAnswer ?
					<Text style={ styles.textContent }> 
					{ deck[ deckName ].questions[ questionNumber ].answer } 
					</Text> :					
					<Text style={ styles.textContent }> 
					{ deck[ deckName ].questions[ questionNumber ].question } 
					</Text> 
				}
				<TouchableOpacity style={ styles.flipButton }
					onPress={ () => { this.setState({ showAnswer : !this.state.showAnswer })
					}}>
					{ this.state.showAnswer ?
						<Text style={ { color: "white" } }>Show Question</Text> :
						<Text style={ { color: "white" } }>Show Answer </Text> }
				</TouchableOpacity>
				<TouchableOpacity style= { styles.correctButton } 
					onPress={ () => { 
						if( this.state.questionNumber <= deck[ deckName ].questions.length ){
							this.setState({ score : this.state.score + 1 })
						}
						if( this.state.questionNumber < deck[ deckName ].questions.length - 1 ){
							this.setState({ questionNumber : this.state.questionNumber + 1 })
						} else {
							this.setState({ displayScore : true })
						}
						this.setState({ showAnswer : false })
					}}>
					<Text style={ { color: "white" } }>Correct</Text>
				</TouchableOpacity>
				<TouchableOpacity style= { styles.inCorrectButton }  
					onPress={ () => {
						if( this.state.questionNumber < deck[ deckName ].questions.length - 1){
							this.setState({ questionNumber : this.state.questionNumber + 1 })
						} else {
							this.setState({ displayScore : true })
						}
						this.setState({ showAnswer : false })
					}}>
					<Text style={ { color: "white" } }>Incorrect</Text>
				</TouchableOpacity> 
			</View >
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex : 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
		borderRadius:5,
		backgroundColor: 'cadetblue',
		borderWidth: 1
	},
	textContent: {
		fontSize: 25,
		marginTop: 30,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	flipButton: {
		padding: 10,
		margin: 10,
		marginTop: 20,
		borderRadius: 5,
		//From Color Wheel
		backgroundColor: '#5d8c99',
	},
	topText: {
		position: 'absolute', 
		top: 0, 
		right: 0, 
		margin: 5,
		fontSize: 15
	},
	correctButton: {
		backgroundColor: '#50c7a7',
		alignItems: 'center',
		padding: 10,
		marginTop: 100,
		margin: 10,
		minHeight: 50,
		alignSelf: 'stretch',
		borderRadius: 5,
	},
	inCorrectButton: {
		backgroundColor: '#ce8c86',
		alignItems: 'center',
		padding: 10,
		margin: 10,
		minHeight: 50,
		alignSelf: 'stretch',
		borderRadius: 5,
	},
})

const mapStateToProps = ( state )  => {
	return { deck : state.decks }
};

export default connect(mapStateToProps, null ) ( Quiz )