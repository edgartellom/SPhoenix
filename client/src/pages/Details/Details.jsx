import { useState, useEffect } from "react";
import { getProductById } from "../../redux/slices/productByIdSlice";
import { STATUSES } from "../../redux/slices/productByIdSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Details.css";
import { Link, useParams } from "react-router-dom";
import ProductDetailsTab from "../productDetailsTab/ProductDetailsTab";

const Details = () => {
  const dispatch = useDispatch();
  const { product, productStatus } = useSelector((state) => state.productById);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (productStatus === STATUSES.LOADING) {
    return (
      <>
        <h3>Loading ...</h3>
      </>
    );
  }

  if (productStatus === STATUSES.ERROR) {
    return (
      <>
        <h3>Something went wrong</h3>
      </>
    );
  }

  return (
    <>
      <main className="main">
        {/* breadcrumb */}
        <nav className="breadcrumb border-0 mb-0">
          <div className="container d-flex aling-items-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>

              <li className="breadcrumb-item">
                <Link to="/products">Products</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/products/${id}`}>
                  {product.brand + " " + product.name}
                </Link>
              </li>
            </ol>
          </div>
        </nav>

        {/* Main content */}
        <div className="page-content">
          <div className="container">
            <div className="product-details-top">
              <div className="row">
                <div className="col-md-6">
                  <div className="product-gallery product-gallery-vertical">
                    <div className="row">
                      <figure className="product-main-image">
                        <img src={product.image} />
                      </figure>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="product-details">
                    <h1 className="product-title">
                      {product.brand + " " + product.name}
                    </h1>
                    <h3 className="product-subtitle">{product.model}</h3>
                  </div>
                  {/* Begin ratings content */}
                  <div className="rating-container">
                    <div className="ratings">
                      <div className="ratings-val">
                        <span>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star"></i>
                        </span>
                      </div>
                    </div>
                    <a className="ratings-text" href="#product-reviews">
                      {"(2 reviews)"}
                    </a>
                  </div>
                  {/* End ratings content */}
                  <div className="product-price">{"$ " + product.price}</div>
                  <div className="product-content">
                    <div className="details-filter-row details-row-size">
                      <label className="">Colors: </label>
                      <div className="select-custom">
                        <select className="form-control" name="size" id="size">
                          {product.color?.map((i, index) => (
                            <option value={i} key={index}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="product-details-action">
                    <Link to="/cart" className="btn-product btn-cart">
                      <span>
                        <i className="bi bi-cart-plus"></i> Add to cart
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <ProductDetailsTab />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Details;
