import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

export default function footer() {
  return (
    <div>
       <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center  p-3 d-flex justify-content-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' , marginTop:'50px'}}>
        &copy; {new Date().getFullYear()} Copyright &
                <div className='text-dark d-inline' style={{  marginLeft:'5px'}}> 
         Made by : Rajdeep Sharma
        </div>
      </div>
    </MDBFooter>
    </div>
  )
}
