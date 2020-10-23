import React from 'react'
import CurrenyFormat from "react-currency-format";
import "./Subtotal.css"

function Subtotal() {
    return (
        <div className="subtotal">
            {/*2:02:57*/}
            <CurrenyFormat
                renderText={(value)=>(
                    <>
                    <p>
                        {/*Part of the homework*/}
                        Subtotal (0 items):<strong>0</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/>
                        This order contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={0}//part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal
