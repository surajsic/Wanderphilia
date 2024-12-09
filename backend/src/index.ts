import express, {Request, Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import myHotelRoutes from './routes/myhotels';
import hotelRoutes from "./routes/hotels"
import bookingRoutes from './routes/my-bookings'
import axios from 'axios'
import crypto from 'crypto'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);


const app =express();
app.use(cookieParser());
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/my-hotels", myHotelRoutes);

app.use("/api/hotels",hotelRoutes);

app.use("/api/my-bookings", bookingRoutes)

app.get("*", (req: Request, res: Response)=>{
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})


app.post('/order', async (req, res) => {
  try {
      let {
          MUID,
          amount,
          mobile,
          name,
          transactionId
      } = req.body;

      const data = {
          merchantId: process.env.MERCHANT_ID,
          merchantTransactionId: transactionId,
          name: name,
          amount: amount * 100,
          redirectUrl: `http://localhost:7000/status?id=${transactionId}`,
          redirectMode: 'POST',
          mobileNumber: mobile,
          paymentInstrument: {
              type: "PAY_PAGE"
          }
      }

      const keyIndex = 1

      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString('base64');

      const string = payloadMain + `/pg/v1/pay` + process.env.SALT_KEY;

      const sha256 = crypto.createHash('sha256').update(string).digest('hex');

      const checksum = sha256 + '###' + keyIndex;

      //const prod_Url = "https://api/phonepe.com/apis/hermes/pg/v1/pay" //live website
      const prod_Url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay" //testing url

      const options = {
          method: 'POST',
          url: prod_Url,
          headers: {
              'accept': "application/json",
              "Content-Type": "application/json",
              "X-VERIFY": checksum
          },
          data: {
              request: payloadMain
          }
      }

      await axios(options).then(response => {
          res.json(response.data)
      }).catch(error => {
          console.log(error.message);
          res.status(500).json({ error: error.message })
      })

  } catch (error) {
      console.log(error);
  }
})

app.post("/status", async (req, res) => {
  try {

      const merchantTransactionId = req.query.id;

      const merchantId = process.env.MERCHANT_ID;

      const keyIndex = 1;

      const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + process.env.SALT_KEY;
      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      const checksum = sha256 + "###" + keyIndex;

      //const prod_url = `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay`

      const options = {
          method: 'GET',
          url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
          headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              "X-VERIFY": checksum,
              "X-MERCHANT-ID": merchantId,
          },
      }
      
      await axios(options).then(response => {
          if (response.data.success === true) {
              const url = "http://localhost:7000/success"
              return res.redirect(url)
          } else{
              const url = "http://localhost:7000/failure"
              return res.redirect(url)
          }
      })
  } catch (error) {
      console.log(error)
  }
})


app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`)
})
