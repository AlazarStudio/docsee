import React from "react";
import Header from "../Blocks/Header/Header";
import AddDocuments from "../Blocks/AddDocuments/AddDocuments";
import Documents from "../Blocks/Documents/Documents";

function Documents_Page({ children, ...props }) {
    return (
        <>
            <Header active={'Документы'} />
            {/* <AddDocuments/> */}
            <Documents/>
        </>
    );
}

export default Documents_Page;
