const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');




const app = express();


//bodyParser middleware
app.use(express.json());


//db config
const db = config.get('mongoURI');
//Connect to mongo

mongoose
.connect(db,{
    
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    
})
.then(() => console.log('mongoDB connected...'))
.catch(err => console.log(err) );




//use routes
app.use('/api/items', require('./routes/api/item'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

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