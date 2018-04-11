import React from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, 
		 TouchableOpacity, TextInput } from 'react-native'
import { addToDecks } from '../actions'
import { connect } from 'react-redux';

class AddDeck extends React.Component {
	state = { deckName : '' }

	changeText = ( text ) => {
		this.setState({ deckName: text })
	}

	submitDeck = () => {
		this.props.addToDecks( this.state.deckName )
		this.props.navigation.navigate( "DeckDetail", { name: this.state.deckName })
		this.setState( { deckName: ''})
	}
	render() {
		return (
			<KeyboardAvoidingView  style={ styles.container } behavior="padding">
				<Text style={{fontSize: 20 }}> Enter the deck name: </Text>
				<TextInput style={ styles.dInput }
					onChangeText={ this.changeText }
					placeholder="Enter name"
					value={ this.state.deckName }></TextInput>
				<TouchableOpacity style= { styles.button } onPress={ this.submitDeck }>
					<Text style={ styles.textStyle }>Create Deck</Text>
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

const mapStateToProps = ( state )  => {
	return { decks : state.decks }
};

export default connect(null, { addToDecks } ) ( AddDeck )