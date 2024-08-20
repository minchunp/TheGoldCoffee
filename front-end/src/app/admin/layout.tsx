import Link from "next/link";
import "../../../public/css/mainAdmin.css";
import logoWebAdmin from "../../../public/images/The Gold Coffee Logo SVG.png";
import avtAccountAdmin from "../../../public/images/avatarAccountAdmin.jpeg";
import VietNam from "../../../public/images/VietNam.webp"
import LeftNav from "./components/leftNav";
export const metadata = {
   title: "Admin The Gold Coffee",
   description: "Trang quản lý của The Gold Coffee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>
            <div className="main-container">
               {/* <!-- Main menu  --> */}
               <LeftNav/>
               {/* <!-- Main content --> */}
               <div className="main">
                  {/* <!-- Header website Hurst --> */}
                  <header className="main-header-admin">
                     <div className="boxcenter">
                        <div className="container-header">
                           <div className="input-search">
                              <input type="text" placeholder="Tìm kiếm" />
                              <i className="bi bi-search"></i>
                           </div>

                           <div className="account">
                              <div className="notification">
                                 <i className="bi bi-bell-fill"></i>
                                 <div className="count-notification">1</div>
                              </div>

                              <div className="language">
                                 <img src={VietNam.src} alt="" />
                                 <div className="content-language">
                                    <p>Việt Nam</p>
                                    <i className="bi bi-chevron-compact-down"></i>
                                 </div>
                              </div>

                              <div className="information-user">
                                 <div className="image-user">
                                    <a href="/Template/Html/index.html">
                                       <img src={avtAccountAdmin.src} alt="" />
                                    </a>
                                 </div>
                                 <div className="name-user">
                                    <p>Minh Trung</p>
                                    <p className="position">Admin</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </header>

                  {/* <!-- Content admin --> */}
                  <main>{children}</main>
               </div>
            </div>
         </body>
      </html>
   );
}
