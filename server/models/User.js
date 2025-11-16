//table
const mongoose =require('mongoose');
require('mongoose-type-email');

const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        require:true,
        maxlenght:50
    },
    last_name:{
        type:String,
        require:true,
        maxlenght:50
    },
    age:{
        type:Number,
        require:true
    },
    mob:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        minlenght:5,
        require:true
    }
});


//we have created the table now we will export this table


module.exports=mongoose.model('user',userSchema)