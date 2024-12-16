import { useEffect, useState } from "react";
import "../../../../../../public/css/modalOrderDetail.css";
import axios from "axios";

interface ModalUpdateInfoProps {
   id: string;
   isOpen: boolean;
   onClose: () => void;
}

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

function ModalUpdateInfor({ id, isOpen, onClose }: ModalUpdateInfoProps) {
   console.log(id);

   const [user, setUser] = useState<UserInterface>({
      _id: "",
      name_user: "",
      email_user: "",
      phoneNumber_user: "",
      pass_user: "",
      address_user: "",
      role_user: "",
      status_user: 0,
   });

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
         if (id) {
            fetchUsers(id);
         }
      } else {
         document.body.style.overflow = "";
      }
      return () => {
         document.body.style.overflow = "";
      };
   }, [isOpen]);

   const fetchUsers = async (userId: string) => {
      try {
         const token = localStorage.getItem("token");
         if (token) {
            // Gửi yêu cầu GET lên API để lấy thông tin người dùng
            const response = await axios.get(`http://localhost:3001/usersAPI/detailUser/${userId}`, {
               headers: {
                  Authorization: `Bearer ${token}`, // Đính kèm token vào tiêu đề
               },
            });
            const dataUser = response.data;
            setUser(dataUser);
         }
      } catch (e) {
         console.log("Lỗi khi lấy thông tin khách hàng", e);
      }
   };

   const handleSubmitUpdate = async (e: any) => {
      e.preventDefault();
      try {
         // Gọi API cập nhật thông tin user
         await fetch(`http://localhost:3001/user/update/${user._id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
         });

         console.log("Cập nhật thông tin khách hàng thành công!");
         window.location.href = "/inforCustomer"
      } catch (e) {
         console.log("Lỗi khi cập thông tin khách hàng", e);
      }
   }

   return (
      <>
         <div className={`main-bg-order-detail ${isOpen ? "open" : ""}`} onClick={onClose}>
            <div className="main-modal-order-detail updateInfo" onClick={(e) => e.stopPropagation()}>
               <h1>Chỉnh sửa thông tin</h1>

               <div className="container-boxInput-updateInfo">
                  <form onSubmit={handleSubmitUpdate}>
                     <div className="boxInput-updateInfo">
                        <p>Tên khách hàng</p>
                        <input
                           type="text"
                           name="name_user"
                           placeholder="Tên khách hàng"
                           value={user.name_user}
                           onChange={(e) => setUser({ ...user, name_user: e.target.value })}
                           required
                        />
                     </div>
                     <div className="boxInput-updateInfo">
                        <p>Email</p>
                        <input
                           type="text"
                           name="email_user"
                           placeholder="Email khách hàng"
                           value={user.email_user}
                           onChange={(e) => setUser({ ...user, email_user: e.target.value })}
                           required
                        />
                     </div>
                     <div className="boxInput-updateInfo">
                        <p>Số điện thoại</p>
                        <input
                           type="text"
                           name="phoneNumber_user"
                           placeholder="Số điện thoại"
                           value={user.phoneNumber_user}
                           onChange={(e) => setUser({ ...user, phoneNumber_user: e.target.value })}
                           required
                        />
                     </div>
                     <div className="boxInput-updateInfo">
                        <p>Địa chỉ</p>
                        <input
                           type="text"
                           name="address_user"
                           placeholder="Địa chỉ khách hàng"
                           value={user.address_user}
                           onChange={(e) => setUser({ ...user, address_user: e.target.value })}
                           required
                        />
                     </div>
                     <div className="boxInput-updateInfo">
                        <p>Mật khẩu</p>
                        <a href="#!">Thay đổi mật khẩu?</a>
                     </div>

                     <button type="submit" className="main-btn main-btn__updateInfo">Hoàn tất</button>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
}

export default ModalUpdateInfor;
