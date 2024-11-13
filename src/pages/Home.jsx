import React, { useEffect, useState } from 'react'
import photo from '../assets/projectfair1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectApi } from '../services/allApi'

function Home() {
  const [isLogin,setIsLogin] = useState(false)
  const [homeProject,setHomeProject] = useState([])
  console.log(homeProject);
  
  const getHomeProject = async()=>{
    const result = await getHomeProjectApi()
    console.log(result);
    
    setHomeProject(result.data)
    
  }

  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    } 
  },[])
  return (
    <>
      <div style={{height:'100vh'}} className='bg-success p-md-5 p-3'>
        <div className='container-fluid mt-5'>
          <div className='row d-flex justify-content-center align-items-center pt-5'>
            <div className="col-md-6">
              <h1 style={{fontSize:'70px',color:'white'}}>Project fair</h1>
              <p>one stop destination for all software development Projects</p>
              {isLogin==false?<Link to={'/login'}><button className='btn p-0 mt-3 text-light'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button></Link>:
              <Link to={'/dashboard'}><button className='btn p-0 mt-3 text-light'>Manage Projrct <FontAwesomeIcon icon={faArrowRight} /></button></Link>}
            </div>
            <div className="col-md-6 mt-5 mt-md-0">
              <img src={photo} className='w-75' alt="no image" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center my-5'>Explore our Projects</h2>
        <div className='container-fluid'>
          <div className='row px-md-5 px-4'>
            {homeProject?.map((item)=>
              <div className="col-md-4">
              <ProjectCard project={item}/>
            </div>
            )
              }
          </div>
        </div>
        <Link to={'/projects'}><p className='text-center my-4'>See more projects</p></Link>
      </div>
    </>
  )
}

export default Home