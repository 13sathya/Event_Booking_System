import React, {useState} from 'react'
import {Modal, Button, Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Hall({hall,fromdate, todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row bs'>
        
         <div className='col-md-5' >
            <img src={hall.imageurls[0]} className='smallimg' height={300} width={300}/>
         </div>
         <div className='col-md-6 mt-2 bt'>
            <h1 >{hall.name}</h1>
            <p>{hall.facilities}</p>
            <p><b>Type : </b>{hall.type}</p>
           <p> <b>Capacity : </b> {hall.capacity }</p>
           <p><b>Amount : </b>{hall.amount}</p>
           <p><b>Mobile Number : </b>{hall.phonenumber}</p>

           <div style={{float:'right'}}>
            
            {(fromdate && todate) && (
              <Link to={`/book/${hall._id}/${fromdate}/${todate}`}>
            <button className='btn'>Book Now</button>
            </Link >
            )}
            
            <button className='btn' onClick={handleShow}>View Details</button>
           </div>
         </div>
         

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{hall.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel data-bs-theme="dark" prevLabel='' nextLabel='' >
      
        {hall.imageurls.map(url=>{
          return <Carousel.Item>
          <img
            className="d-block w-100 bigimg"
            src={url}
            
          />
          {/* <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        })}
      
    </Carousel>
    <p>{hall.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Hall
