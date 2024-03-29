import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../redux/slices/productListSlice";
import { changeCurrentPage } from "../../redux/slices/paginationSlice";
import { ProductCard, Paginated, NotFound } from "../../components";

function ProductsList() {
  const dispatch = useDispatch();
  let loading = useSelector((store) => store.product.status);

  const currentPage = useSelector((store) => store.paginated.currentPage);
  let list = useSelector((store) => store.product.list);
  let phones = [...list];

  const phonesPerPage = 12;
  const indexLastPhone = currentPage * phonesPerPage;
  const indexFirstPhone = indexLastPhone - phonesPerPage;
  const currentPhones = phones.slice(indexFirstPhone, indexLastPhone);

  const paginated = (pageNumber) => {
    changeCurrentPage(pageNumber);
  };

  React.useEffect(() => {
    if (!phones.length) dispatch(getProductList());
  }, []);

  //console.log("products", products);

  return (
    <div>
      <div>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {loading === "loading" ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
              alt="Loading..."
            />
          ) : currentPhones && currentPhones.length > 0 ? (
            currentPhones.map((phone) => {
              return <ProductCard key={phone.id} props={phone} />;
            })
          ) : (
            // <p className="text-center">No se hallaron coincidencias</p>
            <NotFound />
          )}
        </div>
      </div>
      {<Paginated phones={phones.length} phonesPerPage={phonesPerPage} />}
    </div>
  );
}

export default ProductsList;
