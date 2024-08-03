import axios from "axios";

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

