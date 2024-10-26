import React from "react";
import "../../../../../public/css/product.css"
import Category from "./Cate";
import Link from "next/link";

interface CategoryInterface {
_id: string;
img_cate: string;
name_cate: string;
status_cate: string;
}

interface CateListProps {
categories: CategoryInterface[];
}

const Catelist: React.FC<CateListProps> = ({categories}) => {
return (
    <>
        {
        categories.map(cate => {
            return (
                <Category category={cate}/>
            )
        })
}
    </>
);
}

export default Catelist;