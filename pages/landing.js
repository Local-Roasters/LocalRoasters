import React from 'react'
import { StyleSheet,View, ScrollView, Text, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Landing extends React.Component {
    goToAbout = () => {
        Actions.landing()
     }
   
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
<TouchableOpacity style = {{ margin: 128 }} onPress = {this.goToAbout}>
         <Text>This is HOME!</Text>
      </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})
export default Landing