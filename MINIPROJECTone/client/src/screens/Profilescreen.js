import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Flex, Tag } from 'antd';
function ProfileScreen() {
  // State to keep track of which link is selected
  const [activeTab, setActiveTab] = useState('profile');
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className='pb'>
      {/* Navigation Links */}
      <ul className="list">
        <li>
          <a className='ll' id='pid' href='#' onClick={() => setActiveTab('profile')}>
            <h1 id='l1'>My Profile</h1>
          </a>
        </li>
        <li>
          <a className='ll' id='bid' href='#' onClick={() => setActiveTab('booking')}>
            <h1 id='l2'>My Booking</h1>
          </a>
        </li>
      </ul>

      {/* Content based on the active tab */}
      <div>
        {activeTab === 'profile' && (
          <div className='profile'>
            <br />
            <h4>Profile</h4>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>IsAdmin:</strong> {user?.isAdmin ? 'YES' : 'NO'}</p>
          </div>
        )}
        {activeTab === 'booking' && (
          <div>
            <MyBookings />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useMemo(() => JSON.parse(localStorage.getItem('currentUser')), []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user._id) {
        setLoading(true);
        try {
          const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
          console.log(response.data);
          setBookings(response.data);
        } catch (error) {
          console.log(error)
          setLoading(false)
          setError(error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('User is not defined or user ID is missing');
      }
    };

    fetchBookings();
  }, [user._id]); // Run only if user._id changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  async function cancelBooking(bookingid, hallid) { // Use lowercase 'bookingid'
    try {
        setLoading(true);
        // Make sure the property names match what the backend expects
        const result = await axios.post("/api/bookings/cancelbooking", { bookingid, hallid });
        console.log(result.data);
        setLoading(false)
        Swal.fire('Congrats' , 'Your booking has been cancelled' , 'success').then(result=>{
          window.location.reload()
        })
    } catch (error) {
        console.log(error);
        setLoading(false)
        Swal.fire('Oops' , 'Something went wrong' , 'error')
    } finally {
        setLoading(false); // Ensure loading state is updated regardless of success or failure
    }
}


  return (
    <div>
        <div className='row'>
          <div className='col-md-6'>
              {loading && (<Loader/>)}
              {bookings && (bookings.map(booking=>{
                return <div className='bs'>
                   <h1>{booking.hall}</h1>
                   <p><strong>Booking Id :</strong> {booking._id}</p>
                   <p><strong>Check In :</strong> {booking.fromdate}</p>
                   <p><strong>Check Out :</strong> {booking.todate}</p>
                   <p><strong>Amount :</strong> {booking.totalamount}</p>
                   <p><strong>Status :</strong>
                   {booking.status=='cancelled' ? ( <Tag color="red">Cancelled</Tag>) : ( <Tag color="green">Confirmed</Tag>)}
                    </p>
                    {booking.status !== 'cancelled' && (
                      <div className="text-rigth">
                      <button class='btn' id='cancel' onClick={()=>cancelBooking(booking._id, booking.hallid)}> Cancel Booking</button>

                  </div>
                    )}
                </div>

              }))}
          </div>

        </div>
    </div>
  );
}
// {/* <h5>Bookings</h5>
// {bookings.length > 0 ? (
//   bookings.map((booking, index) => (
//     <div key={index}>
//       <p>{/* Render booking details here */}</p>
//     </div>
//   ))
// ) : (
//   <p>No bookings found.</p>
// )} */}