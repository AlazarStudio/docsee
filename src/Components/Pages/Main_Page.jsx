import React from "react";
import GenerateDocument from "../Blocks/GenerateDocument/GenerateDocument";

function Main_Page({ children, ...props }) {
    return (
        <>
            <div className="App">
                <GenerateDocument />
            </div>
        </>
    );
}

export default Main_Page;