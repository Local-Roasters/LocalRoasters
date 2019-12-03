import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { View} from 'react-native'
import Landing from '../pages/landing'
import Home from '../pages/home'
import Profile from '../pages/profile'
import CoffeeMap from '../pages/coffeeMap'
import CoffeeShop from "../pages/coffeeShop"
import addCoffeeShop from "../pages/addCoffeeShop"


const Routes = (props) => (
    <Router cardStyle={{ backgroundColor: 'white' }}>
        <View>
            <Scene key="landing" hideNavBar={1} component={Landing} />
            <Scene type="reset" key="home" component={Home} hideNavBar={1} initial={true}/>
            <Scene type="reset" key="profile" hideNavBar={1}  component={Profile} />
            <Scene type="reset" key="coffeeMap" hideNavBar={1} component={CoffeeMap} title="Coffee Map" />
            <Scene key="addCoffeeShop" component={addCoffeeShop} />
            <Scene key="coffeeShop" component={CoffeeShop}/>
        </View>
    </Router>
)
export default Routes