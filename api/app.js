const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users')
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

app.use('/user',userRouter)


app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})
