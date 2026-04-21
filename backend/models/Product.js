const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title:{
    type : String,
    required : true,
  },
  description :{
    type : String,
    required : true
  },
  price:{
    type : Number,
    required : true,
  },
  category:{
    type:String,
    required: true,
  },
  image:[
    {
    type : String,
    }
  ],

  stock :{
    type : Number,
    required : true,
    default : 0,
  },

  rating:{
    type : Number,
    default : 0,
  },
  numReview :{
    type : Number,
    default :0,
  },
  discount:{
    type : Number,
    default:0,
  },
  brand:{
    type: String,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);