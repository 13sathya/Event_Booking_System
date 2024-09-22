import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hall from '../components/Hall';
import 'antd/dist/reset.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
function Homescreen() {
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fromdate,setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicatehalls, setduplicatehalls] = useState([]);
    const [noHallsMessage,setNoHallsMessage]=useState('');
    const [searchkey,setsearchkey]=useState('');
    const[type,settype]=useState('all');


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/halls/getallhalls');
                const data = response.data;
                console.log(data);
                setHalls(data);
                setduplicatehalls(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function filterByDate(dates) {
        // Ensure that 'dates' is defined and has exactly two dates
        if (!dates || dates.length < 2) {
            return; // Exit the function if 'dates' is not valid
        }

        // Extract and format the dates
        const formattedFromDate = dates[0].format('DD-MM-YYYY');
        const formattedToDate = dates[1].format('DD-MM-YYYY');

        setfromdate(formattedFromDate);
        settodate(formattedToDate);

        // Filter the halls based on availability
        const filteredHalls = duplicatehalls.filter(hall => {
            // If the hall has no current bookings, it's available
            if (hall.currentbookings.length === 0) {
                return true;
            }

            // Check if the hall is available for the selected date range
            const isAvailable = hall.currentbookings.every(booking => {
                const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
                const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

                // Check if there is an overlap
                // If the selected range overlaps with the booking range, mark as unavailable
                return (
                    moment(formattedToDate, 'DD-MM-YYYY').isBefore(bookingFromDate, 'day') || // Selected end date is before the booking start date
                    moment(formattedFromDate, 'DD-MM-YYYY').isAfter(bookingToDate, 'day')     // Selected start date is after the booking end date
                );
            });

            // Return true only if the hall is available
            return isAvailable;
        });

        // Update the halls state and noHallsMessage state
        setHalls(filteredHalls);
        setNoHallsMessage(filteredHalls.length === 0 ? 'No Halls Available' : ''); // Set message if no halls are available
    }
    function filterBySearch(){
        const temphalls=duplicatehalls.filter(hall=>hall.name.toLowerCase().includes(searchkey.toLowerCase()))
        setHalls(temphalls)
        setNoHallsMessage(temphalls.length === 0 ? 'No Halls Available' : '');
    }
    function filterByType(e){
        settype(e)
        if(e!=='all'){
        const temphalls=duplicatehalls.filter(hall=>hall.type.toLowerCase()==e.toLowerCase())
        setHalls(temphalls)
        setNoHallsMessage(temphalls.length === 0 ? 'No Halls Available' : '');
        }
        else{
            setHalls(duplicatehalls)
        }
    }
    
    return (
        <div className='container'>
            <div className='row mt-5 ml-5 bs'>
                <div className='col-md-3 p-2 ml-4'>
                    <RangePicker className='cal' format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
                <div className='col-md-5 p-2 ml-5'>
                    <input type='text' className='form-contorl' placeholder='search halls' value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}/>
                </div>
                <div className='col-md-3 mb-30'>
                <select className='form-control' id='sel' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                     <option value='all'>All</option>
                     <option value='AC'>AC</option>
                     <option value='Non-AC'>Non-AC</option>
                     <option value='AC/Non-AC'>AC/Non-AC</option>
                </select>
                </div>
            </div>
            <div className='row justify-content-center mt-5'>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error />
                ) : noHallsMessage ? (
                    <div>{noHallsMessage}</div> // Display the message if no halls are available
                ) : halls.length > 0 ? (
                    halls.map(hall => (
                        <div className="col-md-9 mt-2" key={hall._id}>
                            <Hall hall={hall} fromdate={fromdate} todate={todate} />
                        </div>
                    ))
                ) : (
                    <Error />
                )}
            </div>
        </div>
    );
}

export default Homescreen;
