import React, { Component } from "react";
import {Container,CardItem,Thumbnail,Footer,FooterTab,Button,Card,Body,Left} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {StyleSheet,View,ScrollView,SafeAreaView,Image,FlatList,Text} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { storeCoffeeShopThunk } from  '../store/utilities/coffeeShop';

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
    this.generateStars=this.generateStars.bind(this)
  }
  goToProfile() {
    Actions.profile();
  }
  goToCoffeeMap() {
    Actions.coffeeMap();
  }
  goToCoffeeShop() {
    Actions.coffeeShop();
  }
  generateBean(beans){
    let beanIcons=[]
    for(let i=0; i<coffeeBeans; i++){
      beanIcons.push((<Image source={require("./../images/CoffeeBean.png")} style={{ height: 30, width: 30, flexDirection: 'row'}}/>))
    }
    return beanIcons
  }
  generateStars = (rating)=>{
    let stars=[]
    for(let i=0; i<rating; i++){
      stars.push((<Image source={require("./../images/YelpStar.png")} style={{ height: 30, width: 30, flexDirection: 'row', marginLeft:5}}/>))
    }
    return stars
  }

  render() {
    function Item({title, distance, img, coffeeBeans, yelpRating}){
      let beans=[]
      for(let i=0; i<coffeeBeans; i++){
        beans.push((<Image source={require("./../images/CoffeeBean.png")} style={{ height: 30, width: 30, flexDirection: 'row', marginLeft:5}}/>))
      }
      return (
        <Card style={styles.cardItems}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: img }}/>
              <Body>
                <Text onPress={()=> Actions.coffeeShop()}>{title}</Text>
                <Text>{distance} miles away</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              {/* <Image
                source={{ uri: "" }}
                style={{ height: '30%', width: "90%", flex: 1 }}
                onPress={() => this.goToCoffeeShop()}
              />
              */}
              <Text>title</Text>
            </Body>
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
            renderItem={({ item }) => (
              <Item
                key={i++}
                title={item.title}
                distance={item.distance}
                img={item.img}
                rating={item.rating}
                yelpRating={item.yelpRating}
                coffeeBeans={item.coffeeBeans}
              />
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
		storeCoffeeShop: (coffeeShop) => dispatch(storeCoffeeShopThunk(coffeeShop))
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
