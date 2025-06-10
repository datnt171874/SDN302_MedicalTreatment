import React from "react";
import LoginPage from "./LoginPage";
import { Route, Routes } from "react-router-dom";
import Logout from "../components/Logout";

function Home() {
  return (
    <>Home <br/>
    <Logout/>
    </>
    
);
}

export default Home;
