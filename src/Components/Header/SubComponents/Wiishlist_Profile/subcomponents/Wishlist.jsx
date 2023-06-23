import { useSelector, useDispatch } from "react-redux";
import styles from "../Wishlist_Profile.module.css";
import ProductsOverview from "../../../../Collection/ProductsOverview/ProductsOverview";
import {
  deleteFromWishlist,
  getWishListData,
  updateProductDesiredPrice,
} from "../../../../../APIs/products";
import { useEffect, useState } from "react";
const Wishlist = () => {
  const [showInputForm, setShowInputForm] = useState(false);
  const [desiredPrice, setDesiredPrice] = useState(0);
  const [current, setCurrent] = useState(0);
  const wishlist = useSelector(({ productsState }) => productsState.wishlist);
  const success = useSelector(
    ({ productsState }) => productsState.removeSuccess
  );
  const successUpdate = useSelector(
    ({ productsState }) => productsState.updateSuccess
  );

  const token = useSelector(({ authState }) => authState.user.access);
  const dispatch = useDispatch();

  const deleteProductFromWishlist = (id) => {
    deleteFromWishlist(dispatch, token, id);
  };
  const handleUpdateClick = (id, currentPrice) => {
    setCurrent(id);
    setShowInputForm(!showInputForm);
    setDesiredPrice(currentPrice);
  };
  const updateDesiredPrice = (id) => {
    if (desiredPrice) {
      updateProductDesiredPrice(dispatch, token, id, desiredPrice);
      setShowInputForm(false);
    }
  };

  useEffect(() => {
    getWishListData(dispatch, token);
  }, [success, successUpdate]);
  return (
    <>
      <div className={styles.wishlist}>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Desired price</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.products.map((el) => (
              <tr key={el.id}>
                <td>
                  <img
                    src={`https://m.media-amazon.com/images/I/${el.product.images[0].image_url}.jpg`}
                    alt={el.product.title}
                  />
                </td>
                <td>{el.product.title}</td>
                <td>{el.product.sale_price}</td>
                {showInputForm && current == el.id ? (
                  <td>
                    <input
                      type="number"
                      placeholder="Enter Desired Price"
                      value={desiredPrice}
                      onChange={(e) => setDesiredPrice(e.target.value)}
                    />
                    <button onClick={() => updateDesiredPrice(el.id)}>
                      Submit
                    </button>
                  </td>
                ) : (
                  <td>{el.desired_price}</td>
                )}
                <td>
                  <button
                    onClick={() => handleUpdateClick(el.id, el.desired_price)}
                  >
                    Update
                  </button>
                  <button onClick={() => deleteProductFromWishlist(el.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Wishlist;
