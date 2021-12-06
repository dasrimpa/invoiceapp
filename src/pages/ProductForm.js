import React from 'react'
class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      name: '',
      price:'',
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
    console.log('Change detected. State updated' + name + ' = ' + value);
  }

  handleSubmit(event) {
    alert('Product Added Successful');
    event.preventDefault();
  }


  render() {
    return (
    
      <div class="form-container">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label for="name">Product Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} class="form-control" placeholder="Enter Product Name" required />
          </div>
          <div className="form-group">
            <label for="price">Price</label>
            <input name="price" type="text" value={this.state.address} onChange={this.handleChange} class="form-control" placeholder="Enter Product Price" required/>
          </div>
          <input type="submit" value="Add Product" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  render(){
    return(
      <div>
        <ProductForm/>
      </div>
    )
  }
}
export default ProductForm;


