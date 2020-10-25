const functions = require('firebase-functions');
const express =require("express");
const cors=require("cors");
const stripe=require("stripe")('sk_test_51Hfpq1EeRnv1gmoWSpLjUzmuUvriU9bwa8PbVky4gpAY2t4ygQ7nVXNarNlfA35M6qPi7JW6pEOUHaEd2B3T6XAT008GLtztxT')

//API

// - App config 6:50:
const app=express();

// - Middlewares
app.use(cors({origin:true}));
app.use(express.json());

// - API routes
app.get('/',(request,response)=>response.status(200).send('hello world'))

app.post('/payments/create',async(request,response)=>{
    const total=request.query.total;

    console.log('Payment Request Recieved BOOM!!! for this amount >>> ', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,//subunits of the currency
        currency:"inr",
    });

    //OK-Created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})


// - Listem command
exports.api=functions.https.onRequest(app)

//Example endpoint
//c
