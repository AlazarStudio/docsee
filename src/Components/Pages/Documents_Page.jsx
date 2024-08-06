import React from "react";
import Header from "../Blocks/Header/Header";
import AddDocuments from "../Blocks/AddDocuments/AddDocuments";

function Documents_Page({ children, ...props }) {
    return (
        <>
            <Header active={'Документы'} />
            <AddDocuments/>
        </>
    );
}

export default Documents_Page;
