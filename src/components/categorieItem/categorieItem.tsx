import { FunctionComponent } from "react";
import Category from "../../types/category.types";
import "./categorieItem.styles.css";

interface CategorieItemProps {
  category: Category;
}

const CategorieItem: FunctionComponent<CategorieItemProps> = ({ category }) => {
  return (
    <div
      className="category-item-container"
      style={{ backgroundImage: `url(${category.imageUrl}) ` }}
    >
      <div className="category-name-container">
        <p>{category.displayName}</p>
        <p>Explorer</p>
      </div>
    </div>
  );
};

export default CategorieItem;
