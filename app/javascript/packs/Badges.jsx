import React from 'react'

const Badges = ({badges}) => {
    return (
        <div className='card card-body'>
            <h4 className='card-title'>Badges</h4>
            {badges.map(badge => {
                return (
                    <div key={badge.shortName}>
                        <h5>{badge.shortName}</h5>
                        <img src={badge.image100px} />
                        <p>{badge.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Badges