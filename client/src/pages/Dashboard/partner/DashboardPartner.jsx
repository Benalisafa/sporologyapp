import React from "react";
import {Table} from 'react-bootstrap';
import { PhoneIcon } from "../../../components/Icons";


function DashboardPartner() {

  return (
    <div style={{paddingRight:'5%'}}>
   <h3 className="mt-4">Dashboard</h3>
   <div className="d-flex">
   <aside className="d-flex flex-column ps-4 pt-4" style={{backgroundColor:'var(--bs-light-grey)' , width:'20%'}}>
        <h5> <PhoneIcon/>All activities</h5>
        <br/>
        <h5><PhoneIcon/>Add Activity</h5>
        
    </aside>
   <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@</td>
        </tr>
        
        
      </tbody>
    </Table>
    </div>
    </div>
  );
}

export default DashboardPartner;
