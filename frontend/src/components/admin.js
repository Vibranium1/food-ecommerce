import React,{useState} from 'react'
import Navbar from "./navbar"
import Products from "./productlisting"
import Footer from "./footer";

export default function Admin() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [categoryName, setCategoryName] = useState(""); 
    const [parentCategory, setParentCategory] = useState(""); 
    const [sizes, setSizes] = useState({
        Half: "",
        Full: "",
      });

      const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setSizes((prevSizes) => ({ ...prevSizes, [name]: value }));
      };
    
      const addFoodProduct = async (e) => {
        
        if (!title || !desc || !img || !categoryName || !sizes.Half || !sizes.Full) {
            alert("All fields are required!");
            return;
          }
          console.log(desc,img, "from frontend")
        const foodData = {
          title,
          desc,
          img,
          categoryName,
          parentCategory,
          sizes: {
            Half: parseFloat(sizes.Half),
            Full: parseFloat(sizes.Full),
          },
        };
    
        try {
          const response = await fetch("http://localhost:5000/api/food/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(foodData),
          });
    
          const result = await response.json();
          if (response.ok) {
            alert("Food product added successfully!");
          } else {
            alert(result.message || "Something went wrong!");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Server error3");
        }
      };
    
  return (
    <div>
        <Navbar/>
      
      <div className='mt-5 container'>
      <h2>Create Food Product</h2>
      <form onSubmit={addFoodProduct} >
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}}
    placeholder='Enter title'
    aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">Description</label>
    <input type="text" className="form-control" id="desc"
    placeholder='Enter description' value={desc} onChange={(e)=>{setDesc(e.target.value)}} />
  </div>
  <div className="mb-3">
    <label htmlFor="img" className="form-label">Image URL</label>
    <input type="text" className="form-control" id="img"
    placeholder='Enter image url' value={img} onChange={(e)=>{setImg(e.target.value)}} />
  </div>

  <div className="mb-3">
    <label htmlFor="categoryName" className="form-label">Category Name</label>
    <input
      type="text"
      className="form-control"
      id="categoryName"
      placeholder="Enter category name"
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
    />
  </div>


  <div className="mb-3">
    <label htmlFor="parentCategory" className="form-label">Parent Category (Optional)</label>
    <input
      type="text"
      className="form-control"
      id="parentCategory"
      placeholder="Enter parent category (if any)"
      value={parentCategory}
      onChange={(e) => setParentCategory(e.target.value)}
    />
  </div>



  <div className="mb-3">
          <label htmlFor="sizeHalf" className="form-label">Half (in rupees)</label>
          <input
            type="number"
            className="form-control"
            id="sizeHalf"
            name="Half"
            value={sizes.Half}
            onChange={handleSizeChange}
            placeholder="Enter price for half size"
          />
        </div>

       

        <div className="mb-3">
          <label htmlFor="sizeFull" className="form-label">Full (in rupees)</label>
          <input
            type="number"
            className="form-control"
            id="sizeFull"
            name="Full"
            value={sizes.Full}
            onChange={handleSizeChange}
            placeholder="Enter price for full size"
          />
        </div>

 <button type="submit" className="btn btn-primary">Add Food Product</button> 
  
</form>


    </div>

    <Products/>
    <Footer/>

    </div>
  )
}
