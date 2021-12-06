import React from "react";
import { BsFillArchiveFill } from 'react-icons/bs';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
let iconStyles = { color: "Red", fontSize: "1em" };
class Invoice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        total: '100000',
        invoiceid:'1120',
        discount: '20%',
        name: '101'
      }, {
        total: '40000',
        invoiceid:'1210',
        discount: '10%',
        name: '102'
      },
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
      invoiceid: "",
      total: "",
      discount: "",
    }
    this.state.products.push(product);
    this.setState(this.state.products);

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
<h1 class="heading">Invoice List</h1>
     
        <table className="table table-bordered">
          <thead>
            <tr>
            <th class="text-center">ID</th>
              <th class="text-center">Customer ID</th>
              <th class="text-center">Discount</th>
              <th class="text-center">Total</th>
              <th class="text-center">Remove Item</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>
        </table>
        <Link to="/invoice-add">
        <button type="button" className="btn btn-success">Create New Invoice</button>
        </Link>
        <button type="button" class="btn btn-success add">Edit Invoice</button>
      </div>
    );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
    alert('Product Deleted Successful');

  }
  render() {
    
    return (
      
      <tr className="eachRow">
       <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "invoiceid",
          value: this.props.product.invoiceid,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>

<EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "discount",
          value: this.props.product.discount,
          id: this.props.product.id
        }}/>


        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "total",
          value: this.props.product.total,
          id: this.props.product.id
        }}/>
     
        <td className="del-cell" class="text-center">
      <BsFillArchiveFill style={iconStyles} onClick={this.onDelEvent.bind(this)}/>
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td class="text-center editcell">
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} class="form-control"/>
      </td>
    );

  }

}
export default Invoice;