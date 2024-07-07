import React, { createContext, useContext, useState } from 'react';

const AddedItemsContext = createContext();

export const useAddedItems = () => {
  return useContext(AddedItemsContext);
};

export const AddedItemsProvider = ({ children }) => {
  const [addedItems, setAddedItems] = useState([]);

  const addItem = (item, count) => {
    setAddedItems(prevItems => {
      const existingItem = prevItems.find(prevItem => prevItem.id === item.id);
      if (existingItem) {
        return prevItems.map(prevItem =>
          prevItem.id === item.id
            ? { ...prevItem, count: prevItem.count + count }
            : prevItem
        );
      }
      return [...prevItems, { ...item, count }];
    });
  };

  const updateItemCount = (itemId, count) => {
    setAddedItems(prevItems =>
      prevItems.map(prevItem =>
        prevItem.id === itemId ? { ...prevItem, count } : prevItem
      )
    );
  };

  const removeItem = (itemId) => {
    setAddedItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const isItemAdded = (itemId) => {
    return addedItems.some(item => item.id === itemId);
  };

  return (
    <AddedItemsContext.Provider value={{ addedItems, addItem, removeItem, isItemAdded, updateItemCount }}>
      {children}
    </AddedItemsContext.Provider>
  );
};
