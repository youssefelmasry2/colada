import express, { Request, Response } from 'express'
import mongoose from 'mongoose';
import userRouter from './modules/users/users.controller';
import merchantRouter from './modules/merchant/merchant.controller';


const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use(express.json());

mongoose.connect(
    'mongodb://admin:password@127.0.0.1:27017/ecommerce?authSource=admin'
);

const db = mongoose.connection;

db.on('error', () => {
    console.log("Connection Error!")
})

db.once('open', () => {
    console.log('Connected to DB!')
})


app.use('/users', userRouter);
app.use('/merchants', merchantRouter);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
