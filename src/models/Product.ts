import Category from "./Category";

class Product {
    id: number;
    name: string;
    category: Category;
    description?: string;
}

export default Product;