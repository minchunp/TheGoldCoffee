    import React from "react";
    import "../../../../../public/css/product.css"
    import Link from "next/link";

    interface CategoryInterface {
    _id: string;
    img_cate: string;
    name_cate: string;
    status_cate: string;
    }

    interface CateProps {
        category: CategoryInterface
    }

    const Category: React.FC<CateProps> = ({category}) => {
    return (
        <>
            
            <div className="boxInput-cate">
            <label htmlFor={category._id}>
            {category.name_cate}
            <input type="radio" id={category._id} name="cate-menu" />
            <span className="checkmark"></span>
            </label>
            </div>
            {/* <p className="quantity-pro-cate-menu"></p> */}
            
        </>
    );
    }

    export default Category;