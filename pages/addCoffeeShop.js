import React from "react";
import {Content,CardItem,Card,Body,Left,Item} from "native-base";
import { StyleSheet, Text, View, TextInput,Button, Alert, Image, Picker } from "react-native";
import { connect } from "react-redux";
import axios from "axios"
import Constants from 'expo-constants';

import {
  getCoffeeShopThunk,
  selectCoffeeShopThunk
} from "../store/utilities/coffeeShop";
import useForm from "react-hook-form"
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
      price:data.price,
      rating:3,
      coffee:{roast:"med",}
    }
    console.log(roaster)
    axios.post("https://localroasters-api.herokuapp.com/roasters", roaster).then(res=> console.log(res))
  };
  
  React.useEffect(() => {
    register({ name: 'name'}, { required: true });
    register({name: 'price'}, {required:true})
    register({name: 'rating'}, )
    register({name: 'address'}, {required:true})
    register({name: "zipcode"}, {required:true})
  }, [register])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Roaster Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('name', text, true)}
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('address', text)}
        placeholder={"ex: 123 Main St"}
      />
   <Text style={styles.label}>Price Per Cup</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('price', text)}
        placeholder={"Price for sm coffee. ie 3 or 2.5"}
      />
      <Text style={styles.label}>Zipcode</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('zipcode', text)}
      />
      

      <View style={styles.button}>
        <Button style={styles.buttonInner} color title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0
  },
  button :{
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#9A764E',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 1,
    padding: 8,
    backgroundColor: "#036635"
  },
  input: {
    backgroundColor: 'white',

    height: 40,
    padding: 10,
    borderRadius: 4,
  }
});

