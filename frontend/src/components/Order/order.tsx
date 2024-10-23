import { useState } from 'react';
import "./order.css";
import Sidebar from '../Sidebar/sidebar';
import Popup from '../Popup/popup';
import { useNavigate } from 'react-router-dom';


interface OrderItem {
  id: number;
  productName: string;
  quantity: string;
  price: number;
}



function Order() {
  const navigate = useNavigate(); // Use useNavigate here



  const [tableData, setTableData] = useState([
    { id: 1, productName: 'Mark', quantity: '15', price: 35 },
    { id: 2, productName: 'Jacob', quantity: '15', price: 50},
    { id: 3, productName: 'John', quantity: '15', price: 35 },
    { id: 4, productName: 'Wick', quantity: '15', price: 50 }
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null); // Updated type here

  const handleAddClick = () => {
    setPopupTitle('Add Order');
    setSelectedItem(null);
    setIsPopupOpen(true);
  };

  const handleEditClick = (item: OrderItem) => {
    setPopupTitle('Edit Order');
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Sidebar />
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="ps-4 borderTable">
          <div className='d-flex justify-content-between align-items-center'>

            <button onClick={() => navigate('/dashboard')}>back  </button>
            <h1>Order</h1>
            <button className="btn btn-primary ms-auto me-4">Save</button>
          </div>
          <div className='heading d-flex justify-content-between align-items-center'>
            Customer Name
            <input type="text" className='ms-auto me-4 mt-2' />
          </div>
          <div className='heading d-flex justify-content-between align-items-center '>
            Total Quantity
            <input type="text" className='ms-auto me-4 mt-2' readOnly />

          </div>
          <div className='heading d-flex justify-content-between align-items-center'>
            Total Price
            <input type="text" className='ms-auto me-4 mt-2 borderradius-2' readOnly />

          </div>

          <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-primary ms-auto me-4" onClick={handleAddClick}>Add</button>
          </div>
          <table className="table table-bordered mt-2 ">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                  <button className="btn btn-secondary" onClick={() => handleEditClick(item)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       {/* Popup for Add/Edit Order */}
       <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title={popupTitle}>
        <div className="mb-3">
          <input type="text" placeholder="Product Name" className="form-control mb-2" defaultValue={selectedItem?.productName || ''} />
          <input type="number" placeholder="Quantity" className="form-control mb-2" defaultValue={selectedItem?.quantity || ''} />
          <input type="number" placeholder="Price" className="form-control mb-2" defaultValue={selectedItem?.price || ''} />
        </div>
        <button className="btn btn-primary">Save Order</button>
      </Popup>
    </>
  );
}

export default Order;
