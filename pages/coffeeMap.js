import React from 'react'
import { TouchableOpacity, Text,StyleSheet, View, Modal } from 'react-native'
import { Footer, FooterTab, Card, Button } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { storeCoffeeShopThunk } from '../store/utilities/coffeeShop';

class CoffeeMap extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			marginBottom: 1,
			initialRegion: [],
			pins: [],
			modalVisible: false
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		try {
			await navigator.geolocation.getCurrentPosition(
				async position => {
					const obj = JSON.stringify(position);
					const location = JSON.parse(obj)
					const currLoc = [location[`coords`][`latitude`], location[`coords`][`longitude`]];
					let region = {
						latitude: location[`coords`][`latitude`],
						longitude: location[`coords`][`longitude`],
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					}
					this.mapView.animateToRegion(region, 1000);
					if (this._isMounted) {
						this.setState({
							initialRegion: region
						})
					}
					try {
						let { data } = await axios.get(`https://localroasters-api.herokuapp.com/roasters/?latitude=${location[`coords`][`latitude`]}&longitude=${location[`coords`][`longitude`]}`);
						let pins = [];
						console.log(data)
						data.forEach((item, i) => {
							pins.push(
								<MapView.Marker
									key={i++}
									coordinate={{ latitude: location[`coords`][`latitude`], longitude: location[`coords`][`longitude`] }}
								>
									<MapView.Callout onPress={() => this.handlePress(item)}>
										<Text>{item.name}{"\n"}{item.location.streetName}</Text>
									</MapView.Callout>
								</MapView.Marker>
							)
						});
						if (this._isMounted) {
							this.setState({
								pins: pins
							})
						}
					}
					catch (err) {
						console.log(err)
					}
				},
				error => Alert.alert(error.message),
				{ timeout: 20000, maximumAge: 1000 }
			);
		} catch (err) {
			console.log(err)
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	onMapReady = () => this.setState({ marginBottom: 0 })

	handlePress = (coffeeShop) => {
		this.props.storeCoffeeShop(coffeeShop)
		Actions.coffeeShop();
	}

	goToProfile() {
		Actions.profile()
	}

	goToHome() {
		Actions.home()
	}

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<MapView
					provider={PROVIDER_GOOGLE}
					// onMapReady={this.onMapReady}
					style={{ flex: 1 }}
					initialRegion={{
						latitude: 40.7549,
						longitude: -73.9840,
						latitudeDelta: .08,
						longitudeDelta: .08,
					}}
					showsUserLocation={true}
					showsMyLocationButton={false}
					showsCompass={false}
					loadingEnabled={true}
					ref={ref => { this.mapView = ref }}>
					{this.state.pins}
				</MapView>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => { this.setModalVisible(false); }}>
					<View style={{ marginTop: 22 }}>
						<View>
							<Text>Form</Text>
						</View>
					</View>
				</Modal>
				<TouchableOpacity style={{ position: 'absolute', top: '5%', alignSelf: 'flex-end' }} onPress={() => { this.setModalVisible(true); }}>
					<Card style={{ size: 20 }}>
						<Text>Test</Text>
					</Card>
				</TouchableOpacity>
				<Footer>
					<FooterTab>
						<Button style={styles.navButton} onPress={() => this.goToHome()}>
							<Icon size={24} color="white" name="home"></Icon>
						</Button>
						<Button style={styles.navButton} >
							<Icon size={24} color="white" name="map-marker-radius"></Icon>
						</Button>
						<Button style={styles.navButton} onPress={() => this.goToProfile()}>
							<Icon size={24} color="white" name="account-box"></Icon>
						</Button>
					</FooterTab>
				</Footer>
			</View>
		);
	}
}

const mapState = (state) => {
	return {
		coffeeShop: state.coffeeShop
	}
}

const mapDispatch = (dispatch) => {
	return {
		storeCoffeeShop: (coffeeShop) => dispatch(storeCoffeeShopThunk(coffeeShop))
	}
}

export default connect(mapState, mapDispatch)(CoffeeMap);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	navButton: {
		backgroundColor: "#9A764E",
		borderRadius: 0
	},
	map: {
		zIndex: -1,
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	}
});