import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CartButton, SearchBar, Login } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import AdminNav from "../../Admin/AdminNav";
import { setUser } from "../../redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  // useEffect(() => {
  //   dispatch(setUser());
  // }, []);

  return (
    <>
      {user.admin == true ? (
        <AdminNav />
      ) : (
        <React.Fragment>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
              <Link className="navbar-brand text-uppercase fw-bolder" to="/">
                SPhoenix
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/phones">
                      Create phones
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      to="/shop"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Shop
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/products">
                          All Products
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#!">
                          Popular Items
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#!">
                          New Arrivals
                        </Link>
                      </li>
                    </ul>

                  {/* <li>
                    <hr className="dropdown-divider" />

                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">
                      Contact Us
                    </Link>
                  </li> */}
                </ul>
                <SearchBar />
                <Login />
                <CartButton />
              </div>
            </div>
          </nav>
        </React.Fragment>
      )}
    </>
  );
};

export default Navbar;
