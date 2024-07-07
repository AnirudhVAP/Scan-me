import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { menuItems } from "../../assets/pictures/pictures";
import { useAddedItems } from "../context/AddedItemsContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ItemDetails.css";
import PopupComponent from "../PopupComponent/PopupComponent";
import forkIcon from "../../assets/icons/fork.png";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const initialItemIndex = menuItems.findIndex((item) => item.id === parseInt(id));
  const [itemIndex, setItemIndex] = useState(initialItemIndex);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { addItem, isItemAdded, updateItemCount, addedItems } = useAddedItems();
  const [popUp, setPopup] = useState(false);
  const [selectedCombination, setSelectedCombination] = useState(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [itemIndex]);

  useEffect(() => {
    const currentItem = addedItems.find(item => item.id === menuItems[itemIndex].id);
    setCount(currentItem ? currentItem.count : 1);
  }, [itemIndex, addedItems]);

  useEffect(() => {
    const arrowTimer = setInterval(() => {
      setShowArrows(true);
      setTimeout(() => {
        setShowArrows(false);
      }, 3000);
    }, 15000);

    return () => clearInterval(arrowTimer);
  }, []);

  useEffect(() => {
    const combinationsList = document.querySelector('.combinations-list');
    if (combinationsList) {
      combinationsList.scrollLeft = 0; // Ensure the scroll starts from the beginning
    }
  }, [menuItems[itemIndex]]);

  const handleAddItem = () => {
    if (isItemAdded(menuItems[itemIndex].id)) {
      updateItemCount(menuItems[itemIndex].id, count);
      toast.info(`${menuItems[itemIndex].name} quantity updated!`);
    } else {
      addItem(menuItems[itemIndex], count);
      toast.success(`${menuItems[itemIndex].name} added to the cart!`);
    }
  };

  const handleNavigate = () => {
    navigate("/added-items");
  };

  const handleCombinationClick = (combination) => {
    const combinationItem = menuItems.find(
      (menuItem) => menuItem.name === combination
    );
    if (combinationItem) {
      setSelectedCombination(combinationItem);
      setPopup(true);
    }
  };

  const handleSwipeChange = (index) => {
    setItemIndex(index);
  };

  const handleNextItem = () => {
    setItemIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
  };

  const handlePreviousItem = () => {
    setItemIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length);
  };

  const handleQuantityIncrement = () => {
    setCount((c) => c + 1);
  };

  const handleQuantityDecrement = () => {
    if (count > 1) {
      setCount((c) => c - 1);
    }
  };

  const getVisibleDots = () => {
    const totalItems = menuItems.length;
    const maxDots = 5;
    if (totalItems <= maxDots) return [...Array(totalItems).keys()];

    const half = Math.floor(maxDots / 2);
    if (itemIndex <= half) return [...Array(maxDots).keys()];
    if (itemIndex >= totalItems - half - 1)
      return [...Array(maxDots).keys()].map((i) => totalItems - maxDots + i);

    return [...Array(maxDots).keys()].map((i) => itemIndex - half + i);
  };

  const renderPaginationDots = () => {
    const visibleDots = getVisibleDots();
    return (
      <div className="pagination-dots">
        {visibleDots.map((index) => (
          <span
            key={index}
            className={`dot ${index === itemIndex ? "active" : ""}`}
            onClick={() => setItemIndex(index)}
          ></span>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!menuItems[itemIndex]) {
    return <div>Item not found</div>;
  }

  return (
    <div className="temp-div">
      <div className={`menu-details ${loaded ? "loaded" : ""}`}>
        <SwipeableViews
          index={itemIndex}
          onChangeIndex={handleSwipeChange}
          containerStyle={{ height: '100%', width: '100%' }}
          axis="x"
          resistance
          enableMouseEvents
        >
          {menuItems.map((item) => (
            <div className="menu-details-content" key={item.id}>
              <div className="menu-details-inner">
                <h2 className="menu-details-name">{item.name}</h2>
                <div className="menu-details-content-info">
                  <p className="menu-details-calories">{item.calories}</p>
                  <p className="menu-details-bsp"> &nbsp; | &nbsp; </p>
                  <p className="menu-details-price">{item.price}</p>
                </div>

                <div className="menu-details-image-container">
                  {item.video && (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="menu-details-video"
                    />
                  )}

                  {!item.video && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-details-image"
                    />
                  )}
                </div>

                <p className="menu-details-desc">{item.desc}</p>
                <div className="menu-details-buttons">
                  <button className="menu-details-button" onClick={handleAddItem}>
                    Add
                  </button>
                  <button className="menu-details-button" onClick={handleNavigate}>
                    Go to cart
                  </button>
                </div>
                <div className="quantity-buttons">
                  <img
                    src={forkIcon}
                    alt="Decrease"
                    className="fork-icon left"
                    onClick={handleQuantityDecrement}
                  />
                  <div className="plate-icon">
                    <span className="quantity-number">{count}</span>
                  </div>
                  <img
                    src={forkIcon}
                    alt="Increase"
                    className="fork-icon right"
                    onClick={handleQuantityIncrement}
                  />
                </div>
              </div>
            </div>
          ))}
        </SwipeableViews>

        {/* Conditionally render arrows for swiping */}
        {itemIndex > 0 && (
          <div className={`swipe-arrow swipe-arrow-left ${showArrows ? "visible" : ""}`} onClick={handlePreviousItem}>
            &#9664;
          </div>
        )}
        {itemIndex < menuItems.length - 1 && (
          <div className={`swipe-arrow swipe-arrow-right ${showArrows ? "visible" : ""}`} onClick={handleNextItem}>
            &#9654;
          </div>
        )}
      </div>

      {/* Pagination Dots below the black container */}
      {renderPaginationDots()}

      {menuItems[itemIndex].combinations && (
        <div className="item-combinations">
          <h1 className="combinations-header">Best Combinations</h1>
          <p className="combinations-header">
            These are some best combinations with your {menuItems[itemIndex].name}
          </p>
          <div className="combinations-list-container">
            <div className="combinations-list">
              {menuItems[itemIndex].combinations.map((combination, index) => {
                const combinationItem = menuItems.find(
                  (menuItem) => menuItem.name === combination
                );
                return (
                  <div
                    key={index}
                    className="combination-item"
                    onClick={() => handleCombinationClick(combination)}
                    style={{ cursor: "pointer" }}
                  >
                    <h3 className="combination-item-name">{combinationItem.name}</h3>
                    <img
                      src={combinationItem.image}
                      alt={combinationItem.name}
                      className="combination-item-image"
                    />
                    <h4 className="combination-item-price">{combinationItem.price}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {popUp && selectedCombination && (
        <PopupComponent setPopup={setPopup} combinationItem={selectedCombination} />
      )}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ItemDetails;
