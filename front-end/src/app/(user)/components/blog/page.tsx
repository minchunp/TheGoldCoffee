import React from "react";
import "../../../../../public/css/blog.css";

interface BLogInterface {
   _id: string,
   title_blog: string,
   img_blog: string,
   date_blog: string,
   content_blog: string,
   sumary_blog: string,
   status_blog: number
}

interface BlogProps {
   blog: BLogInterface;
}

const Blog: React.FC<BlogProps> = ({blog}) => {
   return (
      <>
         <div className="item-blog" key={blog._id}>
            <div className="wrapper">
               <a href="#!"><img src={`images/${blog.img_blog}`} alt="" /></a>
            </div>
            <div className="content-blog">
               <p className="date-blog">{blog.date_blog}</p>
               <a href="#!"><h3 className="title-blog">{blog.title_blog}</h3></a>
               <p className="sumary-blog">{blog.sumary_blog}</p>
            </div>
         </div>
      </>
   );
}

export default Blog;
