import React from 'react';import { Container, Header, Content, Footer, FooterTab, Button, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { StyleSheet, Text, View,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';


export default class CoffeeShop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			coffeeShops: [
				{
				  id: "1",
				  title: "Cafe Bene",
				  distance: "0.1",
				  img: "https://i.imgur.com/CXgFFLK.png",
				  coffeeBeans: 3,
				  yelpRating:4
				}
			]
		};
	}
	getStars(yelpRating){
		let stars=[]
		for(let i=0; i<yelpRating; i++){
		  stars.push((<Image source={require("./../images/YelpStar.png")} style={{ height: 30, width: 30, flexDirection: 'row', marginLeft:5}}/>))
		}
		return stars
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