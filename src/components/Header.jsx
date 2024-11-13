import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';

function Header() {
  const [token,setToken]=useState("")
  const navigate = useNavigate()
  const {setLoginResponse} = useContext(loginResponseContext)
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setLoginResponse(false)
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <div>
      <Navbar className="bg-success px-5">
        
          <Navbar.Brand>
           <Link to={'/'} style={{textDecoration:'none'}}>
              <span className='text-light me-3 fs-3'><FontAwesomeIcon icon={faStackOverflow} /></span>
              <span className='text-light fs-3'>Project fair</span>
           </Link>
          </Navbar.Brand>
          {token && <button className='btn btn-warning ms-auto rounded-0' onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>}
      </Navbar>
    </div>
  )
}

export default Header