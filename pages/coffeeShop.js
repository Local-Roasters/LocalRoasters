import React from "react";
import {
  Container,
  Content,
  CardItem,
  Thumbnail,
  Footer,
  FooterTab,
  Button,
  Card,
  Body,
  Left,
  Item
} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  getCoffeeShopThunk,
  selectCoffeeShopThunk
} from "../store/utilities/coffeeShop";

class CoffeeShop extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectCoffeeShop: {}
    };
  }

  async componentDidMount() {
    // this._isMounted = true;
    try {
      //Just updates the state
      await this.props.getCoffeeShop();
      console.log("in shop");
      console.log(this.props.coffeeShop);
      //   if (this._isMounted) {
      this.setState({
        selectCoffeeShop: this.props.coffeeShop
      });
      //   }
      //   console.log(this.state);
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    let beanIcons = [];
    for (let i = 0; i < this.state.selectCoffeeShop.rating; i++) {
      beanIcons.push(
        <Image
          source={require("./../images/coffee-grain-fill.png")}
          style={{ height: 30, width: 30, flexDirection: "row" }}
          key={i}
        />
      );
    }
    let imgUrl = "" + this.state.selectCoffeeShop.img;
    console.log(imgUrl);
    return (
      <Content style={styles.content}>
        <Image source={{ uri: imgUrl }} style={styles.background} />
        <Item style={{ borderBottomWidth: 0 }}>
          <Text style={styles.Text1}>{this.state.selectCoffeeShop.name}</Text>
        </Item>
        <Item style={{ borderBottomWidth: 0, marginBottom: 10 }}>
          <Text style={styles.Text2}>
            ${this.state.selectCoffeeShop.price} per cup
          </Text>
        </Item>
        <Item
          style={{
            borderBottomWidth: 0,
            marginBottom: 20,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {beanIcons}
        </Item>
        <Card style={styles.cardStyle}>
          <CardItem>
            <Body>
              <Text>Price Per Cup</Text>
              <Text>Description</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const mapState = state => {
  return {
    coffeeShop: state.coffeeShop,
    id: state.id
  };
};

const mapDispatch = dispatch => {
  return {
    getCoffeeShop: () => dispatch(getCoffeeShopThunk())
  };
};

export default connect(mapState, mapDispatch)(CoffeeShop);

const styles = StyleSheet.create({
  background: {
    height: 200,
    width: "100%"
  },
  midText: {
    marginTop: "50%",
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
  coffeeShopImage: {
    width: "80%",
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 30
  },
  Text1: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 30,
    marginTop: 10
  },
  Text2: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20
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
    justifyContent: "center"
  },
  inline: {
    flexDirection: "row"
  },
  signUpButton: {
    padding: 10,
    width: "50%",
    marginTop: 50,
    backgroundColor: "#6f4e37",
    alignSelf: "center",
    borderRadius: 20
  },
  buttonText: {
    marginRight: "auto",
    marginLeft: "auto",
    color: "white"
  },
  starsStyle: {
    padding: 10
  },
  cardStyle: {
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto"
  }
});
