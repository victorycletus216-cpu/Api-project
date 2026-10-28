import { useState, useEffect } from "react"
import { BrowserRouter as Router,Routes,Route,Link,NavLink} from "react-router-dom"
import Home from "./Home/Home"
import Products from "./Products/Products"
import ProductDetails from "./ProductDetails/ProductDetails"
import Cart from "./Cart/Cart"
import Checkout from "./Checkout/Checkout"
import "./App.css"
const NotFound =()=>{
  return(
    <main className="not-found">
      <h1>Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to the Home page</Link>
    </main>
  )
}
const App =()=>{
  const [cart, setCart] = useState(()=>{
    try{
      const saved = localStorage.getItem("shopping-cart")
      if(!saved) return []
      const parsed = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed : []
    }catch{
      return []
    }
  })
  useEffect(()=>{
    try{
      localStorage.setItem("shopping-cart", JSON.stringify(cart))
    }catch{
      // localStorage is unavailable in this browser, the cart will just not persist
    }
  },[cart])
  const addToCart =(product, quantity)=>{
    setCart((prevCart)=>{
      const found = prevCart.find((each_item)=> each_item.id === product.id)
      if(found){
        return prevCart.map((each_item)=>(
          each_item.id === product.id ? {...each_item, quantity: each_item.quantity + quantity} : each_item
        ))
      }
      return [...prevCart, {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: quantity
      }]
    })
  }
  const increaseQuantity =(productId)=>{
    setCart((prevCart)=> prevCart.map((each_item)=>(
      each_item.id === productId ? {...each_item, quantity: each_item.quantity + 1} : each_item
    )))
  }
  const decreaseQuantity =(productId)=>{
    setCart((prevCart)=> prevCart
      .map((each_item)=>(
        each_item.id === productId ? {...each_item, quantity: each_item.quantity - 1} : each_item
      ))
      .filter((each_item)=> each_item.quantity > 0))
  }
  const removeFromCart =(productId)=>{
    setCart((prevCart)=> prevCart.filter((each_item)=> each_item.id !== productId))
  }
  const clearCart =()=>{
    setCart([])
  }
  const cartCount = cart.reduce((sum, each_item)=> sum + each_item.quantity, 0)
  const cartTotal = cart.reduce((sum, each_item)=> sum + each_item.price * each_item.quantity, 0)
  return(
    <Router>
      <nav className="navbar">
        <Link className="brand" to="/">My Store</Link>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart <span className="cart-count">{cartCount}</span></NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart}/>}></Route>
        <Route path="/products" element={<Products addToCart={addToCart}/>}></Route>
        <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart}/>}></Route>
        <Route path="/cart" element={
          <Cart
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        }></Route>
        <Route path="/checkout" element={
          <Checkout
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            clearCart={clearCart}
          />
        }></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <p className="footer-brand">My Store</p>
            <p className="footer-note">A demonstration storefront built with React, Vite and the DummyJSON products API. No real orders, payments or personal details are processed by this project.</p>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      </footer>
    </Router>
  )
}
export default App;
