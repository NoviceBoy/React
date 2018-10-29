import React from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

class DeckDetail extends React.Component {
	render() {
		var deckName = this.props.navigation.state.params.name
		return (
			<View  style={ styles.container }>
				<Text style={{fontSize: 30, marginTop: 30 }}> { deckName } </Text>
				<Text style={{fontSize: 15, marginBottom: 100, fontStyle:'italic' }}> { this.props.deck[ deckName ].questions.length } card(s) </Text>
				<TouchableOpacity style= { styles.button }
					onPress={ () => {
						this.props.navigation.navigate(
							'Quiz', { deckName: deckName })
					}}>
					<Text style={ styles.textStyle, { color: "white"} }>Start Quiz</Text>
				</TouchableOpacity>
				<TouchableOpacity style= { styles.button } 
					onPress={ () => {
						this.props.navigation.navigate(
							'AddCard', { deckName: deckName })
					}}>
					<Text style={ styles.textStyle, { color: "white" } }>Add Card</Text>
				</TouchableOpacity>
			</View >
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex : 1,
		alignItems: 'center',
		margin: 20,
	},
	button: {
		alignItems: 'center',
		backgroundColor: 'cadetblue',
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

export default connect(mapStateToProps, null ) ( DeckDetail )