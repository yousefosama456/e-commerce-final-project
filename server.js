const express= require('express');
const app = express();
const dotenv= require('dotenv');
dotenv.config();
const cors= require('cors')
const path = require('path')
const port= process.env.PORT;
const ConnectDB= require('./config/DB.config')
const corsMiddleware= require("./middlewares/cors.middleware")
const errorMiddleWare=require('./middlewares/error-handler.middleware');
const AppError= require('./utilities/app-error.utils')
app.use(cors(corsMiddleware))
ConnectDB;

app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,"uploads")))


app.use('/auth',require('./routes/auth.route'))
app.use('/category',require('./routes/category.route'))
app.use('/subcategory',require('./routes/sub-category.route'))
app.use('/product',require('./routes/product.route'))
app.use('/cart',require('./routes/cart.route'))
app.use('/order',require('./routes/order.route'))
app.use('/user',require('./routes/user.route'))
app.use('/',(req,res,next)=>{
  next(new AppError (`can't find ${req.originalUrl} on this server`,404))
})

app.use(errorMiddleWare);

app.listen(port,()=>{
    console.log(`server is connected on port ${port}`)

})