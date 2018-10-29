import React from 'react'
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { fetchAllDecks } from '../actions'

class DeckList extends React.Component {
	componentDidMount() {
	    this.props.fetchAllDecks();
	}

	render() {
		var decks = this.props.decks
		return (
			<ScrollView>
				<View style={ styles.container }> 
				{ decks &&  Object.keys( decks ).map(( deckName ) => {
					return (
						<TouchableOpacity key={deckName} style={ styles.button }
							onPress={ () => this.props.navigation.navigate( "DeckDetail", { name : deckName})}>
							<Text style={ styles.textStyle }> { decks[ deckName ].title } </Text>
							<Text style={{fontSize: 15, color:"white", fontStyle: "italic" }} > { decks[ deckName ].questions.length } cards </Text>
						</TouchableOpacity>
						)
				})
				}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex : 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	button: {
		alignItems: 'center',
		backgroundColor: 'cadetblue',
		padding: 10,
		margin: 10,
		alignSelf: 'stretch',
		borderRadius: 5,
	},
	textStyle: {
		fontSize: 20,
		textAlign: 'center',
		color : "white"
	}
})

const mapStateToProps = ( state )  => {
	return { decks : state.decks }
};

export default connect(mapStateToProps, { fetchAllDecks })(DeckList)
