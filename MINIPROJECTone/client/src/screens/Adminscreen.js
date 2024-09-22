import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2'; 

const { TabPane } = Tabs;

function Adminscreen() {
 
    // useEffect(()=>{
    //     if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin)
    //         window.location.href='/home'
    // },[])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Halls" key="2">
                    <Halls />
                </TabPane>
                <TabPane tab="Add Halls" key="3">
                   <Addhall/>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users/>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Adminscreen;

//booking list component

export function Bookings() {
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await axios.get("/api/bookings/getallbookings");
                setbookings(data);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <strong>Bookings</strong>
                {loading && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Hall</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 && (bookings.map(booking => {
                            return (
                                <tr key={booking._id}>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.hall}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>

                {error && (<Error message={error.message} />)}
            </div>
        </div>
    );
}

export function Halls() {
    const [halls, sethalls] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const { data } = await axios.get("/api/halls/getallhalls");
                sethalls(data);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(error);
            }
        };
        fetchHalls();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <strong>Halls</strong>
                {loading && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Hall Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Amount</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {halls.length > 0 && (halls.map(hall => {
                            return (
                                <tr key={hall._id}>
                                    <td>{hall._id}</td>
                                    <td>{hall.name}</td>
                                    <td>{hall.type}</td>
                                    <td>{hall.capacity}</td>
                                    <td>{hall.amount}</td>
                                    <td>{hall.phonenumber}</td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>

                {error && (<Error message={error.message} />)}
            </div>
        </div>
    );
}


export function Users() {
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get("/api/users/getallusers");
                setusers(data);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <strong>Users</strong>
                {loading && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 && (users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>

                {error && (<Error message={error.message} />)}
            </div>
        </div>
    );
}
//Add hall component
export function Addhall() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);
    const [name, setname] = useState('');
    const [amount, setamount] = useState('');
    const [capacity, setcapacity] = useState('');
    const [description, setdescription] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [type, settype] = useState('');
    const [imageurl1, setimageurl1] = useState('');
    const [imageurl2, setimageurl2] = useState('');
    const [imageurl3, setimageurl3] = useState('');
    const [facilities, setfacilities] = useState('');

    async function addHall() {
        const newhall = {
            name,
            amount,
            capacity,
            phonenumber,
            description,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3],
            facilities
        };

        try {
             setloading(true);
            // Make an API POST request to add the new hall
            const response = await axios.post('/api/halls/addhall', newhall); // Replace with your API endpoint
            console.log(response.data);

            // If successful, show a success message
            Swal.fire('Success', 'Hall added successfully!', 'success').then(response=>{
                window.location.href='/home'
            })
            setloading(false);
            // Optionally, reset the form after successful addition
            setname('');
            setamount('');
            setcapacity('');
            setdescription('');
            setphonenumber('');
            settype('');
            setimageurl1('');
            setimageurl2('');
            setimageurl3('');
           setfacilities('');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to add the hall', 'error');
            setloading(false);
        }
    }

    return (
        <div className='row mt-2'>

            <div className='col-md-5'>
            {loading && <Loader/>}
                <input
                    type='text'
                    className='form-control'
                    placeholder='Hall name'
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Type'
                    value={type}
                    onChange={(e) => settype(e.target.value)}
                />
                <input
                    type='number'
                    className='form-control'
                    placeholder='Amount per day'
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                />
                <input
                    type='number'
                    className='form-control'
                    placeholder='Capacity'
                    value={capacity}
                    onChange={(e) => setcapacity(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                />
            </div>
            <div className='col-md-5'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Phone number'
                    value={phonenumber}
                    onChange={(e) => setphonenumber(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Image URL 1'
                    value={imageurl1}
                    onChange={(e) => setimageurl1(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Image URL 2'
                    value={imageurl2}
                    onChange={(e) => setimageurl2(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Image URL 3'
                    value={imageurl3}
                    onChange={(e) => setimageurl3(e.target.value)}
                />
                <input
                    type='text'
                    className='form-control'
                    placeholder='Facilities'
                    value={facilities}
                    onChange={(e) => setfacilities(e.target.value)}
                />
                <div className='text-right'>
                    <button className='btn' onClick={addHall}>Add Hall</button> {/* Add the button click handler */}
                </div>
            </div>
        </div>
    );
}
