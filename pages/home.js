import React from "react";
import {Container,CardItem,Thumbnail,Footer,FooterTab,Button,Card,Body,Left} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {StyleSheet,TouchableOpacity,SafeAreaView,Image,FlatList,Text,TouchableHighlight} from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {storeCoffeeShopThunk,getCoffeeShopThunk} from "../store/utilities/coffeeShop";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeShops: [
      ]
    };
    this.goToCoffeeShop = this.goToCoffeeShop.bind(this);
  }
  async componentDidMount() {
    try {
      await this.props.getCoffeeShop();
      let { data } = await axios.get(
        `https://localroasters-api.herokuapp.com/roasters/?latitude=40.678833&longitude=-73.950676`
      );
      await console.log(data);
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
  
      await this.props.storeCoffeeShop(select[0]);
      Actions.coffeeShop();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    function Item({ name, img, price, coffeeBeans }) {
      let beans = [];
      for (let i = 0; i < 5; i++) {
        let image = i < coffeeBeans ? require("./../images/coffee-grain-fill.png") : require("./../images/coffee-grain.png");
        beans.push(
          <Image
            key={i}
            source={image}
            style={{
              height: 30,
              width: 30,
              flexDirection: "row",
              marginLeft: 5
            }}
          />
        );
      }
      console.log("beans" + beans);
      return (
        <Card style={styles.cardItems}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: img }} />
              <Body>
                <Text>{name}</Text>
                <Text>Price : {price}</Text>
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
                  console.log("ITEMS" + item);
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
  }
});
