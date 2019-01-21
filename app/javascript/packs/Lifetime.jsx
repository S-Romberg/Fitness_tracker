import React from 'react'

const Lifetime = ({lifetimeStats}) => {
    return (
        <div className='card card-body'>
            <h4 className='card-title'>Lifetime Stats</h4>
            <h5 className='card-text'>Distance:</h5>
            <p>Total: {lifetimeStats.lifetime.total.distance}</p> 
            <p>Best: {lifetimeStats.best.total.distance.value} on {lifetimeStats.best.total.distance.date} </p>
            <h5 className='card-text'>Steps:</h5>
            <p>Total: {lifetimeStats.lifetime.total.steps}</p>
            <p>Best: {lifetimeStats.best.total.steps.value} on {lifetimeStats.best.total.steps.date}</p> 
        </div>
    )
}

export default Lifetime