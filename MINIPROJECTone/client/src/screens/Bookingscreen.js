import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'; 
import moment from 'moment';

function Bookingscreen() {
    const { hallid, fromdate, todate } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [hall, setHall] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        upiId: '',
        password: ''
    });

    const fromDate = moment(fromdate, 'DD-MM-YYYY');
    const toDate = moment(todate, 'DD-MM-YYYY');
    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

    useEffect(() => {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = '/login';
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post('/api/halls/gethallbyid', { hallid });
                const data = response.data;
                setTotalAmount(data.amount * totalDays);
                setHall(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        };

        fetchData();
    }, [hallid, totalDays]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handlePayNowClick = () => {
        setShowPaymentForm(true);
    };

    const handlePayment = async () => {
        // Validate all input fields
        const { name, email, upiId, password } = userDetails;
        if (!name || !email || !upiId || !password) {
            Swal.fire('Error', 'Please fill all fields. Try again!', 'error');
            return;
        }

        // Validate UPI ID
        const upiRegex = /^\d{10}@ybl$/;
        if (!upiRegex.test(upiId)) {
            Swal.fire('Error', 'UPI ID must contain 10 digits and end with @ybl. Try again!', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            Swal.fire('Error', 'Email must end with @gmail.com. Try again!', 'error');
            return;
        }

        const bookingDetails = {
            hall,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount: totalAmount,
            totaldays: totalDays,
            userDetails
        };

        try {
            await axios.post('/api/bookings/bookhall', bookingDetails);
            setPaymentSuccessful(true);
            setShowPaymentForm(false);
            Swal.fire('Congrats', 'Your Payment was Successfully Done', 'success');
        } catch (error) {
            Swal.fire('Oops', 'Something went wrong', 'error');
        }
    };

    return (
        <div className={`m-5 ${showPaymentForm ? 'blur-background' : ''}`}>
            {loading ? (<h1><Loader /></h1>) : hall ? (
                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h1>{hall.name}</h1>
                        <img src={hall.imageurls[0]} className='bigimg' alt='hall'/>
                    </div>
                    <div className='col-md-6'>
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date: {fromdate}</p>
                                <p>To Date: {todate}</p>
                                <p>Capacity: {hall.capacity}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total Days: {totalDays}</p>
                                <p>Rent Per Day: {hall.amount}</p>
                                <p>Total Amount: ₹{totalAmount}</p>
                            </b>
                        </div>
                        <div style={{ float: "right" }}>
                            {paymentSuccessful ? (
                                <div className="payment-success">
                                    <h2>Payment Successful</h2>
                                    <p>Total Amount: ₹{totalAmount}</p>
                                </div>
                            ) : showPaymentForm ? (
                                <div className="payment-form bs" style={formStyles}>
                                    <h2>Payment Details</h2>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input type="text" name="name" value={userDetails.name} onChange={handleInputChange} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" name="email" value={userDetails.email} onChange={handleInputChange} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>UPI ID:</label>
                                        <input type="text" name="upiId" value={userDetails.upiId} onChange={handleInputChange} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input type="password" name="password" value={userDetails.password} onChange={handleInputChange} className="form-control" />
                                    </div>
                                    <button className='btn' onClick={handlePayment}>Pay</button>
                                </div>
                            ) : (
                                <button className='btn' onClick={handlePayNowClick}>Pay Now</button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (<Error />)}
        </div>
    );
}

const formStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
};

// Add CSS class for background blur effect
const css = `
    .blur-background {
        filter: blur(5px);
    }
`;

export default Bookingscreen;
