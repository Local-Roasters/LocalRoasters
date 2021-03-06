import React from "react";
import { Container, CardItem, Footer, FooterTab, Button, Card, Body, Left, Right, Header } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, Text, TouchableHighlight, View, Linking, Platform, location } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { storeCoffeeShopThunk, getCoffeeShopThunk } from "../store/utilities/coffeeShop";
import { getUserPrefThunk } from "../store/utilities/userPref";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeShops: [],
      userData: {},
      sustainableCoffeeShops: [],
      sustainableFilter: false,
    };
    this.goToCoffeeShop = this.goToCoffeeShop.bind(this);
  }
  async componentDidMount() {
    this._isMounted = true;
    await this.props.getUserPref();
    try {
      await this.props.getCoffeeShop();
      try {
        await navigator.geolocation.getCurrentPosition(
          async position => {
            const obj = JSON.stringify(position);
            const location = JSON.parse(obj);
            let { data } = await axios.get(
              // `https://localroasters-api.herokuapp.com/roasters/?latitude=40.678833&longitude=-73.950676`
              `https://localroasters-api.herokuapp.com/roasters/?latitude=${location[`coords`][`latitude`]}&longitude=${location[`coords`][`longitude`]}`
            );
            this._isMounted = true;
            let filtered = data.filter(roast => roast.coffee.roast == this.props.userPref.coffee.roast || roast.price <= this.props.userPref.price)
            if (this._isMounted) {
              this.setState({
                coffeeShops: filtered,
                sustainableCoffeeShops: filtered.filter(coffeeShops => coffeeShops.sustainable === true)
              });
            }
          })
      } catch (err) {
      }
    } catch (err) {
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  goToProfile() {
    Actions.profile();
  }
  goToCoffeeMap() {
    Actions.coffeeMap();
  }
  async goToCoffeeShop(id) {
    try {
      let select = this.state.coffeeShops.filter(a => a._id == id);
      await this.props.storeCoffeeShop(select[0]);
      Actions.coffeeShop();
    } catch (err) {
    }
  }
  render() {
    function Item({ name, img, price, coffeeBeans, sustainable, location, roast }) {
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${location.latitude},${location.longitude}`;
      const label = 'Custom Label';
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      let beans = [];
      for (let i = 0; i < 5; i++) {
        let image = i < coffeeBeans ? require("./../images/coffee-grain-fill.png") : require("./../images/coffee-grain.png");
        beans.push(
          <Image
            key={i}
            source={image}
            style={{
              height: 23,
              width: 23,
              flexDirection: "row",
              marginLeft: 5
            }}
          />
        );
      }
      return (
        <Card style={styles.cardItems}>
          <CardItem>
            <Left>
              <Image source={{ uri: img }} style={styles.thumbNail} />
            </Left>
            <Right>
              <Text style={styles.name}>
                {name} {sustainable ? <Ionicons name="ios-leaf" style={{ fontSize: 20, color: 'green' }} /> : <></>}
              </Text>
              <Text style={styles.price}>${price} per cup</Text>
              <Text style={styles.roastName}> Roast: {roast}</Text>
              <Button transparent textStyle={{ color: "#87838B" }}>
                {beans}
              </Button>
              <Button style={styles.directionArrow} onPress={() => Linking.openURL(url)}>
                <Text style={{ marginRight: 'auto', marginLeft: 'auto' }}>Directions </Text>
                <Image source={require('./../images/map_arrow.png')} style={styles.mapArrow} />
              </Button>
            </Right>
          </CardItem>
        </Card>
      );
    }
    let i = 0;
    return (
      <Container>
        <Header style={{ backgroundColor: 'white', marginTop: '7%' }}>
          <Text style={styles.title}>Local Roasters Near You</Text>
          <Right>
            <TouchableOpacity onPress={() => this.setState({ sustainableFilter: !this.state.sustainableFilter })}>
              <Ionicons name="ios-leaf" style={this.state.sustainableFilter === false ? { fontSize: 30, paddingBottom: 25 } : { fontSize: 30, color: 'green', paddingBottom: 25 }} />
            </TouchableOpacity>
          </Right>
        </Header>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.sustainableFilter === false ? this.state.coffeeShops : this.state.sustainableCoffeeShops}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  this.goToCoffeeShop(item._id);
                }}
              >
                <Item
                  id={item._id}
                  key={i++}
                  name={item.name}
                  distance={1}
                  img={item.img}
                  price={item.price}
                  coffeeBeans={item.rating}
                  sustainable={item.sustainable}
                  location={item.location}
                  roast={item.coffee.roast}
                />
              </TouchableHighlight>
            )}
            keyExtractor={item => item._id}
          ></FlatList>
        </SafeAreaView>
        <TouchableOpacity style={styles.addButton} onPress={() => Actions.addCoffeeShop()}>
          <Text style={styles.plusText}>+ Roaster</Text>
        </TouchableOpacity>
        <Footer>
          <FooterTab>
            <Button style={styles.navButton}>
              <Icon size={24} color="white" name="home"></Icon>
            </Button>
            <Button
              style={styles.navButton}
              onPress={() => this.goToCoffeeMap()}
            >
              <Icon size={24} color="white" name="map-marker-radius"></Icon>
            </Button>
            <Button style={styles.navButton} onPress={() => this.goToProfile()}>
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
    coffeeShop: state.coffeeShops,
    userPref: state.userPref
  };
};

const mapDispatch = dispatch => {
  return {
    storeCoffeeShop: coffeeShop => dispatch(storeCoffeeShopThunk(coffeeShop)),
    getCoffeeShop: () => dispatch(getCoffeeShopThunk()),
    getUserPref: () => dispatch(getUserPrefThunk())
  };
};

export default connect(mapState, mapDispatch)(Home);

const styles = StyleSheet.create({
  midText: {
    marginTop: "10%",
    marginRight: "auto",
    marginLeft: "auto",
    color: "green"
  },
  mapButton: {
    backgroundColor: "#9A764E",
    borderRadius: 10,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 20
  },
  container: {
    flex: 1,
  },
  navButton: {
    backgroundColor: "#875D39",
    borderRadius: 0
  },
  navText: {
    color: "white"
  },
  addButton: {
    width: 90,
    height: 40,
    position: 'absolute',
    right: '5%',
    bottom: '10%',
    backgroundColor: '#875D39',
    borderRadius: 30,
  },
  plusText: {
    position: 'relative',
    color: 'white',
    fontSize: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: "auto",
    marginBottom: "auto",
    color: 'white'
  },
  price: {
    fontSize: 16,
    color: 'green'
  },
  roastName: {
    fontSize: 16,
    color: '#875D39'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  thumbNail: {
    width: '85%',
    height: 100,
    borderRadius: 15,
    padding: 0
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    color: "#875D39"
  },
  mapArrow: {
    height: 25,
    width: 25,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  directionArrow: {
    width: '90%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'brown'
  }
});
