import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/landing'
import Home from '../pages/home'
import Profile from '../pages/profile'
import CoffeeMap from '../pages/coffeeMap'


const Routes = (props) => (
    <Router cardStyle={{ backgroundColor: 'white' }}>
        <ScrollView>
            <Scene key="landing" hideNavBar={1} component={Landing}  initial={true}/>
            <Scene type="reset" key="home" component={Home} hideNavBar={1}/>
            <Scene type="reset" key="profile" key="profile" hideNavBar={1}  component={Profile} />
            <Scene key="coffeeMap" component={CoffeeMap} title="Coffee Map"/>
        </ScrollView>
    </Router>
)
export default Routes