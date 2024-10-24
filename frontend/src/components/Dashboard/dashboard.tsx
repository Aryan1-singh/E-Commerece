import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Sidebar from '../Sidebar/sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Order {
  id: number;
  customerName: string;
  totalQuantity: number;
  totalPrice: number;
}



function Dashboard() {
  const navigate = useNavigate(); 
  const [orders, setOrders] = useState<Order[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/orders');
        setOrders(response.data); 
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);  
      }
    };

    fetchOrders();  
  }, []);

 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/";
    }
  }, [navigate]);

  const handleDeleteClick = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8000/orders/${id}`);
      if (response.status === 200) {
        setOrders(orders.filter(order => order.id !== id));
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


  return (
    <>
      <Sidebar />

      <div className={`container-fluid `}>
        <div className="row">
          <div className="col-md-2">

          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-end mt-5">
              <button className="btn btn-primary " onClick={() => navigate('/order')} 
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
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                      <tr key={order.id}>
                        <th scope="row">{order.id}</th>
                        <td>{order.customerName}</td>
                        <td>{order.totalQuantity}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          <button className="btn" onClick={() => handleDeleteClick(order.id)}>
                            <i className="bi bi-trash"></i>
                          </button>
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
