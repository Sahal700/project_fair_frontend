import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'


function Dashboard() {
  const [username,setUsername]=useState("")

  useEffect(()=>{
    if (sessionStorage.getItem("existingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  },[])
  return (
    <>
    <Header/>
    <div className='p-4'>
      <h3>welcome <span className='text-warning'>{username}</span></h3>
      <Container>
        <Row className='mt-5'>
          <Col sm={12} md={8} ><Myproject/></Col>
          <Col sm={12} md={4} ><Profile/></Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Dashboard