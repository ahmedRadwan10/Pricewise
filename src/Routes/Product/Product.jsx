import React, { Suspense, useState } from "react";
import styles from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../Components/Collection/Image";
import { lazy } from "react";
import { getProduct, getProducts } from "../../APIs/products";
import ProductData from "./SubComponents/ProductData";
import ProductsOverview from "../../Components/Collection/ProductsOverview/ProductsOverview";
import Chart from "./SubComponents/Chart";
import ProductSpecs from "./SubComponents/ProductSpecs";

const Product = () => {
  const [togglerIsSpecs, setTogglerIsSpecs] = useState(false);
  const product = useSelector(({ productsState }) => productsState.selectedProduct.product);
  const similarProducts = useSelector(({ productsState }) => productsState.selectedProduct.similar_products);
  const sameProducts = useSelector(({ productsState }) => productsState.selectedProduct.same_product_other_vendor);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (product) document.title = `${product.title}`;
    return () => (document.title = "Pricewise");
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct(dispatch, params.productSlug);
  }, [dispatch, params]);

  if (product)
    return (
      <div className={styles.main_container}>
        <div className={styles.nav_container}>
          <Link to="/">Home</Link>
          <span>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <Link to="">Electronics</Link>
          <span>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <Link to="">{product.category}</Link>
          <span>
            <i className="fa-solid fa-chevron-right"></i>
          </span>
          <Link to="">{product.title}</Link>
        </div>
        <div className={styles.flex_container}>
          {/* <div className={styles.overview_container}> */}
            <ProductData product={product} />
          {/* </div> */}
          <div className={styles.right_container}>
            <Chart history={product.price_history} />
            <div className={styles.specs_description_container}>
              <div className={styles.toggle}>
                <h4 onClick={() => setTogglerIsSpecs(false)} className={ !togglerIsSpecs ? styles.active_toggler : ""}>Description</h4>
                <h4 onClick={() => setTogglerIsSpecs(true)} className={ togglerIsSpecs ? styles.active_toggler : ""}>Specifications</h4>
              </div>
              <div className={styles.content}>
                {
                  togglerIsSpecs ? <ProductSpecs specs={product[`${product.category.toLowerCase()}`]} /> :
                    <div className={styles.description}>
                      <p>
                        {product.description}
                      </p>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
        <ProductsOverview title="Same Products" products={sameProducts} maxProducts={5} ctaIsDisabled={true} navIsDisabled={true} />
        <ProductsOverview title="Similar Products" products={similarProducts} maxProducts={5} />
      </div>
    );
};

export default Product;
