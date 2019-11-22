import React from 'react';import { Container, Header, Content, Footer, FooterTab, Button, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { StyleSheet, Text, View,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux";
import { getCoffeeShopThunk } from  '../store/utilities/coffeeShop';

class CoffeeShop extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			coffeeShop: []
		};
	}
	
	async componentDidMount() {
		this._isMounted = true;
		try{
			await this.props.getCoffeeShop();
			console.log(this.props.coffeeShop)
			if(this._isMounted){
				this.setState({
					coffeeShop: this.props.coffeeShop
				})
			}
		}
		catch(err){
			console.log(err)
		}

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

    render() {
		let stars= this.getStars(this.state.coffeeShops[0].yelpRating)
		return (
        <Content style={styles.content}>
			<Image
                source={require("../images/coffeeShopImage.jpg")}
                style={styles.background}
            />
			<Item style={{ borderBottomWidth: 0 }}>
                <Text style={styles.Text1}>Coffee Shop </Text>
            </Item>
			<Item style={{ borderBottomWidth: 0, marginBottom: 10}}>
				<Text style={styles.Text2}>Distance Away</Text>
			</Item>
			<Item style={{ borderBottomWidth: 0, marginBottom: 20, marginLeft:"auto", marginRight:"auto"}}>
				{stars}
			</Item>
			<Card style={styles.cardStyle}>
				<CardItem>
					<Body>
						<Text>Price Per Cup</Text>
						<Text>Description</Text>
					</Body>
				</CardItem>
			</Card>
            <Item style={{ borderBottomWidth: 0 }}>
                    {/* <Image
                        source={require("../images/coffeeShopImage.jpg")}
                        style={styles.coffeeShopImage}
                    /> */}
				
            </Item>
        </Content>
        )
    }
}

const mapState = (state) => {
	return {
		coffeeShop: state.coffeeShop
	}
}

const mapDispatch = (dispatch) => {
	return {
		getCoffeeShop: () => dispatch(getCoffeeShopThunk())
	}
}

export default connect(mapState, mapDispatch)(CoffeeShop);

const styles = StyleSheet.create({
	background:{
		height: 200,
		width: "100%"
	},
	midText: {
		marginTop: '50%',
		marginRight: "auto",
		marginLeft: "auto"
	},
	navButton: {
		backgroundColor: "#9A764E",
		borderRadius:0
	},
	navText: {
		color: "white"
	},
	coffeeShopImage: {
		width: '80%',
		height:200,
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: 30
	},
	Text1:{
		marginLeft: "auto",
		marginRight: "auto",
		fontSize: 30,
		marginTop:10
	},
	Text2: {
		marginLeft: "auto",
		marginRight: "auto",
		fontSize: 20
	},
	title: {
		marginTop: 10,
		fontSize: 25,
		padding: 25,
		marginLeft: "auto",
		marginRight: "auto"
	},
	dollar: {
		width: "33%",
		flex: 1,
		justifyContent: 'center'
	},
	inline: {
		flexDirection: 'row'
	},
	signUpButton: {
		padding: 10,
		width: '50%',
		marginTop: 50,
		backgroundColor: '#6f4e37',
		alignSelf: 'center',
		borderRadius: 20
	},
	buttonText: {
		marginRight: 'auto',
		marginLeft: 'auto',
		color: 'white'
	},
	starsStyle:{
		padding: 10
	},
	cardStyle:{
		width: "80%",
		marginRight: 'auto',
		marginLeft: 'auto',
	}
})