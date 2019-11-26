import React from 'react'
import { StyleSheet,View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import axios from 'axios';

const width = '33%';
class Landing extends React.Component {
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

	async componentDidMount() {
		let deviceId = Constants.installationId;
		console.log(deviceId)
		try{
			let {data} = await axios.get(`https://localroasters-api.herokuapp.com/users/?phoneID=${deviceId}`);
			if(data){
				Actions.home();
			}
		}
		catch(err){
			console.log(err);
		}
	}

	onValueChange2(value) {
		this.setState({
			selected2: value
		});
	}
	goToHome = () => {
		Actions.home()
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
			"coffee": {"roast": this.state.coffee},
			"price": this.state.price
		}
		console.log(data)
		axios.post(`https://localroasters-api.herokuapp.com/users/`,data);
		Actions.home()
	}
	render() {
		return (
			<Container style={styles.container}>
				<Content style={styles.content}>
					<View >
						<Text style={styles.title}>Customize Your Roast</Text>
						<Image source={require("../images/Local_Roast_Logo.png")} style={styles.logo} />
					</View>
					<Card>
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
					<View style={styles.inline}>
						<Button style={styles.dollar, {
							backgroundColor: this.state.money1 === 1 ? "white" : this.state.money1 === 2 ? "#D0B99B" : undefined,
							width, justifyContent: 'center'
						}} squared light onPress={() => this.onChangeMoney1()}>
							<Text >$</Text>
						</Button>
						<Button style={styles.dollar, {
							backgroundColor: this.state.money2 === 1 ? "white" : this.state.money2 === 2 ? "#D0B99B" : undefined,
							width, justifyContent: 'center'
						}} squared light onPress={() => this.onChangeMoney2()}>
							<Text>$$</Text>
						</Button>
						<Button style={styles.dollar, {
							backgroundColor: this.state.money3 === 1 ? "white" : this.state.money3 === 2 ? "#D0B99B" : undefined,
							width, justifyContent: 'center'
						}} squared light onPress={() => this.onChangeMoney3()}>
							<Text>$$$</Text>
						</Button>
					</View>
					<Button style={styles.signUpButton} onPress={() => this.onSubmit()}>
						<Text style={styles.buttonText}>Submit</Text>
					</Button>
				</Content>
			</Container>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		width: "100%"
	},
	content: {
		width: '80%',
		marginRight: 'auto',
		marginLeft: 'auto'
	},
	header: {
		backgroundColor: "brown",
		width: "100%",
	},
	logo: {
		marginTop: 10,
		width: 200,
		height: 200,
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	title: {
		fontSize: 25,
		padding: 25,
		marginTop: "20%",
		color: '#B98B50',
		marginRight: 'auto',
		marginLeft: 'auto'
	},
	dollar: {
		width,
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
	}
})
export default Landing