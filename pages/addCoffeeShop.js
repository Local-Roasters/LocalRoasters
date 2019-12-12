import React from "react";
import {Content,CardItem,Card,Body,Left,Item} from "native-base";
import { StyleSheet, Text, View, TextInput,Button, Alert, Image, Picker } from "react-native";
import { connect } from "react-redux";
import axios from "axios"
// import Constants from 'expo-constants';

import {
  getCoffeeShopThunk,
  selectCoffeeShopThunk
} from "../store/utilities/coffeeShop";
import useForm from "react-hook-form"
import { Actions } from "react-native-router-flux";
// import { ALPN_ENABLED } from "constants";
export default () => {
  const { register, setValue, handleSubmit } = useForm();
  const onSubmit = data => {
    let roaster = {
      name: data.name,
      location : {
        streetName: data.address.split(" ").slice(1).join(" "),
        number:data.address.split(" ")[0], 
        zip:data.zipcode
      },
      coffee:{roast:"Medium",roaster:"Bulk/Unknown"},
      price:data.price,
      rating:3
     
    }
    // console.log(roaster)
    axios.post("https://localroasters-api.herokuapp.com/roasters", roaster)
    .then(res=> {
        Alert.alert(res.data.msg)
      // console.log(res)
    })
    .catch(err=>{
      Alert.alert(res.data.msg)
    console.log(err)}
    )
    Actions.pop();
  };
  
  React.useEffect(() => {
    register({name: 'name'}, { required: true });
    register({name: 'price'}, {required:true})
    register({name: 'rating'}, )
    register({name: 'address'}, {required:true})
    register({name: "zipcode"}, {required:true})
  }, [register])

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Add a New Roaster</Text>
      <Text style={styles.label}>Roaster Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('name', text, true)}
        placeholder={"eg: Jack's Coffee Co"}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('address', text)}
        placeholder={"eg: 123 Main St"}
      />
   <Text style={styles.label}>Price Per Cup</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('price', text)}
        placeholder={"Price for sm coffee. eg 3 or 2.5"}
      />
      
      <Text style={styles.label}>Zipcode</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('zipcode', text)}
        placeholder = {"eg 11216"}
        
      />
      

      <View style={styles.button}>
        <Button style={styles.buttonInner} color title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: "10%"
  },
  button :{
    marginTop: 40,
    color: 'white',
    height: 40,
    width:"60%",
    marginLeft:"auto",
    marginRight:"auto", 
    backgroundColor: '#875D39',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 1,
    padding: 8,
    backgroundColor: "#fff"
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    width:"80%",
    marginLeft:"auto",
    marginRight:'auto',
    padding: 10,
    borderWidth:.5,
    borderColor:"black",
    borderRadius: 4,
  },
  title:{	
    fontSize: 25,	
    fontWeight: 'bold',	
    alignSelf: 'center',	
    marginLeft:'auto',
    marginRight:'auto',
    color:"#875D39"
  }
});

