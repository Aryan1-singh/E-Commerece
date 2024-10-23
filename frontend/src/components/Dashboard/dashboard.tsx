import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Sidebar from '../Sidebar/sidebar';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
  const navigate = useNavigate(); // Use useNavigate here


  const [tableData, setTableData] = useState([
    { id: 1, customerName: 'Mark', quantity: 5, price: 35 },
    { id: 2, customerName: 'Jacob', quantity: 10, price: 50 },
    { id: 3, customerName: 'John', quantity: 5, price: 35 },
    { id: 4, customerName: 'Wick', quantity: 10, price: 50 },]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/";
    }
  }, [navigate]);

  return (
    <>
      <Sidebar />

      <div className={`container-fluid `}>
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-end mt-5">
              <button className="btn btn-primary" onClick={() => navigate('/order')} // Inline navigation
              >New Order</button>
            </div>
            <div className="d-flex justify-content-center mt-3">


              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.customerName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>
                        {/* You can add Edit functionality here */}
                        <button className="btn btn-secondary" onClick={() => navigate('/order')}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
