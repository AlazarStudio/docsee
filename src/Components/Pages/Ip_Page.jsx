import React from "react";
import Header from "../Blocks/Header/Header";
import AddIP from "../Blocks/AddIP/AddIP";

function Ip_Page({ children, ...props }) {
    return (
        <>
            <Header active={'ИП'}/>
            <AddIP />
        </>
    );
}

export default Ip_Page;