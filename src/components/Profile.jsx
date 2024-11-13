import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../services/allApi';
import { Collapse } from 'react-bootstrap';

function Profile() {
  const [userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:"",
    profile:"",
    github:"",
    linkedin:""
  })
  const[existingImg,setExistingImg]=useState("")
  const[preview,setPreview]=useState("")
  const[updateStatus,setUpdateStatus]=useState({})
  const [open, setOpen] = useState(false);
  // console.log(userDetails);
  // console.log(preview);
  

  const handleFile = (e)=>{
    setUserDetails({...userDetails,profile:e.target.files[0]})
  }

  const handleUpdate =async()=>{
    const{username,email,github,linkedin,password,profile}=userDetails
    if(!linkedin || !github){
      toast.info("please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImg)
      const token = sessionStorage.getItem("token")
      if(preview){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        const result = await updateUserProfileApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success("Updated succesfully")
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setUpdateStatus(result)
        }else{
          toast.error("something went wrong")
        }
        
      }else{
        const reqHeader = {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
        const result = await updateUserProfileApi(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success("Updated succesfully")
          sessionStorage.setItem("existingUser",JSON.stringify(result.data))
          setUpdateStatus(result)
        }else{
          toast.error("something went wrong")
        }
      }
    }
  }

  useEffect(()=>{
    if (sessionStorage.getItem("existingUser")) {
      const user =JSON.parse(sessionStorage.getItem("existingUser"))
      console.log(user);
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
      setExistingImg(user.profile)
      
    }
  },[updateStatus])
  useEffect(()=>{
    if(userDetails.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  },[userDetails.profile])
  
  return (
    <div className='p-4 shadow' onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}}>
      <div className='d-flex justify-content-between'>
        <h3 style={{color:'rgb(62,179,24)'}}>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn' style={{borderColor:'rgb(160,98,192)', color:'rgb(160,98,192)'}}>{open?<FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faAngleDown} />}</button>
      </div>

      <Collapse in={open}>
        <div>
          <div className="d-flex justify-content-center align-items-center flex-column mt-4">
            <label htmlFor="profileimage" className='mb-4 d-flex justify-content-center align-items-center '>
                <input id='profileimage' type="file" style={{display:'none'}} onChange={(e)=>{handleFile(e)}} />
                {existingImg==""?
                  <img src={preview?preview:"https://icon-library.com/images/profile-picture-icon/profile-picture-icon-0.jpg"} className='' alt="" style={{borderRadius:'50%',width:'150px',height:'150px'}} />
                  :
                  <img src={preview?preview:`${serverUrl}/upload/${existingImg}`} className='' alt="" style={{borderRadius:'50%',width:'150px',height:'150px'}} />
                }
            </label>
    
            <div className='w-100'>
                <div className="mb-3">
                    <input type="text" className='form-control'  placeholder='github' value={userDetails?.github} onChange={(e)=>{setUserDetails({...userDetails,github:e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <input type="text" className='form-control'  placeholder='Linkedin' value={userDetails?.linkedin} onChange={(e)=>{setUserDetails({...userDetails,linkedin:e.target.value})}}/>
                </div>
                <div className="mb-3">
                    <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                </div>
            </div>
          </div>
        </div>
      </Collapse>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </div>
  )
}

export default Profile