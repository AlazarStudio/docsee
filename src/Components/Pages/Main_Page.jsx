import React from "react";
import GenerateDocument from "../Blocks/GenerateDocument/GenerateDocument";
import Header from "../Blocks/Header/Header";

function Main_Page({ children, ...props }) {
    return (
        <>
            <Header />
            <GenerateDocument />
        </>
    );
}

export default Main_Page;