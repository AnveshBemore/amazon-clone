import React from 'react'
import CurrenyFormat from "react-currency-format";
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import "./Subtotal.css";
import {useHistory } from "react-router-dom";


function Subtotal() {
    const history =useHistory();
    const [{basket},dispatch]=useStateValue();
    return (
        <div className="subtotal">
            {/*2:02:57*/}
            <CurrenyFormat
                renderText={(value)=>(
                    <>
                    <p>
                        {/*Part of the homework*/}
                Subtotal ({basket.length} items):<strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/>
                        This order contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}//part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <button
            onClick={e=> history.push('/payment')}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal
