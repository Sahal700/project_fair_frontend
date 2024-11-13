import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'

function Auth({register}) {
  const navigate = useNavigate()
  const [userDetails,setUserDetails]=useState(
    {
      username:"",
      email:"",
      password:""
    }
  )
  const {setLoginResponse} = useContext(loginResponseContext)
  // console.log(userDetails);
  
  const handleRegister= async()=>{
    const {username,email,password} = userDetails
    if(!username||!email||!password){
      toast.info('please fill the form')
    }else{
      const result = await registerApi(userDetails)
      // console.log(result);
      if(result.status==200){
        toast.success("registration successfull")
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }else if(result.status==406){
        toast.warning(result.response.data)
      }else{
        toast.error('somthing went wrong')
      }
    }
  }
  const handleLogin = async()=>{
    const {email,password} = userDetails
    if(!email||!password){
      toast.info('please fill the form')
    }else{
      const result = await loginApi({email,password})
      // console.log(result);
      if(result.status == 200){
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        toast.success("Login successfull")
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        setTimeout(() => {
          navigate('/')
        }, 2000);
        setLoginResponse(true)
      }else if(result.status == 406){
        toast.warning(result.response.data)
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }else{
        toast.error("something went wrong")
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
      }
        
     
      
    }
  }

  
  return (
    <>
      <div className='container-fluid my-5'>
        <div className='row'>
          <div className="col-md-1"></div>
          <div className="col-md-10 p-3">
            <Link to={'/'} className='fs-5' style={{textDecoration:'none'}}><FontAwesomeIcon icon={faArrowLeft} /> Back to home</Link>
            <div className='shadow bg-success p-md-3'>
              <div className="row my-md-5">
                <div className="col-md-6 d-flex justify-content-center align-items-center my-5"><img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" className='w-50' alt="" /></div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-light">
                  <h2>Project fair</h2>
                  {!register?
                    <h4>Sign in to Your Account</h4>:
                    <h4>Sign up to Your Account</h4>
                    }
                  <div className='mt-5 w-75 px-md-4 '>
                    {register && <input type="text" className='form-control rounded-0 mb-2' placeholder='Username' onChange={(e)=>{setUserDetails({...userDetails,username:e.target.value})}} value={userDetails.username} />}
                    <input type="email" className='form-control rounded-0' placeholder='Email' onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}} value={userDetails.email} />
                    <input type="password" className='form-control rounded-0 mt-2' placeholder='Password' onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}} value={userDetails.password} />
                    {!register ?
                      <div>
                      <button className='btn btn-warning w-100 mt-2 rounded-1' onClick={handleLogin}>login</button>
                      <p className='mt-3'>New User? Click Here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                    </div>
                    :
                    <div>
                      <button className='btn btn-warning w-100 mt-2 rounded-1' onClick={handleRegister}>Register</button>
                      <p className='mt-3'>Already a User? Click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                    </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Auth