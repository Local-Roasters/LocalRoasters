import React from 'react';import { Container, Header, Content, Footer, FooterTab, Button, Icon, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected2: undefined,
          seg1: 2,
          seg2: 1,
          seg3: 1,
          money1:2,
          money2:1,
          money3:1,
          coffee: "",
          price: ""
        };
      }
      onValueChange2(value) {
        this.setState({
          selected2: value
        });
      }
    goToAbout = () => {
        Actions.home()
    }
    onChangeCoffee1(){
        if(this.state.seg1==2){
            this.setState({ seg1: 1,seg2: 1, seg3:1})
        }
        else{
            this.setState({ seg1: 2,seg2: 1, seg3: 1})
        }
        this.setState({coffee: "Light"})
    }
    onChangeCoffee2(){
        if(this.state.seg2==2){
            this.setState({ seg1: 1,seg2: 1, seg3:1})
        }
        else{
            this.setState({ seg1: 1,seg2: 2, seg3: 1})
        }
        this.setState({coffee: "Medium"})
    }
    onChangeCoffee3(){
        if(this.state.seg3==2){
            this.setState({ seg1: 1,seg2: 1, seg3:1})
        }
        else{
            this.setState({ seg1: 1,seg2: 1, seg3: 2})
        }
        this.setState({coffee: "Dark"})
    }
    onChangeMoney1(){
        if(this.state.money1==2){
            this.setState({ money1: 1,money2: 1, money3:1})
        }
        else{
            this.setState({ money1: 2,money2: 1, money3: 1})
        }
        this.setState({Price: "$"})
    }
    onChangeMoney2(){
        if(this.state.money2==2){
            this.setState({ money1: 1,money2: 1, money3:1})
        }
        else{
            this.setState({ money1: 1,money2: 2, money3: 1})
        }
        this.setState({Price: "$$"})
    }
    onChangeMoney3(){
        if(this.state.money3==2){
            this.setState({ money1: 1,money2: 1, money3:1})
        }
        else{
            this.setState({ money1: 1,money2: 1, money3: 2})
        }
        this.setState({Price: "$$$"})
    }
    
    onSubmit(){
        let preferences= {
            coffeeType:this.state.coffee,
            price:this.state.price
        }
        console.log(preferences)
    }
    goToHome(){
        Actions.home()
     }
    render() {
       return (
        <Container>
            <View >
                    <Item style={{borderBottomWidth: 0}}>
                        <Image
                            source={require("../images/profile.png")}
                            style={styles.profileImage}
                        />
                    </Item>
                    <Item style={{borderBottomWidth: 0}}>
                        <Text style={styles.idText}>ID: 0571095730</Text>
                    </Item>
            </View>
            <Content style={styles.content}>
              <Text style={styles.title}>Your Roast</Text>
                <Card >
                    <CardItem style={styles.dollar, {
									backgroundColor: this.state.seg1 === 1 ? "white" :this.state.seg1 === 2 ? "#D0B99B" : undefined,
									borderColor: "red"
								}} header button onPress={() => this.onChangeCoffee1()}>
                        <Text>Light</Text>
                    </CardItem>
                    <CardItem style={styles.dollar, {
									backgroundColor: this.state.seg2 === 1 ? "white" :this.state.seg2 === 2 ? "#D0B99B" : undefined,
									borderColor: "red"
								}} button onPress={() => this.onChangeCoffee2()}>
                        <Text>Medium</Text>
                    </CardItem>
                    <CardItem  style={styles.dollar, {
									backgroundColor: this.state.seg3 === 1 ? "white" :this.state.seg3 === 2 ? "#D0B99B" : undefined,
									borderColor: "red"
								}} footer button onPress={() => this.onChangeCoffee3()}>
                        <Text>Dark</Text>
                    </CardItem>
                </Card>
                <Text></Text>
                <View style={styles.inline}>                
                    <Button style={styles.dollar, {
                                    backgroundColor: this.state.money1 === 1 ? "white" :this.state.money1 === 2 ? "#D0B99B" : undefined,
                                    width:"33%", justifyContent: 'center'
								}} squared light onPress={() => this.onChangeMoney1()}>
                        <Text >$</Text>
                    </Button>
                    <Button style={styles.dollar,{
                                    backgroundColor: this.state.money2 === 1 ? "white" :this.state.money2 === 2 ? "#D0B99B" : undefined,
                                    width:"33%", justifyContent: 'center'
								}}  squared light onPress={() => this.onChangeMoney2()}>
                        <Text>$$</Text>
                    </Button>
                    <Button style={styles.dollar, {
                                    backgroundColor: this.state.money3 === 1 ? "white" :this.state.money3 === 2 ? "#D0B99B" : undefined,
                                    width:"33%",justifyContent: 'center'
								}}  squared light onPress={() => this.onChangeMoney3()}>
                        <Text>$$$</Text>
                    </Button>
                </View>
                <Button style={styles.signUpButton} onPress={()=> this.onSubmit()}>
                    <Text style={styles.buttonText}>Update</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                <Button style={styles.navButton} onPress={()=>this.goToHome()}>
                <Text style={styles.navText}>Home</Text>
                </Button>
                <Button style={styles.navButton}>
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
    },
    profileImage:{
        width: 150,
        height: 150, 
        borderRadius: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: '20%'
    },
    idText:{
        marginLeft: "auto",
        marginRight: "auto"
    },
    title:{
        marginTop: 10,
        fontSize: 25,
        padding: 25,
        marginLeft: "auto",
        marginRight: "auto"
    },
    dollar:{
        width:"33%",
        flex: 1,
        justifyContent: 'center'
    },
    inline:{
        flexDirection: 'row'
    },
    signUpButton:{
        padding: 10,
        width: '50%',
        marginTop: 50,
        backgroundColor: '#6f4e37',
        alignSelf: 'center',
        borderRadius: 20
    },
    buttonText:{
        marginRight:'auto',
        marginLeft:'auto',
        color: 'white'
    },
  })
