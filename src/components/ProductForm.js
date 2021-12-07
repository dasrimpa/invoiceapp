import React, {useState} from 'react'
function ProductForm(){

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const [user,setUser] = useState(
    {
      name: "", price: ""
    });
    let name, value;
    const handleInputs = (e) => {
      console.log(e);
      name = e.target.name;
      value = e.target.value;

      setUser({
        ...user, [name]:value});
    }
    return (
    
      <div class="form-container">
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label for="name">Product Name</label>
            <input type="text" name="name" class="form-control" 
            value={user.name}
            onChange={handleInputs}
            placeholder="Enter Product Name" required />
          </div>
          <div className="form-group">
            <label for="price">Price</label>
            <input name="price" type="text" class="form-control"
              value={user.price}
            onChange={handleInputs}
             placeholder="Enter Product Price" required/>
          </div>
          <input type="submit" value="Add Product" className="btn btn-primary" />
        </form>
      </div>
    )
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


