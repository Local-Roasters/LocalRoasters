import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {
   goToProfile(){
      Actions.profile()
   }
   goToCoffeeMap(){
      Actions.coffeeMap()
   }
    render() {
       return (
            <Container>
                  <View >
                     <Text style={styles.midText}>This is the Home Page!</Text>
                     <Button onPress={this.goToCoffeeMap}>
                        <Text>Go to map</Text>
                     </Button>
                  </View>
               <Content />
               <Footer>
                  <FooterTab>
                     <Button style={styles.navButton}>
                        <Icon size={24} color="white" name="home"></Icon>
                     </Button>
                     <Button style={styles.navButton} onPress={()=>this.gotToCoffeeMap()}>
                        <Icon size={24} color="white" name="map-marker-radius"></Icon>
                     </Button>
                     <Button style={styles.navButton} onPress={()=>this.goToProfile()}>
                     <Icon size={24} color="white" name="account-box"></Icon>
                     </Button>
                  </FooterTab>
               </Footer>
            </Container>
       );
    }
 }
 const styles = StyleSheet.create({
   midText:{
      marginTop: '50%',
      marginRight:"auto",
      marginLeft: "auto"
   },
   navButton:{
      backgroundColor: "#9A764E",
      borderRadius: 0
   },
   navText:{
      color:"white"
   }
 })
