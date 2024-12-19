import React, { useState, useEffect } from "react";

export default function Productlisting({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [selectedSize, setSelectedSizes] = useState([]);
  const [price, setPrice] = useState(0);
  const [facets, setFacets] = useState({});
  const [totalPages, setTotalPages] = useState(0); 
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  // const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7; // Show only 6 products per page
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    desc: "",
    img: "",
    sizes: { Half: "", Full: "" },
  }); 

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = searchTerm
        ? "http://localhost:5000/api/search" 
        : "http://localhost:5000/api/food/foodproducts"; 

      const requestBody = searchTerm
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchTerm, filters, limit: 10 }),
          }
        : { method: "GET" }; 

      try {
        const response = await fetch(apiUrl, requestBody);
        const data = await response.json();

        if (apiUrl === "http://localhost:5000/api/food/foodproducts") {
          setProducts(data || []);
        } else {
          setProducts(data.products);
        }
        
        setFacets(data.facets || {});
        setTotal(data.total || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    setIsInitialLoad(false);
  }, [searchTerm, filters]);

  const handleSizeChange = (product, e) => {
    const selected = e.target.value;
    setSelectedSizes((prev) => ({
      ...prev,
      [product._id]: selected,
    }));

    const selectedPrice = product.sizes[selected];
    setPrice(selectedPrice);
    setSelectedProduct(product);
  };

  // Calculate pagination values
  const totalProducts = products.length;
  useEffect(() => {
    const total = Math.ceil(products.length / productsPerPage);
    setTotalPages(total);
  }, [products, productsPerPage]);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page); 
    setCurrentPage(page);

    console.log("Current Page:", currentPage);
console.log("Current Products:", currentProducts);

  };

    // Get the current page's products
    const currentProducts = products.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );

  // useEffect(() => {
  //   setCurrentPage(1); // Reset to first page if products change
  // }, [products]);
  
  
  const renderPagination = () => (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mt-4">
        
        {/* Previous Button */}
      <li
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
        
        {Array.from({ length: totalPages }, (_, index) => (

          



          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>


      </ul>
    </nav>
  );



  const handleUpdateProduct = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const updatedProduct = { ...editData };
    try {
      const response = await fetch(
        `http://localhost:5000/api/food/update/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        const updatedProductData = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProductData._id
              ? updatedProductData
              : product
          )
        );
        alert("Product updated successfully!");
        window.location.reload();
        setIsEditing(false);
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/food/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  console.log("products", products)
  const renderProducts = () => {
    if (products.length === 0) {
      return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>No Products Available</p>
        </div>
      );
    }


    if (searchTerm) {
      // When a search term is provided, don't group by category
      return (
        <div className="container mt-4">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 " key={product._id}>
                <div className="card container" style={{ height: "30rem" }}>
                  <img
                    className="card-img-top"
                    src={product.img || "https://via.placeholder.com/150"}
                    alt="image"
                    width={"200px"}
                    height={"200px"}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <span className="card-text">{product.desc}</span>
                    <div className=" card-text d-flex align-items-center" style={{marginTop:"0px",paddingTop:"0px"}}>
                      <label htmlFor="size" style={{paddingTop:"0px"}}>Select Quantity:</label>
                      <select
                        id="size"
                        className="form-control"
                        style={{ width: "130px", marginLeft: "10px" }}
                        value={selectedSize[product._id] || ""}
                        onChange={(e) => handleSizeChange(product, e)}
                      >
                        <option value="">Select Size</option>
                        {product.sizes &&
                          Object.keys(product.sizes).map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                      </select>
                    </div>
                    {selectedSize[product._id] && selectedProduct === product && (
                      <div className="mt-2">
                        <h6>Price: ₹{price}</h6>
                      </div>
                    )}
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary mt-2 px-3">Add to Cart</button>
                    </div>
                    {isAdmin && (
                      <div className="mt-3">
                        <button
                          className="btn btn-warning mr-2"
                          onClick={() => {
                            setIsEditing(true);
                            setSelectedProduct(product);
                            setEditData({
                              title: product.title,
                              desc: product.desc,
                              category:product.category,
                              img: product.img,
                              sizes: product.sizes,
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteProduct(product._id)}
                          style={{ marginLeft: "10px" }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    

    // if (searchTerm) {
    //   // When a search term is provided, don't group by category
    //   return products.map((product) => (
    //     <div className=" container mt-4"  key={product._id}>
    //        <div className="row">
    //       <div className=" col" style={{ width: "22rem", height: "30rem" }}>
    //         <img
    //           className="card-img-top"
    //           src={product.img || "https://via.placeholder.com/150"}
    //           alt="image"
    //           width={200}
    //           height={200}
    //           style={{ objectFit: "cover" }}
    //         />
    //         <div className="card-body">
    //           <h5 className="card-title">{product.title}</h5>
    //           <p className="card-text">{product.desc}</p>
    //           <div className="form-group d-flex align-items-center">
    //             <label htmlFor="size">Select Quantity:</label>
    //             <select
    //               id="size"
    //               className="form-control"
    //               style={{ width: "130px", marginLeft: "10px" }}
    //               value={selectedSize[product._id] || ""}
    //               onChange={(e) => handleSizeChange(product, e)}
    //             >
    //               <option value="">Select Size</option>
    //               {product.sizes &&
    //                 Object.keys(product.sizes).map((size) => (
    //                   <option key={size} value={size}>
    //                     {size}
    //                   </option>
    //                 ))}
    //             </select>
    //           </div>

    //           {selectedSize[product._id] && selectedProduct === product && (
    //             <div className="mt-2">
    //               <h6>Price: ₹{price}</h6>
    //             </div>
    //           )}

    //           <div className="d-flex justify-content-center">
    //             <button className="btn btn-primary mt-2 px-3">Add to Cart</button>
    //           </div>

    //           {isAdmin && (
    //             <div className="mt-3">
    //               <button
    //                 className="btn btn-warning mr-2"
    //                 onClick={() => {
    //                   setIsEditing(true);
    //                   setSelectedProduct(product);
    //                   setEditData({
    //                     title: product.title,
    //                     desc: product.desc,
    //                     img: product.img,
    //                     sizes: product.sizes,
    //                   });
    //                 }}
    //               >
    //                 Edit
    //               </button>
    //               <button
    //                 className="btn btn-danger"
    //                 onClick={() => handleDeleteProduct(product._id)}
    //                 style={{ marginLeft: "155px" }}
    //               >
    //                 Delete
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //      </div></div>
    //     </div>
    //   ));
    // }

    // When no search term is provided, group by category
    const groupedProducts = currentProducts.reduce((acc, product) => {
      const categoryName = product.category?.name || "Uncategorized";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    }, {});

    return Object.keys(groupedProducts).map((category) => (
      <div key={category} className="container">
        <h3>{category}</h3>
        <div className="row">
          {groupedProducts[category].map((product) => (
            <div className="col-md-4" key={product._id}>
              <div className="card mb-4" style={{ width: "22rem", height: "28rem" }}>
                <img
                  className="card-img-top"
                  src={product.img || "https://via.placeholder.com/150"}
                  alt="image"
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.desc}</p>
                  <div className="form-group d-flex align-items-center" style={{marginTop:"0px", paddingTop:"0px"}}>
                    <label htmlFor="size">Select Quantity:</label>
                    <select
                      id="size"
                      className="form-control"
                      style={{ height:"35px",width: "65px", marginLeft: "10px" }}
                      value={selectedSize[product._id] || ""}
                      onChange={(e) => handleSizeChange(product, e)}
                    >
                      <option value="">Select Size</option>
                      {product.sizes &&
                        Object.keys(product.sizes).map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                    </select>
                    {selectedSize[product._id] && selectedProduct === product && (
                    <div className="mx-4 mt-1">
                      <h6>Price: ₹{price}</h6>
                    </div>
                  )}
                  </div>

              

                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary mt-2 px-3">Add to Cart</button>
                  </div>

                  {isAdmin && (
                    <div className="mt-3">
                      <button
                        className="btn  mr-4 p-1 no-focus"
                        style={{ outline: "none", boxShadow: "none", textDecoration: "underline", }}
                        onClick={() => {
                          setIsEditing(true);
                          setSelectedProduct(product);
                          setEditData({
                            title: product.title,
                            desc: product.desc,
                            img: product.img,
                            sizes: product.sizes,
                          });
                        }}
                      >
                      Edit
                      </button>
                      <button
                        className="btn p-1 no-focus"
                        onClick={() => handleDeleteProduct(product._id)}
                        style={{ marginLeft: "155px",  outline: "none", boxShadow: "none", textDecoration: "underline",  }}
                      >Delete
                        
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };


  const renderEditForm = () => {
    if (!isEditing || !selectedProduct) return null;
  
    return (
      <div className="container mt-4">
        <h5>Edit Product</h5>
        <form onSubmit={handleUpdateProduct}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={editData.desc}
              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              className="form-control"
              value={editData.img}
              onChange={(e) => setEditData({ ...editData, img: e.target.value })}
            />
          </div>
          {/* <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, img: e.target.value })}
            /> */}
          {/* </div> */}
          <div className="form-group">
            <label>Sizes</label>
            {Object.keys(editData.sizes).map((size) => (
              <div key={size} className="d-flex align-items-center">
                <span>{size}: </span>
                <input
                  type="number"
                  className="form-control ml-2"
                  value={editData.sizes[size]}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      sizes: { ...editData.sizes, [size]: e.target.value },
                    })
                  }
                />
              </div>
            ))}
          </div>
          <div className="m-2">
          <button type="submit" className="btn btn-success me-5">Update Product</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          </div>
          
        </form>
      </div>
    );
  };
  
  return (
    <>
    <div> 
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >
        <h2>Our Food Products</h2>
      </div>
      {isEditing ? renderEditForm() : renderProducts()}
      {renderPagination()}
      </div>
    </>
  );
}

