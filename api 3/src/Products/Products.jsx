import { useState,useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "../ProductCard/ProductCard"
import "./Products.css"
const Products =({addToCart})=>{
    const [thedata, setTheData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [searchParams] = useSearchParams()
    const [category, setCategory] = useState(searchParams.get("category") || "all")
    const [sort, setSort] = useState("default")
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
    const visibleProducts = thedata
        .filter((each_value)=> each_value.title.toLowerCase().includes(search.toLowerCase()))
        .filter((each_value)=> category === "all" || each_value.category === category)
        .sort((first, second)=>{
            if(sort === "price-low") return first.price - second.price
            if(sort === "price-high") return second.price - first.price
            return 0
        })
    return(
        <main className="container">
            <h1 className="page-heading">All products</h1>
            <p className="page-intro">Every product from the DummyJSON API, with live search, category filters and price sorting.</p>

            <div className="filters">
                <div className="filter-field filter-search">
                    <label htmlFor="search">Search by name</label>
                    <input
                        id="search"
                        type="text"
                        className="form-control"
                        placeholder="Type a product name..."
                        value={search}
                        onChange={(event)=> setSearch(event.target.value)}
                    ></input>
                </div>
                <div className="filter-field">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(event)=> setCategory(event.target.value)}
                    >
                        <option value="all">All categories</option>
                        {categories.map((each_category)=>(
                            <option key={each_category} value={each_category}>{each_category}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-field">
                    <label htmlFor="sort">Sort by</label>
                    <select
                        id="sort"
                        className="form-control"
                        value={sort}
                        onChange={(event)=> setSort(event.target.value)}
                    >
                        <option value="default">Default order</option>
                        <option value="price-low">Price: low to high</option>
                        <option value="price-high">Price: high to low</option>
                    </select>
                </div>
            </div>

            {loading && <p className="message">Loading products...</p>}
            {error && <p className="message error">{error}</p>}
            {!loading && !error && (
                visibleProducts.length === 0
                    ? <p className="message">No products match your search or filters. Try a different name or category.</p>
                    : (
                        <div className="results">
                            <p className="results-count">{visibleProducts.length} product{visibleProducts.length === 1 ? "" : "s"} found</p>
                            <div className="product-grid">
                                {visibleProducts.map((each_product)=>(
                                    <ProductCard key={each_product.id} product={each_product} addToCart={addToCart}></ProductCard>
                                ))}
                            </div>
                        </div>
                    )
            )}
        </main>
    )
}
export default Products
