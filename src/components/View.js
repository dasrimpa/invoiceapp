import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {FaUserEdit} from 'react-icons/fa';
import {Link } from "react-router-dom";

export const View = ({products,deleteProduct}) => {
    
    return products.map(product=>(
        
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td className="del-cell" class="text-center edit-btn" >
        <Link to="/product-edit">
      <FaUserEdit />
      </Link>
        </td>
            <td className='delete-btn' onClick={()=>deleteProduct(product.id)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}