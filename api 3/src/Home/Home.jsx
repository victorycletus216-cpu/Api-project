import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../ProductCard/ProductCard"
import heroImage from "../assets/hero.png"
import "./Home.css"
const Home =({addToCart})=>{
    const [thedata, setTheData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(()=>{
        const getStoreData =async()=>{
            try{
                const thedata =await fetch('https://dummyjson.com/products',
                {
                     method:"GET"
                }
                )
                const therealdata =await thedata.json();
                setTheData(therealdata.products || []);
            }catch{
                setError("Sorry, we could not load the products. Please try again later.")
            }
            setLoading(false)
        }
        getStoreData();
    },[])
    const categories = [...new Set(thedata.map((each_value)=> each_value.category))]
    const featuredProducts = thedata.slice(0, 8)
    return(
        <main className="container">
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Everything you need, in one place</h1>
                    <p className="hero-text">Browse real products from the DummyJSON API, search by name, filter by category and build your cart — this is a working demo storefront.</p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-primary">Shop now</Link>
                        <Link to="/products" className="btn btn-outline">Browse all products</Link>
                    </div>
                    <p className="hero-note">Demonstration store only — no real orders or payments are processed.</p>
                </div>
                <div className="hero-art">
                    
                </div>
            </section>

            {categories.length > 0 && (
                <section>
                    <div className="section-header">
                        <h2 className="section-title">Shop by category</h2>
                    </div>
                    <div className="category-list">
                        {categories.map((each_category)=>(
                            <Link key={each_category} to={`/products?category=${encodeURIComponent(each_category)}`} className="category-chip">
                                {each_category}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <div className="section-header">
                    <h2 className="section-title">Featured products</h2>
                    <Link to="/products" className="section-link">View all products</Link>
                </div>
                {loading && <p className="message">Loading products...</p>}
                {error && <p className="message error">{error}</p>}
                {!loading && !error && thedata.length === 0 && <p className="message">No products found.</p>}
                {!loading && !error && featuredProducts.length > 0 && (
                    <div className="product-grid">
                        {featuredProducts.map((each_product)=>(
                            <ProductCard key={each_product.id} product={each_product} addToCart={addToCart}></ProductCard>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
export default Home
