import UserItemAdmin from "./userItem";
import "../../../../public/css/dashboardAdmin.css";
import React from "react";

// Interface user
interface UserInterface {
   _id: string;
   name_user: string;
   email_user: string;
   phoneNumber_user: string;
   pass_user: string;
   address_user: string;
   role_user: string;
   status_user: number;
}

interface UserListProps {
   users: UserInterface[]
}

const UserListAdmin: React.FC<UserListProps> = ({users}) => {
   return (
      <>
         <div className="main-list">
            {
               users.map(user => {
                  return (
                     <div key={user._id} className="box-user-admin">
                        <UserItemAdmin user={user}/>
                     </div>
                  )
               })
            }
         </div>
      </>
   )
}

export default UserListAdmin;