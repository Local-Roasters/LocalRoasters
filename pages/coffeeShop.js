import React from 'react';import { Container, Header, Content, Footer, FooterTab, Button, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { StyleSheet, Text, View,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';


export default class CoffeeShop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
    }
    render() {
		return (
        <Content style={styles.content}>
            <Item style={{ borderBottomWidth: 0 }}>
                    <Image
                        source={require("../images/profile.png")}
                        style={styles.profileImage}
                    />
                </Item>
                <Item style={{ borderBottomWidth: 0 }}>
                    <Text style={styles.idText}>Coffee Shop</Text>
                </Item>
        </Content>
        )
    }
}
const styles = StyleSheet.create({
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
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 10,
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: '20%'
	},
	idText: {
		marginLeft: "auto",
		marginRight: "auto"
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
})