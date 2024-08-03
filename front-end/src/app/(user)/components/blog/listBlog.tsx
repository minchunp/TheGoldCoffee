import React from "react";
import "../../../../../public/css/blog.css";
import Blog from "./page";

interface BLogInterface {
   _id: string,
   title_blog: string,
   img_blog: string,
   date_blog: string,
   content_blog: string,
   sumary_blog: string,
   status_blog: number
}

interface BlogListProps {
   blogs: BLogInterface[];
}

const BlogList: React.FC<BlogListProps> = ({blogs}) => {
   return (
      <>
         <div className="container-blog">
            {
               blogs.map(blog => {
                  return (
                     <div key={blog._id} className="box-blog">
                        <Blog blog={blog}/>
                     </div>
                  )
               })
            }
         </div>
         <div className="item-button-blog">
            <button className="main-btn main-btn__blog">Xem thêm</button>
         </div>
      </>
   );
}

export default BlogList;

