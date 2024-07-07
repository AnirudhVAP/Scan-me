import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAddedItems } from '../context/AddedItemsContext';
import { icons } from "../../assets/icons/icons";
import Hambermenuoptions from '../Hambermenuoptions/Hambermenuoptions';
import './AddedItems.css';

const AddedItems = () => {
  const { addedItems, removeItem, updateItemCount } = useAddedItems();
  const navigate = useNavigate();

  const [option, setOption] = useState(false);
  const handleMenuoption = () => {
    setOption(true);
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleItemClick = (id) => {
    navigate(`/menu/${id}`);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateItemCount(id, quantity);
    }
  };

  // Calculate the total cost with additional checks and logging
  const totalCost = addedItems.reduce((acc, item) => {
    // Ensure price is a valid number
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    const count = parseInt(item.count, 10);

    // Log the values to debug
    console.log(`Item: ${item.name}, Price: ${price}, Count: ${count}`);

    if (!isNaN(price) && !isNaN(count)) {
      return acc + (price * count);
    } else {
      console.warn(`Invalid price or count for item: ${item.name}`);
      return acc;
    }
  }, 0);

  return (
    <>
      <div className="header">
        {option ? <></> : <img src={icons.menuicon} alt="Menu" onClick={handleMenuoption} className="menu-icon" />}
        {option && (<Hambermenuoptions setopt={setOption} />)}
        <div className="items-details-navbar-name">France Restaurant</div>
        <img src={icons.home_icon} onClick={() => navigate('/')} alt="Filter" className="home-icon" />
      </div>

      <div className="added-items">
        <h3 style={{ textAlign: "center" }}>Call the waiter to tell your order</h3>
        <h2>Added Items</h2>
        {addedItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul>
            {addedItems.map((item, index) => (
              <li key={index}>
                <div className="added-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="added-item-image"
                    onClick={() => handleItemClick(item.id)}
                  />
                  <div
                    className="added-item-info"
                    onClick={() => handleItemClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h3 className="added-item-name">{item.name}</h3>
                    <p className="added-item-price">{item.price}</p>
                    <div className="quantity-controls">
                      <span>Quantity X{item.count}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="total-cost">
          <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
        </div>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </>
  );
};

export default AddedItems;
