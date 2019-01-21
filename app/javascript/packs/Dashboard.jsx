import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: {},
            loggedIn: false,
            lifetimeBest: {},
            lifetimeTotals: {}
        }
    }

    componentDidMount(){
        if(window.location.hash){
            let fitbitToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkQ5VFMiLCJzdWIiOiI3OFRISEoiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJhY3QgcnNldCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNTQ4NzAzMDk2LCJpYXQiOjE1NDgwOTg0NTN9.szMvnNqyaeg703Cyljz-lbJXBrWcM_P2qNeoSx5XQPw"
            console.log(fitbitToken)

            axios({
                method: 'get',
                url: 'https://api.fitbit.com/1/user/-/profile.json',
                headers: { 'Authorization': 'Bearer ' + fitbitToken},
                mode: 'cors'
            })
            .then(response => this.setState({user: response.data.user, loggedIn: true}))
            .catch(error => console.log(error))

            axios({
                method: 'get',
                url: 'https://api.fitbit.com/1/user/-/activities.json',
                headers: { 'Authorization': 'Bearer ' + fitbitToken},
                mode: 'cors'
            })
            .then(response => this.setState({lifetimeBest: response.data.lifetime.tracker, lifetimeTotals: response.data.lifetime.total}))
            .catch(error => console.log(error))

        }
    }

    render(){
        return (
            <div className='container'>
                <header className='text-center'>
                    <span className='float-right'>{this.state.user.displayName}</span>
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
                        <div className='card card-body'>
                            <h4 className='card-title'>Lifetime Stats</h4>
                                <h6 className='card-text'>Distance:</h6>
                                <p>Total: {this.state.lifetimeTotals.distance}</p>
                                <p>Best: {this.state.lifetimeBest.distance} </p>
                                <h6 className='card-text'>Steps:</h6>
                                <p>Total: {this.state.lifetimeTotals.steps}</p>
                                <p>Best: {this.state.lifetimeBest.steps} </p>
                        </div>

                        <div className='card card-body'>
                            <h4 className='card-title'>Badges</h4>
                                <div className='card-text'></div>
                        </div>
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
