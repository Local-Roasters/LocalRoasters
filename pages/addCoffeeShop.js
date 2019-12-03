import React from "react";
import {Content,CardItem,Card,Body,Left,Item} from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import {
  getCoffeeShopThunk,
  selectCoffeeShopThunk
} from "../store/utilities/coffeeShop";

class addCoffeeShop extends React.Component {

  render() {

    return (
      <Content style={styles.content}>
          <Text style={styles.text}>This is where you can add your coffee shop</Text>
      </Content>
    );
  }
}


export default connect()(addCoffeeShop);

const styles = StyleSheet.create({
    text:{
        marginTop: 50
    }

});
