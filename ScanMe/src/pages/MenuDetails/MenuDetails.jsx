
import React from "react";
import ItemDetails from "../../components/ItemDetails/ItemDetails";
import Header from "../../components/Header/Header";

function MenuDetails() {
    const isMenu = true;
 return(
    <>
    <Header isMenu = {isMenu} />
    <ItemDetails />
    </>
 )
}

export default MenuDetails;
