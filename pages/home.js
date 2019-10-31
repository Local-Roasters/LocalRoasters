import React, { Component } from "react";
import {
  Container,
  Header,
  CardItem,
  Thumbnail,
  Content,
  Footer,
  Text,
  FooterTab,
  Button,
  Form,
  Item,
  Picker,
  Card,
  Body,
  Right,
  Left
} from "native-base";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Actions } from "react-native-router-flux";

export default class Home extends React.Component {
  goToProfile() {
    Actions.profile();
  }
  goToCoffeeMap() {
    Actions.coffeeMap();
  }
  render() {
    return (
      <Container>
        <ScrollView>
          <Container>
            <Header />
            <Content>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={{
                        uri:
                          "https://assets.bonappetit.com/photos/5c366551f212512d0e6cefd0/16:9/w_2560%2Cc_limit/Basically-Coffee-0219-03.jpg"
                      }}
                    />
                    <Body>
                      <Text>First Coffee Shop</Text>
                      <Text note>Much Wow</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri:
                        "https://assets.bonappetit.com/photos/5c3665nati512d0e6cefd0/16:9/w_2560%2Cc_limit/Basically-Coffee-0219-03.jpg"
                    }}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="coffee" />
                      <Text>4 Beans</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="fire" />
                      <Text>Roast</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Icon active name="currency-usd" />
                      <Icon active name="currency-usd" />
                      <Text>Price</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </Content>
          </Container>
          <Button style={styles.mapButton} onPress={this.goToCoffeeMap}>
            <Text style={styles.mapButton}>View map</Text>
          </Button>
        </ScrollView>

        <Content />
        <Footer>
          <FooterTab>
            <Button style={styles.navButton}>
              <Icon size={24} color="white" name="home"></Icon>
            </Button>
            <Button
              style={styles.navButton}
              onPress={() => this.gotToCoffeeMap()}
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
  navButton: {
    backgroundColor: "#9A764E",
    borderRadius: 0
  },
  navText: {
    color: "white"
  }
});
