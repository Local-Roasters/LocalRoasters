import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/landing'

const Routes = (props) => (
    <Router cardStyle={{ backgroundColor: 'white' }}>
        <ScrollView>
            <Scene type="reset" key="landing" component={Landing} title="Home" initial={true} />
        </ScrollView>
    </Router>
)
export default Routes