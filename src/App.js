import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Invoice from "./Invoice";
import Product from "./Product";
import Customer from "./Customer";


export default function App() {
  return (
    <BrowserRouter>
        <div>
        <nav class="navbar navbar-default navbar-static-top">
      <div class="nav-container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand app-logo" href="#">Invoice App</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-center">
            <li>  <Link to="/">Product</Link></li>
            <li><Link to="/invoice">Invoice</Link></li>
            <li><Link to="/customer">Customer</Link></li>
          </ul>
        </div>
      </div>
    </nav>

          <Routes>
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/" element={<Product />} />
            <Route path="/customer" element={<Customer />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}
