import { useSelector, useDispatch } from "react-redux";
import styles from "../Wishlist_Profile.module.css";
import ProductsOverview from "../../../../Collection/ProductsOverview/ProductsOverview";
const Wishlist = () => {
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  return (
    <>
      <div className={styles.wishlist}>
        <ProductsOverview title={""} products={wishlist} />
      </div>
    </>
  );
};
export default Wishlist;
