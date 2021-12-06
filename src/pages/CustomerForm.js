import React from 'react'
class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      name: '',
      address:'',
      phone:''
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
    alert('Customer Added Successful');
    event.preventDefault();
  }


  render() {
    return (
    
      <div class="form-container">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label for="name">Customer Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} class="form-control" placeholder="Enter Customer Name" required/>
          </div>
          <div className="form-group">
            <label for="address">Address</label>
            <input name="address" type="text" value={this.state.address} onChange={this.handleChange} class="form-control" placeholder="Enter Address" required/>
          </div>
          <div className="form-group">
            <label for="contactno">Contact No</label>
            <input name="phone" type="text" value={this.state.phone} onChange={this.handleChange} class="form-control"  placeholder="Enter Contact No" required/>
          </div>
          <input type="submit" value="Add Customer" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  render(){
    return(
      <div>
        <CustomerForm/>
      </div>
    )
  }
}
export default CustomerForm;

