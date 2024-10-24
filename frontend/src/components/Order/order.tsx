import { useEffect, useState } from 'react';
import "./order.css";
import Sidebar from '../Sidebar/sidebar';
import Popup from '../Popup/popup';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/paagination';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';





interface OrderItem {
  orderId: number;
  productName: string;
  quantity: number;
  price: number;
}



function Order() {
  const Base_Url = 'http://localhost:8000/';

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<OrderItem[]>([]);
  const [formData, setFormData] = useState({ productName: '', quantity: 0, price: 0 });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); 
  const [totalQuantity, setTotalQuantity] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);
const [customerName, setCustomerName] = useState(''); 

  



  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/";
    }
  }, [navigate]);

  useEffect(() => {
    const calculateTotals = () => {
      const totalQty = tableData.reduce((sum, item) => sum + item.quantity, 0);
      const totalPr = tableData.reduce((sum, item) => sum + item.price, 0);
      
      setTotalQuantity(totalQty);
      setTotalPrice(totalPr);
    };
  
    calculateTotals();
  }, [tableData]); 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/addorders');
        setTableData(response.data); // Assuming response.data contains the array of order items
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch orders');
      }
    };
  
    fetchData();
  }, []);



  const handleAddClick = () => {
    setPopupTitle('Add Order');
    setFormData({ productName: '', quantity: 0, price: 0 });
    setSelectedItem(null);
    setIsPopupOpen(true);
  };

  const handleEditClick = (item: OrderItem) => {
    setPopupTitle('Edit Order');
    setFormData({ productName: item.productName, quantity: item.quantity, price: item.price });
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleDeleteClick = async (item: OrderItem) => {
    try {
        await axios.delete(`http://localhost:8000/addorders/${item.orderId}`);
        setTableData((prevTableData) =>
            prevTableData.filter((data) => data.orderId !== item.orderId)
        );
    } catch (error) {
        console.error('Error deleting order:', error);
    }
};

  const handleClosePopup =  () => {
    setIsPopupOpen(false);
  };

  const handleSaveClick = async () => {
    if (!formData.productName || !formData.quantity || !formData.price) {
        toast.error("Please fill in all fields");
        return;
    }

    try {
        const response = await axios.post(`${Base_Url}addorders`, {
            productName: formData.productName,
            quantity: formData.quantity,
            price: formData.price
        });

        console.log(response.data);

        if (response.data) {
            const newOrder: OrderItem = {
                orderId: response.data.orderId, 
                productName: formData.productName,
                quantity: formData.quantity,
                price: formData.price
            };

            setTableData((prev) => [...prev, newOrder]); 

            setFormData({ productName: '', quantity: 0, price: 0 });

            toast.success("Order saved successfully!");
            setIsPopupOpen(false); 
        } else {
            toast.error("Failed to save order");
        }
    } catch (error) {
        toast.error("An error occurred while saving the order");
        console.error(error);
    }
};


  
  

  const handleSaveOrderClick = async () => {
    if (!customerName || totalQuantity === 0 || totalPrice === 0) {
      toast.error("Please ensure that the customer name, total quantity, and total price are provided");
      return;
    }

    try {
      const response = await axios.post(`${Base_Url}orders`, {
        customerName,
        totalQuantity,
        totalPrice
      });

      if (response.data) {
        toast.success("Order saved successfully!");

        await axios.delete(`${Base_Url}addorders`);
        // toast.success("Previous orders deleted successfully!");
        navigate('/dashboard');

        setTableData([]);
      } else {
        toast.error("Failed to save order");
      }
    } catch (error) {
      toast.error("An error occurred while saving or deleting the orders");
      console.error(error);
    }
  };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value); 
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <>
      <Sidebar />
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="ps-4 borderTable">
          <div className='d-flex justify-content-between align-items-center'>
            <i className="bi bi-arrow-left backicon" onClick={() => navigate('/dashboard')}></i>
            <span className='order'>Order</span>
            <button className="btn btn-primary ms-auto me-4" onClick={handleSaveOrderClick} >Save</button>
          </div>
          <div className='heading d-flex justify-content-between align-items-center'>
            Customer Name
            <input type="text"
             className='ms-auto me-4 mt-2' 
             value={customerName} 
             onChange={handleCustomerNameChange}
             />
          </div>
          <div className='heading d-flex justify-content-between align-items-center '>
            Total Quantity
            <input type="text" className='ms-auto me-4 mt-2' readOnly value={totalQuantity} />

          </div>
          <div className='heading d-flex justify-content-between align-items-center'>
            Total Price
            <input type="text" className='ms-auto me-4 mt-2 borderradius-2' readOnly value={totalPrice} />

          </div>

          <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-primary ms-auto me-4" onClick={handleAddClick}>Add</button>
          </div>
          <table className="table table-bordered mt-2 ">
            <thead>
              <tr>
                {/* <th scope="col">Id</th> */}
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.orderId}>
                  {/* <th scope="row">{item.orderId}</th> */}
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn " onClick={() => handleEditClick(item)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn " onClick={() => handleDeleteClick(item)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination 
            itemsPerPage={itemsPerPage} 
            totalItems={tableData.length} 
            paginate={paginate} 
            currentPage={currentPage} 
          />
        </div>
      </div>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title={popupTitle}>
        <div className="mb-3">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            className="form-control mb-2"
            value={formData.productName}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="form-control mb-2"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-control mb-2"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSaveClick}>Save Order</button>
      </Popup>
    </>
  );
}

export default Order;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

