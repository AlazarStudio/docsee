import React from "react";
import Header from "../Blocks/Header/Header";
import AddReceivedServices from "../Blocks/AddReceivedServices/AddReceivedServices";

function Contagent_Page({ children, ...props }) {
    return (
        <>
            <Header active={'Получатели услуг'}/>
            <AddReceivedServices/>
        </>
    );
}

export default Contagent_Page;