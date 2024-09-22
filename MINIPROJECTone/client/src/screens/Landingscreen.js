import React from 'react';
import { Link } from 'react-router-dom';
function Landingscreen() {
    return (
        <div className='row landing justify-content-center'>
            <div className='col-md-9 my-auto text-center'>
                <h6>Events</h6>
                <h5>Turning plans into memorable moments.</h5>
                <Link to='/home'>
                    <button className='btn landingbtn'>Get Started</button>
                </Link>
                <div className='additional-links mt-4'>
                    <Link to='/about' className='link-item'>
                        <h5>About Us</h5>
                    </Link>
                    <Link to='/mission' className='link-item'>
                        <h5>Mission & Vision</h5>
                    </Link>
                    <Link to='/contact' className='link-item'>
                        <h5>Contact Us</h5>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Landingscreen;
