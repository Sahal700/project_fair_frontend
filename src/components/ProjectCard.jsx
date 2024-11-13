import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import projectPhoto from '../assets/project1.png'
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';


function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: '100%' }} className='mt-4 mt-md-0 shadow border-0'>
      <Card.Img onClick={handleShow} variant="top" src={`${serverUrl}/upload/${project?.projectImage}`} height={'220px'}/>
      <Card.Body>
        <Card.Title className='text-center'>{project?.title}</Card.Title> 
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container-fluid'>
            <div className='row'>
              <div className="col-md-6">
                <img src={`${serverUrl}/upload/${project?.projectImage}`} alt="" className='w-100'/></div>
              <div className="col-md-6">
                <h5>Description</h5>
                <p>{project?.overview}</p>
                <h5>Technologies</h5>
                <p>{project?.language}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex me-auto ms-3">
          <Link to={project?.github} target='_blamk'><FontAwesomeIcon icon={faGithub} className='me-3 fa-2x'/></Link>
          <Link to={project?.website} target='_blamk'><FontAwesomeIcon icon={faLink} className='fa-2x'/></Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard