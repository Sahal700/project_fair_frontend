import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() {
  const [show, setShow] = useState(false);
  const {setAddResponse}=useContext(addResponseContext)
  const [projectDetails,setProjectDetails] = useState({
    title:'',
    language:'',
    github:'',
    website:'',
    overview:'',
    projectImage:''
  })
  const [preview,setPreview] = useState("")
  const [token,setToken] = useState("")
  const [key,setKey] = useState(1)

  // console.log(projectDetails);
  // console.log(preview);
  // console.log(token);
  
  
  
  const handleFile=(e)=>{
    setProjectDetails({...projectDetails,projectImage:e.target.files[0]})
    // console.log(e.target.files[0]);
    
  }

  const handleCancel =() => {
    setProjectDetails({
      title:'',
      language:'',
      github:'',
      website:'',
      overview:'',
      projectImage:''
    })
    setPreview("")
    if(key==1){
      setKey(0)
    }else{
      setKey(1)
    }
    // console.log(projectImage.value);
    
  }
  const handleClose = () => {
    handleCancel();
    setShow(false);
  }
  const handleShow = () => setShow(true);
  
  const handleAdd =async()=>{
    const {title,language,github,website,overview,projectImage} = projectDetails
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info("please fill the form completely")
    }else{
      const reqBody = new FormData()

      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      if(token){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        const result = await addProjectApi(reqBody,reqHeader)
        // console.log(result);
        if(result.status==200){
          toast.success('Project added successfully')
          setTimeout(() => {
            handleClose()
          }, 2000); 
          setAddResponse(result)
        }
        else if(result.status==406){
          toast.warning(result.response.data)
          handleCancel()
        }else{
          toast.error('something went wrong')
          handleCancel()
        }
        

      }else{
        toast.warning("please login")
      }
    }
  }

  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  return (
    <>
    <button onClick={handleShow} className='btn rounded-0 text-light' style={{backgroundColor:'rgb(62,179,24)'}}>Add Project</button>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col sm={12} md={6}>
                <label htmlFor="projectImage">
                  <input key={key} id='projectImage' className='d-none' type="file" onChange={(e)=>{handleFile(e)}} />
                  <img src={preview?preview:"https://www.svgrepo.com/show/309379/camera-add.svg"} className='w-100' alt="" />
                </label>
              </Col>
              <Col sm={12} md={6}>
              <input type="text" value={projectDetails.title} className="form-control mb-3" placeholder='Title' onChange={(e)=>{setProjectDetails({...projectDetails,title:e.target.value})}} />
              <input type="text" value={projectDetails.language} className="form-control mb-3" placeholder='Language' onChange={(e)=>{setProjectDetails({...projectDetails,language:e.target.value})}} />
              <input type="text" value={projectDetails.github} className="form-control mb-3" placeholder='Github' onChange={(e)=>{setProjectDetails({...projectDetails,github:e.target.value})}}/>
              <input type="text" value={projectDetails.website} className="form-control mb-3" placeholder='Website' onChange={(e)=>{setProjectDetails({...projectDetails,website:e.target.value})}}  />
              <textarea value={projectDetails.overview} rows={5} name="" className='form-control' placeholder='Overview' onChange={(e)=>{setProjectDetails({...projectDetails,overview:e.target.value})}} ></textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
      </Modal>
    </>
  )
}

export default Addproject