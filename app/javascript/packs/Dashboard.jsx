import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'


import Lifetime from './Lifetime'
import Badges from './Badges'
import TimeBarChart from './TimeBarChart'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: {user: {age: 22, displayName: "Spencer R."}},
            loggedIn: false,
            lifetimeStats: {
                best: {
                    total: { 
                        distance: {date: "2019-01-21", value: 1.93121},
                        steps: {date: "2019-01-21", value: 1565}}
                }, 
                lifetime:{
                    total: {activeScore: -1, caloriesOut: -1, distance: 1.93, steps: 1565},
                    tracker: {activeScore: -1, caloriesOut: -1, distance: 0, steps: 0}
                }},
            badges: {badges: [{shortName: "Boat Shoe", image100px: "https://static0.fitbit.com/images/badges_new/100px/badge_daily_steps5k.png/", description: "5,000 steps in a day"}]},
            steps: {},
            distance: {}
        }
    }

    fetchFitbitData (url, fitbitToken, stateKey) {
        axios({
            method: 'get',
            url: url,
            headers: { 'Authorization': 'Bearer ' + fitbitToken},
            mode: 'cors'
        })
        .then(response => {
            console.log(response)
            this.setState({[stateKey]: response.data})
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        if(window.location.hash){
            let fitbitToken = window.location.hash.slice(1).split("&")[0].replace("access_token=", "")
            this.setState({loggedIn: true})
            this.fetchFitbitData('https://api.fitbit.com/1/user/-/profile.json', fitbitToken, 'user')
            this.fetchFitbitData('https://api.fitbit.com/1/user/-/activities.json', fitbitToken, 'lifetimeStats')
            this.fetchFitbitData('https://api.fitbit.com/1/user/-/badges.json', fitbitToken, 'badges')
            this.fetchFitbitData('https://api.fitbit.com/1/user/-/activities/steps/date/today/1m.json', fitbitToken, 'steps')
            this.fetchFitbitData('https://api.fitbit.com/1/user/-/activities/distance/date/2014-04-30/1m.json', fitbitToken, 'distance')

        }
    }

    render(){
        return (
            <div className='container'>
                <header className='text-center'>
                    <h1 className='page-header'>React-Rails Fitness</h1>
                    <p className='lead'>Your personal fitness dashboard</p>
                    <span >{this.state.user.user.displayName}</span>
                </header> 
                {!this.state.loggedIn &&
                <div className='text-center'>
                    <a href='https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22D9TS&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800'> Login with Fitbit</a>
                </div>
                }
                <div className='row'>
                    <div className='col-lg-3'>
                        {this.state.lifetimeStats.lifetime && <Lifetime lifetimeStats={this.state.lifetimeStats} />}
                        <Badges badges={this.state.badges.badges}/>

                    </div>

                    <div className='col-lg-6'>
						<TimeBarChart data={this.state.steps["activities-steps"]} title="Steps" yMax={8000} />
						<TimeBarChart data={this.state.distance["activities-distance"]} title="Distance (miles)" yMax={6} />
                    </div>

                   
                </div>

            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Dashboard />,
        document.body.appendChild(document.createElement('div'))
    )
})
