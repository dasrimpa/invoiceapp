import React,{useState, useEffect} from 'react'
import { View } from './View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('products');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const ProductForm = () => {

  // main array of objects state || books state || books array of objects
  const [products, setproducts]=useState(getDatafromLS());

  // input field states
  const [title, setTitle]=useState('');
  const [price, setPrice]=useState('');
  const [id, setId]=useState('');

  // form submit event
  const handleAddBookSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let product={
      title,
      price,
      id
    }
    setproducts([...products,product]);
    setTitle('');
    setPrice('');
    setId('');
  }

  // delete book from LS
  const deleteProduct=(id)=>{
    const filteredProducts=products.filter((element,index)=>{
      return element.id !== id
    })
    setproducts(filteredProducts);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('products',JSON.stringify(products));
  },[products])

  return (
    <div className='wrapper'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
            <label>ID</label>
            <input type="text" className='form-control' required
             onChange={(e)=>setId(e.target.value)} value={id}>
           </input>
            <br></br>
            <label>Product Name</label>
            <input type="text" className='form-control' required
             onChange={(e)=>setTitle(e.target.value)} value={title}
           ></input>
            <br></br>
            <label>Price</label>
            <input type="text" className='form-control' required
             onChange={(e)=>setPrice(e.target.value)} value={price}
            >
           </input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD Product
            </button>
          </form>
        </div>

        <div className='container'>
          {products.length>0&&<>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">Product Name</th>
                    <th class="text-center">Price</th>
                    <th class="text-center">Edit Item</th>
                    <th class="text-center">Remove Item</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <View products={products} deleteProduct={deleteProduct}/>
                </tbody>
              </table>
            </div>
          </>}
          {products.length < 1 && <div>No Products are added yet</div>}
        </div>
    </div>
  )
}

export default ProductForm;