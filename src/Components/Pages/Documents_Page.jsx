import React from "react";
import Header from "../Blocks/Header/Header";
import Documents from "../Blocks/Documents/Documents";

function Documents_Page({ children, ...props }) {
    return (
        <>
            <Header active={'Создать документ'} />
            <Documents/>
        </>
    );
}

export default Documents_Page;
