import useSWR from "swr";
import "../../../../../public/css/slide.css";
import Slider from "react-slick";
import axios from "axios";
import Link from "next/link";

interface ProductInterface {
  _id: string;
  product: {
    _id: string;
    id_cate: string;
    img_pro: string;
    name_pro: string;
    price_pro: number;
    sale_pro: number;
    disc_pro: string;
    salesVolume_pro: number;
    status_pro: string;
  };
  toppings: {
    _id: string;
    id_cate: string;
    img_topping: string;
    name_topping: string;
    price_topping: number;
    status_topping: string;
  }[];
}

export default function Slide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    sslidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2300,
  };

  // FetchAPI Demo products
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<ProductInterface[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/listProductTopping`,
    fetcher
  );

  if (error)
    return (
      <strong className="fetch">Không tải được thông tin sản phẩm demo</strong>
    );
  if (!data) return <strong className="fetch">Đang tải dữ liệu...</strong>;

  const topThreeProducts = data
    .slice() // Tạo một bản sao để tránh thay đổi mảng gốc
    .sort((a, b) => b.product.salesVolume_pro - a.product.salesVolume_pro) // Sắp xếp giảm dần
    .slice(0, 3); // Lấy 3 sản phẩm đầu tiên

  return (
    <>
      <div className="main-slide">
        <div className="boxcenter">
          <div className="container-main-slide">
            <div className="list-slide-show">
              <Slider {...settings}>
                <div className="container-slide">
                  <div className="single-slide">
                    <img src="images/slide_bannerNew_1.png" alt="" />
                    <div className="content-slide content-slide_1">
                      <h1>Tận hưởng coffee vào buổi sáng</h1>
                      <p>
                        Tăng năng suất và cải thiện tâm trạng của bạn với một
                        tách cà phê vào buổi sáng, 100% tự nhiên từ vườn.
                      </p>
                      <button className="main-btn main-btn__banner">
                        Thử ngay
                      </button>
                    </div>
                  </div>
                </div>
                <div className="container-slide">
                  <div className="single-slide">
                    <img src="images/slide_bannerNew_2.png" alt="" />
                    <div className="content-slide content-slide_2">
                      <button className="main-btn main-btn__banner-2">
                        Thử ngay
                      </button>
                    </div>
                  </div>
                </div>
                <div className="container-slide">
                  <div className="single-slide">
                    <img src="images/slide_bannerNew_3.png" alt="" />
                    <div className="content-slide content-slide_3">
                      <button className="main-btn main-btn__banner-3">
                        Thử ngay
                      </button>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
            <div className="demo-pro-in-slide">
              <div className="container-demo-pro">
                {topThreeProducts.map((proDemo) => (
                  <div className="demo-pro" key={proDemo._id}>
                    <Link
                      href={`/product/${proDemo._id}`}
                      className="img-demo-pro"
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PRO_URL}${proDemo.product.img_pro}`}
                        alt={proDemo.product.name_pro}
                      />
                    </Link>
                    <div className="content-demo-pro">
                      <Link href={`/product/${proDemo._id}`}>
                        <h4>{proDemo.product.name_pro}</h4>
                      </Link>
                      {proDemo.product.sale_pro > 0 ? (
                        <div className="price-demo-pro">
                          <p>{proDemo.product.sale_pro.toLocaleString()}đ</p>
                          <p>{proDemo.product.price_pro.toLocaleString()}đ</p>
                        </div>
                      ) : (
                        <div className="price-demo-pro">
                          <p>{proDemo.product.price_pro.toLocaleString()}đ</p>
                        </div>
                      )}
                      <p>
                        Lượt bán: <span>{proDemo.product.salesVolume_pro}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
