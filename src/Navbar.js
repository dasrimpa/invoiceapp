import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceForm from "./components/InvoiceForm";
import Product from "./pages/Product";
import ProductForm from "./components/ProductForm";
import Customer from "./pages/Customer";
import CustomerForm from "./components/CustomerForm";

export default function Navbar() {
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
            <li>  <Link to="/product">Product</Link></li>
            <li><Link to="/invoice">Invoice</Link></li>
            <li><Link to="/customer">Customer</Link></li>
          </ul>
        </div>
      
      </div>
    </nav>

          <Routes>
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/invoice-add" element={<InvoiceForm />} />
            <Route path="/invoice-edit" element={<InvoiceForm />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product-add" element={<ProductForm />} />
            <Route path="/product-edit" element={<ProductForm />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer-add" element={<CustomerForm />} />
            <Route path="/customer-edit" element={<CustomerForm />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}
