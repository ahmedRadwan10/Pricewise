import { useDispatch, useSelector } from "react-redux";
import styles from "../Category.module.css";

const Sidebar = ({ category }) => {
  const subCategories = useSelector(
    ({ categoriesState }) => categoriesState.subCategories
  );
  const renderCategoryList = () => {
    if (subCategories)
      return subCategories.map((sub) => (
        <li key={sub}>
          <a>{sub}</a>
        </li>
      ));
  };
  return (
    <div className={styles.side_bar}>
      <h1>{category}</h1>
      <ul className={styles.category_list}>{renderCategoryList()}</ul>
    </div>
  );
};
export default Sidebar;
