const express = require("express")
const app = express()
require("dotenv").config()
const createDomainValidator = require('./middleware/domainValidator');
const userRouter = require("./router/userRouter")
const mongoose = require("mongoose")
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)


const domainValidator = createDomainValidator({
    allowed: ['awasthiorbitcareer.com'],
    action: 'redirect',               // 'block' | 'redirect' | 'close'
    redirectTo: 'https://awasthiorbitcareer.com', // used only for redirect
    allowWww: true,
    allowSubdomains: false,
    logger: (msg, level) => console.log(`[DOMAIN-${level}]`, msg),
});
app.use(domainValidator);
app.use(userRouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT, () => { console.log(`your serve is runnning port ${process.env.PORT}`) })