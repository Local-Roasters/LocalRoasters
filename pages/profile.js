import React from 'react'; import { Container, Header, Content, Footer, FooterTab, Button, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import { storeUserPrefThunk } from '../store/utilities/userPref';
import Constants from 'expo-constants';
import axios from 'axios';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected2: undefined,
			seg1: 1,
			seg2: 1,
			seg3: 1,
			money1: 1,
			money2: 1,
			money3: 1,
			coffee: "",
			price: 1
		};
	}

	componentDidMount = async () => {
		let deviceId = Constants.installationId;
		try {
			let { data } = await axios.get(`https://localroasters-api.herokuapp.com/users/?phoneID=${deviceId}`);
			data.price === 1 ? this.setState({ money1: 2 }) : data.price === 2 ? this.setState({ money2: 2 }) : this.setState({ money3: 2 });
			data.coffee.roast === "Light" ? this.setState({ seg1: 2 }) : data.coffee.roast === "Medium" ? this.setState({ seg2: 2 }) : this.setState({ seg3: 2 });
			this.setState({
				coffee: data.coffee.roast,
				price: data.price
			})
		}
		catch (err) {
			console.log(err);
		}
	}

	onValueChange2(value) {
		this.setState({
			selected2: value
		});
	}

	goToAbout = () => {
		Actions.home()
	}
	goToCoffeeMap = () => {
		Actions.coffeeMap();
	}
	onChangeCoffee1() {
		if (this.state.seg1 == 2) {
			this.setState({ seg1: 1, seg2: 1, seg3: 1 })
		}
		else {
			this.setState({ seg1: 2, seg2: 1, seg3: 1 })
		}
		this.setState({ coffee: "Light" })
	}
	onChangeCoffee2() {
		if (this.state.seg2 == 2) {
			this.setState({ seg1: 1, seg2: 1, seg3: 1 })
		}
		else {
			this.setState({ seg1: 1, seg2: 2, seg3: 1 })
		}
		this.setState({ coffee: "Medium" })
	}
	onChangeCoffee3() {
		if (this.state.seg3 == 2) {
			this.setState({ seg1: 1, seg2: 1, seg3: 1 })
		}
		else {
			this.setState({ seg1: 1, seg2: 1, seg3: 2 })
		}
		this.setState({ coffee: "Dark" })
	}
	onChangeMoney1() {
		if (this.state.money1 == 2) {
			this.setState({ money1: 1, money2: 1, money3: 1 })
		}
		else {
			this.setState({ money1: 2, money2: 1, money3: 1 })
		}
		this.setState({ price: 1 })
	}
	onChangeMoney2() {
		if (this.state.money2 == 2) {
			this.setState({ money1: 1, money2: 1, money3: 1 })
		}
		else {
			this.setState({ money1: 1, money2: 2, money3: 1 })
		}
		this.setState({ price: 2 })
	}
	onChangeMoney3() {
		if (this.state.money3 == 2) {
			this.setState({ money1: 1, money2: 1, money3: 1 })
		}
		else {
			this.setState({ money1: 1, money2: 1, money3: 2 })
		}
		this.setState({ price: 3 })
	}

	onSubmit() {
		let data = {
			"phoneID": Constants.installationId,
			"coffee": { "roast": this.state.coffee },
			"price": this.state.price
		}
		this.props.storeUserPref(data)
		axios.put(`https://localroasters-api.herokuapp.com/users/`, data);
	}
	goToHome() {
		Actions.home()
	}
	render() {
		return (
			<Container>
				<Content style={styles.content}>
					<Item style={{ borderBottomWidth: 0 }}>
						<Image
							source={require("../images/profile.png")}
							style={styles.profileImage}
						/>
					</Item>
					<Item style={{ borderBottomWidth: 0 }}>
						<Text style={styles.idText}>ID: 0571095730</Text>
					</Item>
					<Text style={styles.title}>Your Roast</Text>
					<Card >
						<CardItem style={styles.dollar, {
							backgroundColor: this.state.seg1 === 1 ? "white" : this.state.seg1 === 2 ? "#D0B99B" : undefined,
							borderColor: "red"
						}} header button onPress={() => this.onChangeCoffee1()}>
							<Text>Light</Text>
						</CardItem>
						<CardItem style={styles.dollar, {
							backgroundColor: this.state.seg2 === 1 ? "white" : this.state.seg2 === 2 ? "#D0B99B" : undefined,
							borderColor: "red"
						}} button onPress={() => this.onChangeCoffee2()}>
							<Text>Medium</Text>
						</CardItem>
						<CardItem style={styles.dollar, {
							backgroundColor: this.state.seg3 === 1 ? "white" : this.state.seg3 === 2 ? "#D0B99B" : undefined,
							borderColor: "red"
						}} footer button onPress={() => this.onChangeCoffee3()}>
							<Text>Dark</Text>
						</CardItem>
					</Card>
					<Text></Text>
					<View style={styles.inline}>
						<Button style={styles.dollar, {
							backgroundColor: this.state.money1 === 1 ? "white" : this.state.money1 === 2 ? "#D0B99B" : undefined,
							width: "33%", justifyContent: 'center'
						}} squared light onPress={() => this.onChangeMoney1()}>
							<Text >$</Text>
						</Button>
						<Button style={styles.dollar, {
							backgroundColor: this.state.money2 === 1 ? "white" : this.state.money2 === 2 ? "#D0B99B" : undefined,
							width: "33%", justifyContent: 'center'
						}} squared light onPress={() => this.onChangeMoney2()}>
							<Text>$$</Text>
						</Button>
						<Button style={styles.dollar, {
							backgroundColor: this.state.money3 === 1 ? "white" : this.state.money3 === 2 ? "#D0B99B" : undefined,
							width: "33%", justifyContent: 'center'
						}} squared light onPress={() => this.onChangeMoney3()}>
							<Text>$$$</Text>
						</Button>
					</View>
					<Button style={styles.signUpButton} onPress={() => this.onSubmit()}>
						<Text style={styles.buttonText}>Update</Text>
					</Button>
				</Content>
				<Footer>
					<FooterTab>
						<Button style={styles.navButton} onPress={() => this.goToHome()}>
							<Icon size={24} color="white" name="home"></Icon>
						</Button>
						<Button style={styles.navButton} onPress={() => this.goToCoffeeMap()}>
							<Icon size={24} color="white" name="map-marker-radius"></Icon>
						</Button>
						<Button style={styles.navButton}>
							<Icon size={24} color="white" name="account-box"></Icon>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

const mapState = state => {
	return {
		userPref: state.userPref
	};
};

const mapDispatch = dispatch => {
	return {
		storeUserPref: (preferences) => dispatch(storeUserPrefThunk(preferences))
	};
};

export default connect(mapState, mapDispatch)(Profile);

const styles = StyleSheet.create({
	midText: {
		marginTop: '50%',
		marginRight: "auto",
		marginLeft: "auto"
	},
	navButton: {
		backgroundColor: "#9A764E",
		borderRadius: 0
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
