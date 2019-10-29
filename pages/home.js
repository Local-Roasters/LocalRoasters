import React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component {
   goToProfile(){
      Actions.profile()
   }
    render() {
       return (
            <Container>
                  <View >
                     <Text style={styles.midText}>This is the Home Page!</Text>
                  </View>
               <Content />
               <Footer>
                  <FooterTab>
                     <Button style={styles.navButton}>
                     <Text style={styles.navText}>Home</Text>
                     </Button>
                     <Button style={styles.navButton} onPress={()=>this.goToProfile()}>
                     <Text style={styles.navText}>Profile</Text>
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
   },
   navText:{
      color:"white"
   }
 })
