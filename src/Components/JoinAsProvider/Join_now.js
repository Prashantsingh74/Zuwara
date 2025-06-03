import React from 'react'
import '../../Style/Join_now.css';
import { Link } from 'react-router-dom';

function Join_now() {
    return (
        <div className="join-sanar-card top120">
            <h2>Join Zwaara Now</h2>
            <p>To provide your medical services and enjoy innovative benefits</p>
            <Link className='link' to="/">
                <button type="submit" className="btn btn-lg btn-plain">
                    <i className="icon-welfare pr10"></i>Request join as service provider
                </button>
            </Link>
            {/* <button type="submit" className="btn btn-lg btn-plain">
                <i className="icon-welfare pr10"></i>Request join as service provider
            </button> */}
        </div>
    )
}

export default Join_now