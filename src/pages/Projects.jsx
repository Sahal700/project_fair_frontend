import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi } from '../services/allApi'

function Projects() {
  const [allProjects,setAllProjects]=useState([])
  const [token,setToken]=useState("")
  const [searchKey,setSearchKey] = useState("")
  // console.log(allProjects);
  // console.log(token);
  // console.log(searchKey);
  
  
  
  const getAllProject = async()=>{
    
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      const result = await getAllProjectApi(searchKey, reqHeader)
    // console.log(result)
    setAllProjects(result.data)
    }
  }
  useEffect(()=>{ 
    getAllProject()
  },[searchKey])
  useEffect(()=>{ 
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
      <Header/>
      <div className='my-5'>
        <h3 className='text-center'>All project</h3>
        {/* not login */}
        {!token ?
          <div className='container-fluid'>
          <div className='row'>
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" className='w-25 mt-5'/>
              <h4 className='text-danger mt-5'>please <Link to={'/login'}>Login</Link> to See More Projects</h4>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        :
        <div className='mt-5'>
          <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex" >
                <input type="text" onChange={(e)=>{setSearchKey(e.target.value)}} className='form-control shadow' placeholder='Technologies'/>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'lightgray',marginTop:'11.5px',marginLeft:'-30px'}} />
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>

          <div className='container-fluid p-4 p-md-5 mt-5'>
            <div className='row'>
              {allProjects?.map((item)=>
              <div className="col-md-3 mb-4">
                <ProjectCard project={item}/>
              </div>)
              }
            </div>
          </div>
        </div>
        }

        

      </div>
    </>
  )
}

export default Projects