import React from "react";
import { Route, Routes } from "react-router-dom";

import Main_Page from "./Components/Pages/Main_Page";
import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";
import Ip_Page from "./Components/Pages/Ip_Page";
import Contagent_Page from "./Components/Pages/Contagent_Page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main_Page />} />
          <Route path="/ip" element={<Ip_Page />} />
          <Route path="/contractors" element={<Contagent_Page />} />
          <Route path="/documents" element={<Main_Page />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
