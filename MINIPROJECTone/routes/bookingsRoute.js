const express=require("express");
const router=express.Router();
const Booking=require("../models/booking")
const Hall=require("../models/hall")
router.post("/bookhall", async(req,res)=>{
    const {
        hall,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    }=req.body

    try { 
        const newBooking=new Booking({
        hall:hall.name,
        hallid:hall._id,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        transactionId:'1246'
        })
        const booking=await newBooking.save()
        
        const halltemp=await Hall.findOne({_id:hall._id})
        halltemp.currentbookings.push(
            {bookingid : booking._id,
            fromdate:fromdate,
            todate:todate,
            userid:userid,
            status:booking.status
        
        });
//updating the newbookings to the currentbookings array........
        await halltemp.save()
        res.send('Hall Booked Successfully');
    } catch (error) {
         return res.status(400).json({error});
    }

})

router.post('/getbookingsbyuserid', async (req, res) => {
    const { userid } = req.body;

    // Validate userid
    if (!userid || typeof userid !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing userid' });
    }

    try {
        // Fetch bookings for the given user ID
        const bookings = await Booking.find({ userid: userid });
        res.status(200).json(bookings);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'An error occurred while fetching bookings' });
    }
});

router.post("/cancelbooking", async (req, res) => {
    const { bookingid, hallid } = req.body;

    // Validate bookingid and hallid
    if (!bookingid || !hallid) {
        return res.status(400).json({ error: 'Invalid or missing bookingid or hallid' });
    }

    try {
        // Find the booking item
        const bookingitem = await Booking.findOne({ _id: bookingid });
        if (!bookingitem) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Update the booking status to 'cancelled'
        bookingitem.status = 'cancelled';
        await bookingitem.save();

        // Find the hall and update its bookings
        const hall = await Hall.findOne({ _id: hallid });
        if (!hall) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        // Remove the cancelled booking from the hall's current bookings
        const temp = hall.currentbookings.filter(booking => booking.bookingid.toString() !== bookingid);
        hall.currentbookings = temp;
        await hall.save();

        res.send('Your booking was cancelled successfully');

    } catch (error) {
        console.error('Error cancelling booking:', error);
        return res.status(500).json({ error: 'An error occurred while cancelling the booking' });
    }
});

router.get("/getallbookings", async(req,res)=>{
    try {
        const bookings=await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports=router;