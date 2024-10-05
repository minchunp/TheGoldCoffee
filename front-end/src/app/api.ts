import axios from "axios";

// Interface product
interface ProductInterface {
   _id: string,
   id_cate: string
   name_pro: string,
   img_pro: string,
   price_pro: number,
   sale_pro: number,
   disc_pro: string,
   salesVolume_pro: number,
   status_pro: number
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
// Interface category
interface CategoryInterface {
   _id: string;
   img_cate: string;
   name_cate: string;
   status_cate: string;
}

// Fetch API products
export const fetchProducts = async (): Promise<ProductInterface[]> => {
   try {
      const respone = await axios.get<ProductInterface[]>(`${process.env.NEXT_PUBLIC_API_URL}/listProduct`);
      return respone.data;
   } catch (e) {
      console.log('Có lỗi xảy ra khi fetch dữ liệu product, ', e);
      throw e;
   }
}

// Fetch API users
export const fetchUsers = async (): Promise<UserInterface[]> => {
   try {
      const respone = await axios.get<UserInterface[]>(`${process.env.NEXT_PUBLIC_API_USER_URL}/listUser`);
      // const respone = await axios.get<UserInterface[]>(`http://localhost:3000/users`);
      return respone.data;
   } catch (e) {
      console.log('Có lỗi xảy ra khi fetch dữ liệu user, ', e);
      throw e;
   }
}

// Fetch API categories
export const fetchCategories = async (): Promise<CategoryInterface[]> => {
   try {
      const respone = await axios.get<CategoryInterface[]>(`${process.env.NEXT_PUBLIC_API_CATE_URL}/listCategory`);
      return respone.data;
   } catch (e) {
      console.log('Có lỗi xảy ra khi fetch dữ liệu category, ', e);
      throw e;
   }
}

