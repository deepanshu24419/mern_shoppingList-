const express = require('express');
const mongoose = require('mongoose');
const path= require('path');
 


const items = require('./routes/api/item');



const app = express();

//bodyParser middleware
app.use(express.json());


//db config
const db = require('./config/keys').mongoURI;

//connect to mongo

mongoose.connect( db,
     { useUnifiedTopology: true }
    )
.then(() => console.log('mongodb connected...') )
.catch(err => console.log(err));


//use routes
app.use('/api/items', items);

//serve static assets if in production
if(process.env.NODE_ENV === 'production' ){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html' ));
        
    } );
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`) );