//table
const mongoose =require('mongoose');
require('mongoose-type-email');

const ProfileSchema=new mongoose.Schema({
    userId:{
        type:String,
        
    },
    url:{
        type:String,
        
    }
});


//we have created the table now we will export this table


module.exports=mongoose.model('Profile',ProfileSchema)