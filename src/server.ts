import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './modules/users/users.controller';
import merchantRouter from './modules/merchant/merchant.controller';
import productRouter from './modules/product/product.controller';
import orderRouter from './modules/order/order.controller';
import reviewRouter from './modules/reviews/review.controller';
import promotionRouter from './modules/promotion/promtion.controller';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000
const mongodbUri = process.env.MONGODB_URI || ""

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use(express.json());

mongoose.connect(mongodbUri);

const db = mongoose.connection;

db.on('error', () => {
    console.log("Connection Error!")
})

db.once('open', () => {
    console.log('Connected to DB!')
})


app.use('/users', userRouter);
app.use('/merchants', merchantRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/reviews', reviewRouter);
app.use('/promotions', promotionRouter);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
