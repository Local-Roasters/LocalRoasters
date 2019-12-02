import React, { Component } from "react";
import {Container,CardItem,Thumbnail,Footer,FooterTab,Button,Card,Body,Left} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {StyleSheet,View,ScrollView,SafeAreaView,Image,FlatList,Text, TouchableHighlight} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { storeCoffeeShopThunk, getCoffeeShopThunk } from  '../store/utilities/coffeeShop';

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
      cards: [
        {
          id: "1",
          title: "Cafe Bene",
          distance: "0.1",
          img: "https://i.imgur.com/CXgFFLK.png",
          coffeeBeans: 3,
          yelpRating:4
        },
        {
          id: "2",
          title: "Starby's",
          distance: "0.1",
          img: "https://i.imgur.com/CXgFFLK.png",
          coffeeBeans: 2,
          yelpRating:5
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Local Deli",
          distance: "0.3",
          img: "https://i.imgur.com/fc08sWU.png",
          coffeeBeans: 3,
          yelpRating:4
        }
      ]
    };
    this.goToCoffeeShop = this.goToCoffeeShop.bind(this)
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
  goToProfile() {
    Actions.profile();
  }
  goToCoffeeMap() {
    Actions.coffeeMap();
  }
  async goToCoffeeShop(id) {
    try{ 
      let select= this.state.cards.filter(shop=>shop.id==id)
      await this.props.storeCoffeeShop(select[0]);
      console.log(this.props.coffeeShop);
      Actions.coffeeShop();
    }
    catch(err){
			console.log(err)
    }
  }
  render() {
    function Item({id, title, distance, img, coffeeBeans, yelpRating}){
      let beans=[]
      for(let i=0; i<coffeeBeans; i++){
        beans.push((<Image key={i} source={require("./../images/CoffeeBean.png")} style={{ height: 30, width: 30, flexDirection: 'row', marginLeft:5}}/>))
      }
      return (
        <Card style={styles.cardItems}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: img }}/>
              <Body>
                <Text>{title}</Text>
                <Text>{distance} miles away</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            {/* <Body>
              <Text>{title}</Text>
            </Body> */}
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
            data={this.state.cards}
            renderItem={({ item ,i}) => (
              <TouchableHighlight onPress={()=> this.goToCoffeeShop(item.id)}>
              <Item 
                id={item.id}
                key={i}
                title={item.title}
                distance={item.distance}
                img={item.img}
                rating={item.rating}
                yelpRating={item.yelpRating}
                coffeeBeans={item.coffeeBeans}
              /></TouchableHighlight>
            )}
            keyExtractor={item => item.id}
          ></FlatList>
        </SafeAreaView>
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

const mapState = (state) => {
	return {
    coffeeShop: state.coffeeShop
	}
}

const mapDispatch = (dispatch) => {
	return {
    storeCoffeeShop: (coffeeShop) => dispatch(storeCoffeeShopThunk(coffeeShop)),
    getCoffeeShop: () => dispatch(getCoffeeShopThunk())
	}
}

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
    flex: 1
  },
  navButton: {
    backgroundColor: "#9A764E",
    borderRadius: 0
  },
  navText: {
    color: "white"
  },
  cardItems:{

  }
});
