import React from 'react'
import { StyleSheet,View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Form, Item, Picker, Card, CardItem, Body, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AuthSession } from 'expo';

const width = '33%';
class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selected2: undefined,
          seg1: 1,
          seg2: 1,
          seg3: 1,
          money1:1,
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
       gotToCoffeeMap(){
      Actions.coffeeMap()
    }
    goToHome(){
        Actions.home()
    }
    onSubmit(){
        let preferences= {
            coffeeType:this.state.coffee,
            price:this.state.price
        }
        console.log(preferences)
        Actions.home()
    }
    render() {
        return (
        <Container style={styles.container}>
                {/* <View >
                    <Text style={styles.title}>Customize Your Roast</Text>
                    <Image source={require("../images/Local_Roast_Logo.png")} style={styles.logo}/>  
                </View> */}
            <Content style={styles.content}>
                <Text style={styles.title}>Customize Your Roast</Text>
                <Image source={require("../images/Local_Roast_Logo.png")} style={styles.logo}/> 
                <Card>
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
                <View style={styles.inline}>                
                    <Button style={styles.dollar, {
                                    backgroundColor: this.state.money1 === 1 ? "white" :this.state.money1 === 2 ? "#D0B99B" : undefined,
                                    width, justifyContent: 'center'
								}} squared light onPress={() => this.onChangeMoney1()}>
                        <Text >$</Text>
                    </Button>
                    <Button style={styles.dollar,{
                                    backgroundColor: this.state.money2 === 1 ? "white" :this.state.money2 === 2 ? "#D0B99B" : undefined,
                                    width, justifyContent: 'center'
								}}  squared light onPress={() => this.onChangeMoney2()}>
                        <Text>$$</Text>
                    </Button>
                    <Button style={styles.dollar, {
                                    backgroundColor: this.state.money3 === 1 ? "white" :this.state.money3 === 2 ? "#D0B99B" : undefined,
                                    width,justifyContent: 'center'
								}}  squared light onPress={() => this.onChangeMoney3()}>
                        <Text>$$$</Text>
                    </Button>
                </View>
                <Button style={styles.signUpButton} onPress={()=> this.onSubmit()}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Button>
            </Content>
          </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#ECCFAA",
        width: "100%"
    },
    content:{
        width: '80%',
        marginRight:'auto',
        marginLeft:'auto'
    },
    header:{
        backgroundColor: "brown",
        width: "100%",
    },
    logo:{
        marginTop: 20,
        width: 200,
        height: 200,
        marginRight:'auto',
        marginLeft:'auto',
    },
    title:{
        fontSize: 25,
        padding: 25,
        marginTop:"10%",
        color:'#B98B50',
        marginRight:'auto',
        marginLeft:'auto'
    },
    dollar:{
        width,
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
    }
})
export default Landing