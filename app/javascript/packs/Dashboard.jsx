import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

import Lifetime from './Lifetime'
import Badges from './Badges'

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
            badges: {badges: [{shortName: "Boat Shoe", image100px: "https://static0.fitbit.com/images/badges_new/100px/badge_daily_steps5k.png/", description: "5,000 steps in a day"}]}
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
            let fitbitToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkQ5VFMiLCJzdWIiOiI3OFRISEoiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNTQ4NzAzMDk2LCJpYXQiOjE1NDgwOTg0NTN9.szMvnNqyaeg703Cyljz-lbJXBrWcM_P2qNeoSx5XQPw"
            this.setState({loggedIn: true})
            // this.fetchFitbitData('https://api.fitbit.com/1/user/-/profile.json', fitbitToken, 'user')
            // this.fetchFitbitData('https://api.fitbit.com/1/user/-/activities.json', fitbitToken, 'lifetimeStats')
            // this.fetchFitbitData('https://api.fitbit.com/1/user/-/badges.json', fitbitToken, 'badges')

        }
    }

    render(){
        return (
            <div className='container'>
                <header className='text-center'>
                    <span className='float-right'>{this.state.user.user.displayName}</span>
                    <h1 className='page-header'>React-Rails Fitness</h1>
                    <p className='lead'>Your personal fitness dashboard</p>
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
                        <div className='card card-body'>
                            <h6 className='card-title'>Steps</h6>
                                <div className='card-text'></div>
                        </div>

                        <div className='card card-body'>
                            <h6 className='card-title'>Distance(miles)</h6>
                                <div className='card-text'></div>
                        </div>
                    </div>

                    <div className='col-lg-2 col-lg-offset-1'>
                        <div className='card card-body'>
                            <h6 className='card-title'>Your Friends</h6>
                                <div className='card-text'></div>
                        </div>
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
