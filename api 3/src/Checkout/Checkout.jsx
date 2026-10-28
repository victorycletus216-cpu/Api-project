import { useState } from "react"
import { Link } from "react-router-dom"
import "./Checkout.css"
const Checkout =({cart, cartCount, cartTotal, clearCart})=>{
    const [form, setForm] = useState({name:"", email:"", phone:"", address:""})
    const [errors, setErrors] = useState({})
    const [confirmed, setConfirmed] = useState(false)
    const [orderTotal, setOrderTotal] = useState(0)
    const handleChange =(event)=>{
        setForm({...form, [event.target.name]: event.target.value})
    }
    const validateForm =()=>{
        const newErrors = {}
        if(form.name.trim().length < 2){
            newErrors.name = "Please enter your full name."
        }
        if(!/^\S+@\S+\.\S+$/.test(form.email)){
            newErrors.email = "Please enter a valid email address."
        }
        if(form.phone.replace(/\D/g, "").length < 7){
            newErrors.phone = "Please enter a valid phone number."
        }
        if(form.address.trim().length < 10){
            newErrors.address = "Please enter a delivery address (at least 10 characters)."
        }
        return newErrors
    }
    const handleSubmit =(event)=>{
        event.preventDefault()
        const newErrors = validateForm()
        setErrors(newErrors)
        if(Object.keys(newErrors).length === 0){
            setOrderTotal(cartTotal)
            setConfirmed(true)
            clearCart()
        }
    }

    if(confirmed){
        return(
            <main className="container">
                <div className="demo-notice success">
                    <h1>Order confirmation </h1>
                    <p><strong>Nothing was really ordered.</strong> This website is a front-end demonstration with no order-processing backend and no payment system. No money was taken, no payment card details are collected anywhere on this site, and no details were sent to a server.</p>
                    <p>order total: <strong>${orderTotal.toFixed(2)}</strong></p>
                    <p>Thank you for trying out the checkout.</p>
                    <Link to="/products" className="btn btn-primary">Continue shopping</Link>
                </div>
            </main>
        )
    }

    if(cart.length === 0){
        return(
            <main className="container">
                <h1 className="page-heading">Checkout</h1>
                <div className="cart-empty">
                    <p className="cart-empty-title">Your cart is empty</p>
                    <p className="cart-empty-text">Add some products to your cart before checking out.</p>
                    <Link to="/products" className="btn btn-primary">Browse products</Link>
                </div>
            </main>
        )
    }

    return(
        <main className="container">
            <h1 className="page-heading">Checkout</h1>
            <p className="page-intro">Fill in your details below to see how a real checkout would work.</p>

            <div className="demo-notice">
                <strong>Demonstration checkout:</strong> this is a practice project without a real order or payment backend. Do not send real orders. No payment card information is requested or accepted here.
            </div>

            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={handleSubmit} noValidate>
                    <h2 className="checkout-title">Delivery details</h2>

                    <div className="form-group">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className={`form-control ${errors.name ? "form-invalid" : ""}`}
                            value={form.name}
                            onChange={handleChange}
                        ></input>
                        {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-control ${errors.email ? "form-invalid" : ""}`}
                            value={form.email}
                            onChange={handleChange}
                        ></input>
                        {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone number</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className={`form-control ${errors.phone ? "form-invalid" : ""}`}
                            value={form.phone}
                            onChange={handleChange}
                        ></input>
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Delivery address</label>
                        <textarea
                            id="address"
                            name="address"
                            rows="3"
                            className={`form-control ${errors.address ? "form-invalid" : ""}`}
                            value={form.address}
                            onChange={handleChange}
                        ></textarea>
                        {errors.address && <p className="form-error">{errors.address}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Place Order (demo)</button>
                </form>

                <aside className="checkout-summary">
                    <h2 className="summary-title">Your order</h2>
                    {cart.map((each_item)=>(
                        <div className="checkout-line" key={each_item.id}>
                            <span className="checkout-line-title">{each_item.title}</span>
                            <span className="checkout-line-qty">x{each_item.quantity}</span>
                            <span className="checkout-line-price">${(each_item.price * each_item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="checkout-total">
                        <span>Total ({cartCount} item{cartCount === 1 ? "" : "s"})</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </aside>
            </div>
        </main>
    )
}
export default Checkout
