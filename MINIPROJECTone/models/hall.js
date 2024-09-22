const { default: mongoose } = require("mongoose");
const hallsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    capacity: {
        type: Number,
        required: true,
        default: 50 // or any other default value
      },
    phonenumber:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    imageurls:[],
    currentbookings :[],
    type:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    facilities: {
        type: [String], // Assuming it's an array of strings
        required: false // Set to false or remove this line to make it optional
      }
},{
    timestamps:true,
})
const hallModel=mongoose.model('halls',hallsSchema)
module.exports=hallModel



//require mongoose          "name":"xyz",
//   "capacity":300,
//   "phonenumber":5483677657,
//   "amount":30000,
//   "imageurls":["https://asset1.zankyou.com/images/mag-post/c93/41a6/685//-/in/wp-content/uploads/2016/09/Green-Lounge-Banquets.jpg",
//     "https://asset1.zankyou.com/images/mag-post/c93/41a6/685//-/in/wp-content/uploads/2016/09/Green-Lounge-Banquets.jpg",
//     "https://asset1.zankyou.com/images/mag-post/c93/41a6/685//-/in/wp-content/uploads/2016/09/Green-Lounge-Banquets.jpg",
// ],
//   "currentbookings":[],
//   "type":"AC",
//   "description":"fjhiureiguuitguteuig"