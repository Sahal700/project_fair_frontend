import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Myproject() {
  const [userProject,setUserProject] = useState([])
  const {addResponse}=useContext(addResponseContext)
  const {editResponse}=useContext(editResponseContext)
  const [removeStatus,setRemoveStatas]=useState({})
  // console.log(userProject);
  
  const getUserProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token =sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      // console.log(reqHeader);
      
      const result = await userProjectApi(reqHeader)
      // console.log(result);
      setUserProject(result.data)
      
    }
  }
  const handleDelete = async(id)=>{
    if(sessionStorage.getItem("token")){
      const token =sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
      // console.log(reqHeader);
      
      const result = await removeUserProjectApi(id,reqHeader)
      // console.log(result);
      if (result.status==200) {
        setRemoveStatas(result)
      }else{
        toast.error("someting went wrong")
      }
      
    }
  }
  useEffect(()=>{
    getUserProject()
  },[addResponse,removeStatus,editResponse])
  return (
    <div className='p-4 shadow w-100'>
      <div className='d-flex justify-content-between'>
          <h3 className='text-success'>My project</h3>
          <Addproject/>
        </div>
      {userProject?.length>0? userProject.map((item)=>(
        <div className='d-flex p-3 bg-light mt-4 rounded-2 align-items-center'>
          <h4>{item?.title}</h4>
          <div className='ms-auto d-flex'>
            <Edit projects={item} />
            <Link to={item?.website} target='_blank'><FontAwesomeIcon icon={faGlobe} className='text-warning mx-md-3 mx-2' /></Link>
            <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-success mx-md-3 mx-2' /></Link>
            <FontAwesomeIcon icon={faTrashCan} className='text-danger mx-md-3 mx-2' onClick={()=>{handleDelete(item._id)}}/>
          </div>
        </div>
      ))
      
      :
      <h4>No projects added yet</h4>}
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </div>
  )
}

export default Myproject
