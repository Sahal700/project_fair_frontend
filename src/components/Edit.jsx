import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';
function Edit({projects}) {
  const [show, setShow] = useState(false);
  const [preview,setPreview] = useState('')
  const [projectDetails,setProjectDetails]=useState({
    title:projects.title,
    language:projects.language,
    github:projects.github,
    website:projects.website,
    overview:projects.overview,
    projectImage:""
  })
  const [key ,setKey] = useState(0)
  const {setEditResponse} = useContext(editResponseContext)
  // console.log(projects);
  // console.log(projectDetails);
  
  
  const handleCancel = () => {
    setProjectDetails({
      title:projects.title,
      language:projects.language,
      github:projects.github,
      website:projects.website,
      overview:projects.overview,
      projectImage:""
    })
    setPreview("")
    if (key==0) {
      setKey(1)
    } else{
      setKey(0)
    }
  }
  const handleClose = () => {
    setShow(false);
    handleCancel
  }
  const handleShow = () => setShow(true);

  const hanldleFile = (e)=>{ 
    setProjectDetails({...projectDetails,projectImage:e.target.files[0]})
  }
  const handleUpdate = async ()=>{
    
    const{title , language , github , website , overview , projectImage} = projectDetails
    if(!title || !language || !github || !website || !overview){
      toast.info("please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",projects.projectImage)
      
      const token = sessionStorage.getItem("token")
      // console.log(token);
      // console.log(reqBody);
      
      if (preview) {
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        const result = await updateUserProjectApi(projects._id,reqBody,reqHeader)
        // console.log(result);
        if (result.status==200) {
          setTimeout(() => {
            handleClose()
          }, 2000);
          toast.success("project updated successfully")
          setEditResponse(result)
        }else{
          handleCancel()
          toast.error("somthing went wrong")
        }
        
      }else{
        const reqHeader = {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
        const result = await updateUserProjectApi(projects._id,reqBody,reqHeader)
        // console.log(result);
        if (result.status==200) {
          setTimeout(() => {
            handleClose()
          }, 2000);
          toast.success("project updated successfully")
          setEditResponse(result)
        }else{
          handleCancel()
          toast.error("somthing went wrong")
        }
      }
    }
  }
  useEffect(()=>{
   if(projectDetails.projectImage){
    setPreview(URL.createObjectURL(projectDetails.projectImage))
   }
  },[projectDetails.projectImage])
  return (
    <>
    <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} className='mx-md-3 mx-2' style={{color:'rgb(160,98,192)'}} />
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <label htmlFor="projectImage">
                  <input id='projectImage'className='d-none' type="file" key={key} onChange={(e)=>{hanldleFile(e)}} />
                  <img src={preview?preview:`${serverUrl}/upload/${projects.projectImage}`} className='w-100' alt="" />
                </label>
              </Col>
              <Col sm={12} md={6}>
              <input type="text" className="form-control mb-3" placeholder='Title' value={projectDetails.title} onChange={(e)=>{
                setProjectDetails({...projectDetails,title:e.target.value})
              }} />
              <input type="text" className="form-control mb-3" placeholder='Language' value={projectDetails.language} onChange={(e)=>{
                setProjectDetails({...projectDetails,language:e.target.value})
              }}/>
              <input type="text" className="form-control mb-3" placeholder='Github' value={projectDetails.github} onChange={(e)=>{
                setProjectDetails({...projectDetails,github:e.target.value})
              }}/>
              <input type="text" className="form-control mb-3" placeholder='Website' value={projectDetails.website} onChange={(e)=>{
                setProjectDetails({...projectDetails,website:e.target.value})
              }}/>
              <textarea rows={5} name="" className='form-control' placeholder='Overview'  value={projectDetails.overview} onChange={(e)=>{
                setProjectDetails({...projectDetails,overview:e.target.value})
              }}></textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Edit