import React from "react";
import { BsFillArchiveFill } from 'react-icons/bs';
import {FaUserEdit} from 'react-icons/fa';
import {Link } from "react-router-dom";

class Product extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        price: '50000',
        name: 'DELL LAPTOP',
        productid: '123'
      }, {
        price: '30000',
        name: 'HP LAPTOP',
        productid: '124'
      }, {
        price: '70000',
        name: 'LENOVO LAPTOP',
        productid: '125',
      }
    ];

  }
 
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      name: "",
      price: "",
      productid:"",
    }
    this.state.products.push(product);
    this.setState(this.state.products);

  }
  handleSubmit(event) {
    alert('Product Added Successful');
    event.preventDefault();
  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    
var products = this.state.products.slice();
  var newProducts = products.map(function(product) {

    for (var key in product) {
      if (key == item.name && product.id == item.id) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
  };
  
  render() {
   
    return (
      <div>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
      </div>
    );

  }

}

class ProductTable extends React.Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });
    return (
      <div class="container">
<h1 class="heading">Product List</h1>
     
        <table className="table table-bordered">
          <thead>
            <tr>
            <th class="text-center">ID</th>
              <th class="text-center">Product Name</th>
              <th class="text-center">Price</th>
              <th class="text-center">Edit Item</th>
              <th class="text-center">Remove Item</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>
        </table>
        <Link to="/product-add">
        <button type="button" className="btn btn-success">Add Product</button>
        </Link>
      </div>
    );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
    alert('Product Deleted');

  }
  render() {
    
    return (
      
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "productid",
          value: this.props.product.productid,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }}/>
      
      
        <td className="del-cell" class="text-center edit-btn" >
        <Link to="/product-edit">
      <FaUserEdit />
      </Link>
        </td>
       
        <td className="del-cell" class="text-center" >
      <BsFillArchiveFill class="delete-btn" onClick={this.onDelEvent.bind(this)} />
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td class="text-center editcell">
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} />
      </td>
    );

  }

}
export default Product;