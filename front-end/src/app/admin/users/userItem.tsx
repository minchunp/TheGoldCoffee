import React, { useState } from "react";
import "../../../../public/css/dashboardAdmin.css";
import Link from "next/link";
import axios from "axios";

// Interface user
interface UserInterface {
   id: string;
   name_user: string;
   email_user: string;
   phoneNumber_user: string;
   pass_user: string;
   address_user: string;
   role_user: string;
   status_user: number;
}

interface UserProps {
   user: UserInterface;
   // onDelete: (id: string) => void
}

const UserItemAdmin: React.FC<UserProps> = ({ user }) => {
   const handleDelete = async (e: any) => {
      try {
         const response = await axios.delete(`http://localhost:3000/users/${user.id}`);
         console.log("Xoá tài khoản khách hàng thành công", response.data);
         window.location.reload();
         // onDelete(user.id);
      } catch (e) {
         console.log("Xoá tài khoản khách hàng thất bại!", e);
      }
   }  

   return (
      <>
         <div className="main-order-pending" key={user.id}>
            <Link href="#!">
               <p>{user.id}</p>
            </Link>
            <p>{user.name_user}</p>
            <p>{user.email_user}</p>
            <p>{user.role_user}</p>
            <div className="container-func">
               {/* Nút sửa sản phẩm */}
               <Link href={`/admin/users/${user.id}`}>
                  <button>
                     <i className="bi bi-gear"></i>
                  </button>
               </Link>
               {/* Nút xoá sản phẩm */}
               <button onClick={handleDelete}>
                  <i className="bi bi-x-lg"></i>
               </button>
            </div>
         </div>
      </>
   );
};

export default UserItemAdmin;
