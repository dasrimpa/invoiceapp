import React from "react";
import { BsFillArchiveFill } from 'react-icons/bs';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
let iconStyles = { color: "Red", fontSize: "1em" };
class InvoiceForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        id: '',
        total: '',
        qty:'',
        price: '',
        name: ''
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
      id: id,
      name: "",
      price: "",
      total: "",
      qty: "",
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
<h1 class="heading">Invoice Product Items</h1>
     
        <table className="table table-bordered">
          <thead>
            <tr>
            <th class="text-center">Product ID</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Price</th>
              <th class="text-center">Total</th>
              <th class="text-center">Remove Product</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>
        </table>
       
        <Link to="/invoice-add">
        <button type="button" className="btn btn-success" onClick={this.props.onRowAdd}>ADD More Product</button>
        </Link>
        


        <div class="row clearfix">
    <div class="pull-right col-md-4">
      <table class="table table-bordered table-hover" id="tab_logic_total">
        <tbody>
        <tr>
            <th class="text-center">Customer ID</th>
            <td class="text-center"><input type="text" name='customerid' placeholder='Enter Customer ID' class="form-control" id="customerid" readonly/></td>
          </tr>
          <tr>
            <th class="text-center">Sub Total</th>
            <td class="text-center"><input type="number" name='sub_total' placeholder='0.00' class="form-control" id="sub_total" readonly/></td>
          </tr>
          <tr>
            <th class="text-center">Discount</th>
            <td class="text-center"><div class="input-group mb-2 mb-sm-0">
                <input type="number" class="form-control" id="discount" placeholder="0"/>
                <div class="input-group-addon">%</div>
              </div></td>
          </tr>
          <tr>
            <th class="text-center">Grand Total</th>
            <td class="text-center"><input type="number" name='total_amount' id="total_amount" placeholder='0.00' class="form-control" readonly/></td>
          </tr>
        </tbody>
      </table>
      <button type="button" className="btn btn-success" class="btn btn-success invoiceadd">ADD</button>
    </div>
   
</div>
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
          "type": "num",
          value: this.props.product.num,
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
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} class="form-control" />
      </td>
    );

  }

}
export default InvoiceForm;
