require('dotenv').config()
require('express-async-errors')

const express=require('express')
const app=express();

const connectDB=require('./db/connect')
const ProductsRouter=require('./routes/products')

const notFoundMiddleware=require('./middleware/not-found')
const errorMiddleware=require('./middleware/error-handle')

//middleware
app.use(express.json())

//rotes
app.get('/',(req,res)=>{
      res.send('<h1>Store API</h1><a href="/api/v1/products">product route </a>')
})



app.use('/api/v1/products',ProductsRouter)
//product route
app.use( notFoundMiddleware)
app.use(errorMiddleware)


const port =process.env.PORT || 3000

const start=async()=>{
      try {
           //connectDB
           await connectDB(process.env.MONGO_URI)
           app.listen(port,()=>console.log(`server is listening port ${port}...`))
      } catch (error) {
           console.log(error) 
      }
}
start();
