import { useEffect, useState } from "react";
import "./Job.css";
const Job=()=>{
    const [job,setJob] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect (() =>{
        const getthejob =async()=>{
            try{
                const response = await fetch("https://jsearch.p.rapidapi.com/estimated-salary?job_title=nodejs%20developer&location=new%20york&location_type=ANY&years_of_experience=ALL",
                    {
                        method:"GET",
                        headers: {
                            'x-rapidapi-key': '8e9efaea7fmsh84cee3cac90b11ap1b641cjsna4202a20d93b',
                            'x-rapidapi-host': 'jsearch.p.rapidapi.com',
                            'Content-Type': 'application/json'
                        }
                    }
                )
                const actual_job = await response.json()
                if(actual_job.data){
                    setJob(actual_job.data)
                }else{
                    setError("Sorry, no salary data was returned. Please try again later.")
                }
            }catch{
                setError("Sorry, we could not load the salary data. Please try again later.")
            }
            setLoading(false)
        }
        getthejob();
    },[])
    return(
        <main className="container">
            <h1 className="page-heading">Job Salaries</h1>
            <p className="page-intro">Estimated salary results for a Node.js Developer in New York, fetched from the JSearch API.</p>
            {loading && <p className="message">Loading job salaries...</p>}
            {error && <p className="message error">{error}</p>}
            {!loading && !error && job.length === 0 &&
                <p className="message">No salary results were found.</p>}
            <div className="job-grid">
            {job.map((each_value) =>(
                <div className="job-card" key={each_value.job_title + each_value.location}>
                    <span className="job-location">{each_value.location}</span>
                    <h2 className="job-title">{each_value.job_title}</h2>
                    <p className="job-label">Median salary</p>
                    <p className="job-salary">${Math.round(each_value.median_salary).toLocaleString()} <span className="job-period">{each_value.salary_period === "YEAR" ? "per year" : "per period"}</span></p>
                    <p className="job-range">Salary range: ${Math.round(each_value.min_salary).toLocaleString()} - ${Math.round(each_value.max_salary).toLocaleString()}</p>
                </div>
             ))}
            </div>
        </main>
    )
}
export default Job;
