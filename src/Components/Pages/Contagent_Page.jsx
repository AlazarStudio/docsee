import React from "react";
import Header from "../Blocks/Header/Header";
import AddIP from "../Blocks/AddIP/AddIP";
import AddContragent from "../Blocks/AddContragent/AddContragent";

function Contagent_Page({ children, ...props }) {
    return (
        <>
            <Header active={'Контрагенты'}/>
            <AddContragent/>
        </>
    );
}

export default Contagent_Page;