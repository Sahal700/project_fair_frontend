import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
function Footer() {
  return (
    <div className='p-md-5 p-4 bg-success'>
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-3">
            <h5><FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</h5>
            <p style={{textAlign:'justify'}} className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur veritatis quibusdam enim, asperiores deleniti doloremque maxime dolorum nihil? Provident minima quas saepe repudiandae id blanditiis at, culpa molestias assumenda doloremque!</p>
          </div>
          <div className="col-md-3 d-md-flex justify-content-center">
            <div>
              <h5>Links</h5>
              <p className='mt-3'>Home</p>
              <p>Project</p>
              <p>DashBoard</p>
            </div>
          </div>
          <div className="col-md-3 d-md-flex justify-content-center">
            <div>
              <h5>Guides</h5>
              <p className='mt-3'>React</p>
              <p>React bootstrap</p>
              <p>Bootswatch</p>
            </div>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <div className='d-flex mt-3'>
              <input type="text" className='form-control rounded-0' placeholder='Email Id'/>
              <button className='btn btn-warning rounded-0 ms-2'>Subscribe</button>
            </div>
            <div className='d-flex mt-3 justify-content-between'>
              <FontAwesomeIcon icon={faInstagram} className='fa-2x'/>
              <FontAwesomeIcon icon={faXTwitter} className='fa-2x' />
              <FontAwesomeIcon icon={faLinkedin} className='fa-2x' />
              <FontAwesomeIcon icon={faFacebook} className='fa-2x' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer