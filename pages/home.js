import React from "react";
import {Container,CardItem,Thumbnail,Footer,FooterTab,Button,Card,Body,Left, Right} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, Text, TouchableHighlight, View } from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import {storeCoffeeShopThunk,getCoffeeShopThunk} from "../store/utilities/coffeeShop";
import Constants from 'expo-constants';
// import { start } from "repl";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffeeShops: [],
      userData: {}
      sustainableCoffeeShops: [],
      sustainableFilter: false,
    };
    this.goToCoffeeShop = this.goToCoffeeShop.bind(this);
  }
  async componentDidMount() {
    let deviceId = Constants.installationId;
    try {
      let user = await axios.get(`https://localroasters-api.herokuapp.com/users/?phoneID=${deviceId}`);
      this._isMounted = true;
      if (this._isMounted) {
        this.setState({
          userData: data
        });
      }
      await this.props.getCoffeeShop();
      try {
        await navigator.geolocation.getCurrentPosition(
          async position => {
            const obj = JSON.stringify(position);
            const location = JSON.parse(obj);          
              let { data } = await axios.get(
                `https://localroasters-api.herokuapp.com/roasters/?latitude=${location[`coords`][`latitude`]}&longitude=${location[`coords`][`longitude`]}`
              );
              await console.log(data);
                  let startPrice=0;
              let endPrice=0;
              if(user.data.price<=2){
                endPrice=2
              }
              else if(user.data.price<=4){
                endPrice=4
                startPrice=2
              }
              else{
                startPrice=6
                endPrice=100
              }
              data = data.filter(coffeeShop=>{
                return coffeeShop.price <= endPrice && coffeeShop.price >= startPrice
              })
              this._isMounted = true;
              if (this._isMounted) {
              this.setState({
                coffeeShops: data,
                sustainableCoffeeShops: data.filter(coffeeShops => coffeeShops.sustainable === true)
              });
              }
            })
  
              }catch(err){
                console.log(err)
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
    function Item({ name, img, price, coffeeBeans, sustainable }) {
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
        else{
          beans.push(<Image
            key={i}
            source={require("./../images/coffee-grain.png")}
            style={{
              height: 30,
              width: 30,
              flexDirection: "row",
              marginLeft: 5
            }}
          />)
        }
      }
      return (
        <Card style={styles.cardItems}>
          <CardItem>
            <Left>
              <Image source={{ uri: img }} style={styles.thumbNail}/>
//               <Thumbnail source={{ uri: img }} />
//               <Body>
//                 <Text>{name}</Text>
//                 <Text>Price: ${price}</Text>
//               </Body>
            </Left>
            <Right>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <Right>
              <Button transparent textStyle={{ color: "#87838B" }}>
                {beans}
              </Button>
              {sustainable ? <Ionicons name="ios-leaf" style={{ fontSize: 35, color: 'green' }} />: <View></View>}
            </Right>

          </CardItem>
        </Card>
      );
    }
    let i = 0;
    return (

      <Container>
//       <Text style={styles.title}>Roasters Near You</Text>
        <Header style={{ backgroundColor: 'white' }}>
          <Right>
            <TouchableOpacity onPress={() => this.setState({sustainableFilter: !this.state.sustainableFilter})}>
              <Ionicons name="ios-leaf" style={this.state.sustainableFilter === false ? { fontSize: 35 } :  { fontSize: 35, color: 'green' }}/> 
            </TouchableOpacity>
          </Right>
        </Header>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.sustainableFilter === false? this.state.coffeeShops : this.state.sustainableCoffeeShops}
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
                />
              </TouchableHighlight>
            )}
            keyExtractor={item => item._id}
          ></FlatList>
        </SafeAreaView>
        <TouchableOpacity style={styles.addButton} onPress={()=>Actions.addCoffeeShop()}>
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
  top:{
    marginTop: 40
  },
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
    backgroundColor: "#9A764E",
    borderRadius: 0
  },
  navText: {
    color: "white"
  },
  addButton: {
    width: 120,
    height: 50,
    position: 'absolute',
    right: '5%',
    bottom: '10%',
    backgroundColor: '#955E16',
    borderRadius: 30,
  },
  plusText: {
    position: 'relative',
    color:'white', 
    fontSize: 20, 
    marginRight: 'auto', 
    marginLeft: 'auto', 
    marginTop:"auto",
    marginBottom:"auto",
    color: 'white'
  },
  price:{
    fontSize: 16,
    color: 'green'
  },
  name:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  thumbNail:{
    width: '85%',
    height: 100,
    borderRadius:15,
    padding: 0
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 10
  }
});
