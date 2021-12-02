import React from "react";
import { BsFillArchiveFill } from 'react-icons/bs';
let iconStyles = { color: "Red", fontSize: "1em" };
class Customer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        id: 1,
        category: 'HOWRAH',
        price: '7898767898',
        name: 'RIMPA DAS'
      }, {
        id: 2,
        category: 'KOLKATA',
        price: '9867543567',
        name: 'DEBJIT DAS'
      }, {
        id: 3,
        category: 'MANDIRTOLA',
        price: '7076476567',
        name: 'RIM DAS'
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
      id: id,
      name: "",
      price: "",
      category: "",
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
<h1 class="heading">Customer Details</h1>
     
        <table className="table table-bordered">
          <thead>
            <tr>
              <th class="text-center">Customer Name</th>
              <th class="text-center">Address</th>
              <th class="text-center">Contact No</th>
              <th class="text-center">Remove Item</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>
        </table>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success">Add Product</button>
      </div>
    );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {
    
    return (
      
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "category",
          value: this.props.product.category,
          id: this.props.product.id
        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
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
export default Customer;