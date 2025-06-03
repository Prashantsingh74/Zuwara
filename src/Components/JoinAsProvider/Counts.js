import React from 'react'
import '../../Style/Counts.css'

function Counts() {
    return (
        <ul className="join-counts mob-none top120">
            <li>
                <h2 className="h2 primary-text">292433+</h2>
                <span>Bookings</span>
            </li>
            <li>
                <h2 className="h2 primary-text">2198+</h2>
                <span>Service Providers</span>
            </li>
            <li>
                <h2 className="h2 primary-text">204+</h2>
                <span>Doctors</span>
            </li>
        </ul>
    )
}

export default Counts