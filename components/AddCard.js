import React from 'react'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet, Text, KeyboardAvoidingView, 
		 TouchableOpacity, TextInput } from 'react-native'
import { saveCardToDeck } from '../actions'

class AddCard extends React.Component {
	state = { question : '', answer: '' }

	changeQuestion = ( text ) => {
		this.setState({ question: text })
	}
	changeAnswer = ( text ) => {
		this.setState({ answer: text })
	}

	submitDeck = ( deck ) => {
		var card = { "question" : this.state.question,
					 "answer": this.state.answer }
		this.props.saveCardToDeck( deck, card )
		this.props.navigation.dispatch(NavigationActions.back( { key: null }))
	}
	render() {
		deckName = this.props.navigation.state.params.deckName
		return (
			<KeyboardAvoidingView  style={ styles.container } behavior="padding">
				<Text style={{fontSize: 20 }}> Enter the card details: </Text>
				<TextInput style={ styles.dInput }
					onChangeText={ this.changeQuestion }
					placeholder="Question"
					value={ this.state.question }></TextInput>
				<TextInput style={ styles.dInput }
					onChangeText={ this.changeAnswer}
					placeholder="Answer"
					value={ this.state.answer }></TextInput>
				<TouchableOpacity style= { styles.button } onPress={ () => this.submitDeck( deckName ) }>
					<Text style={ styles.textStyle }>Create card</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView >
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex : 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		alignItems: 'center',
		backgroundColor: 'cadetblue',
		padding: 10,
		margin: 10,
		borderRadius: 5,
	},
	textStyle: {
		fontSize: 15,
		textAlign: 'center',
		color : "white"
	},
	dInput: {
		borderRadius: 2,
		borderColor: "cadetblue",
		borderWidth: 1,
		padding: 10,
		margin:20,
		alignSelf: 'stretch'
	}
})

export default connect(null, { saveCardToDeck } )(AddCard)