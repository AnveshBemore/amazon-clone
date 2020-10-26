import React,{useState,useEffect} from 'react'
import './Payment.css'
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from './StateProvider';
import {Link,useHistory} from "react-router-dom";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"; 
import { getBasketTotal } from './reducer';
import CurrenyFormat from "react-currency-format";
import {db} from "./firebase";
import axios from'./axios';

function Payment() {

    const[{basket,user},dispatch]=useStateValue();
    const history=useHistory();
    
    const stripe=useStripe();
    const elements=useElements();

    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]=useState(null);
    const [disabled,setDisabled] =useState(true);
    const [clientSecret,setClientSecret]=useState(true);

    useEffect(()=>{
        //generate thespecila stripe secret which allows us to charge a customer

        const getClientSecret= async()=>{
            const response=await axios({
                method:'post',
                //stripe expect the total in a currencies subunits
                url:`/payments/create?total=${getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    },[basket])

    console.log('THE SECRET IS >>>',clientSecret)
    console.log('hello ',user)


    const handleSubmit =async (event)=>{
        //stripe stuff
            event.preventDefault();
            setProcessing(true);

            const payload=await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            }).then(({paymentIntent})=>{
                //paymentIntent=payment confirmation

                db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created
                })
                
                setSucceeded(true);
                setError(null)
                setProcessing(false)

                dispatch({
                    type:'EMPTY_BASKET'
                })

                history.replace('/orders')
            })
    }
    {/*6:07:*/}
    const handleChange=event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message:"");
    }


    return (
        <div className='payment'>
            {/*Payment Section -delivery address*/}
            <div className='payment__container'>
                <h1>
                    Checkout(<Link to="/checkout">{basket?.length} items</Link>)
                </h1>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>

                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 r</p>
                        <p>Losdasdf afda</p>
                        
                    </div>
                </div>
                {/*Payment Section -Review Items*/}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item=>(
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/*Payment Section -Payment method*/}
                <div className='payment__section'>
                    <div className=" payment__title">
                        <h3>Payment Method</h3>
                    
                    </div>
                        <div className="payment__details">
                            {/* Strip magic will go */}   
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>
                                
                                <div className='payment__priceContainer'>
                                <CurrenyFormat
                                    renderText={(value)=>(
                                        <h3>Order Total : {value}</h3>                                       
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}//part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                                <button disabled={processing||disabled||succeeded}>
                                    <span>
                                        {processing?<p>Processing</p>:
                                        "Buy Now"}
                                    </span>
                                </button>
                                </div>

                                {/* Error */}
                                {error && <div>{error}</div>}
                            </form>


                          </div>                    

                </div>
               </div> 
        </div>
    )
}

export default Payment
