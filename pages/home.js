import React, { Component } from "react";
import {
  Container,
  CardItem,
  Thumbnail,
  Footer,
  FooterTab,
  Button,
  Card,
  Body,
  Left
} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  Text,
  TouchableHighlight
} from "react-native";

import axios from "axios";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  storeCoffeeShopThunk,
  getCoffeeShopThunk
} from "../store/utilities/coffeeShop";
import Constants from 'expo-constants';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  }
];
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeShops: [
        {
          __v: 0,
          _id: "5ddd2399f6c79b1b50ec9732",
          coffee: {
            roast: "Medium",
            roaster: "Bulk Supply/Unknown"
          },
          img: "https://imgur.com/3f1557d5-16fa-4848-a4c7-56a6759765d6",
          location: {
            latitude: 40.6716541,
            longitude: -73.9529795,
            number: 167,
            streetName: "rogers ave",
            zip: 11216
          },
          name: "Manhattanvile",
          price: 5,
          rating: 2
        }
      ],
      userData: {}
    };
    this.goToCoffeeShop = this.goToCoffeeShop.bind(this);
  }
  async componentDidMount() {
    let deviceId = Constants.installationId;
    try {
      let user = await axios.get(`https://localroasters-api.herokuapp.com/users/?phoneID=${deviceId}`);
      await console.log(user.data)
      this._isMounted = true;
      if (this._isMounted) {
        this.setState({
          userData: data
        });
      }
      await this.props.getCoffeeShop();
      let { data } = await axios.get(
        `https://localroasters-api.herokuapp.com/roasters/?latitude=40.678833&longitude=-73.950676`
      );
      data = data.filter(coffeeShop=>{
        return coffeeShop.price == user.data.price 
      })
      console.log(data)
      this._isMounted = true;
      if (this._isMounted) {
        this.setState({
          coffeeShops: data
        });
      }
    } catch (err) {
      console.log(err);
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
      // console.log("JERE");
      // console.log(this.state.coffeeShops);
      // console.log("RESU:T");
      // console.log(select[0]);
      await this.props.storeCoffeeShop(select[0]);
      Actions.coffeeShop();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    function Item({ name, img, price, coffeeBeans }) {
      let beans = [];
      // console.log(coffeeBeans);
      for (let i = 0; i < coffeeBeans; i++) {
        beans.push(
          <Image
            key={i}
            source={require("./../images/coffee-grain-fill.png")}
            style={{
              height: 30,
              width: 30,
              flexDirection: "row",
              marginLeft: 5
            }}
          />
        );
      }
      // console.log("beans" + beans);
      return (
        <Card style={styles.cardItems}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: img }} />
              <Body>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>Price : {price}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                {beans}
              </Button>
            </Left>
          </CardItem>
        </Card>
      );
    }
    let i = 0;
    return (
      <Container>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.coffeeShops}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  // console.log("ITEMS" + item);
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
                />
              </TouchableHighlight>
            )}
            keyExtractor={item => item._id}
          ></FlatList>
        </SafeAreaView>
        <TouchableOpacity style={styles.addButton} onPress={()=>Actions.addCoffeeShop()}>
            <Text style={styles.plusText}>+</Text>
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
    coffeeShop: state.coffeeShops
  };
};

const mapDispatch = dispatch => {
  return {
    storeCoffeeShop: coffeeShop => dispatch(storeCoffeeShopThunk(coffeeShop)),
    getCoffeeShop: () => dispatch(getCoffeeShopThunk())
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
    marginTop: "10%"
  },
  navButton: {
    backgroundColor: "#9A764E",
    borderRadius: 0
  },
  navText: {
    color: "white"
  },
  addButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: '5%',
    bottom: '10%',
    backgroundColor: '#955E16',
    borderRadius: 30,
  },
  plusText:{
    position: 'relative',
    color:'white', 
    fontSize: 40, 
    marginRight: 'auto', 
    marginLeft: 'auto', 
    marginTop:"auto",
    marginBottom:"auto",
    color: 'white'
  },
  price:{
    fontSize: 18
  },
  name:{
    fontSize: 20,
    fontWeight: 'bold'
  }
});
