"use client";
import "../../../../public/css/menu.css";
import "../../../../public/css/login_register.css";
import { fetchProducts } from "@/app/api";
import { fetchCategories } from "@/app/api";
import useSWR from "swr";
import Product from "../components/product/page";
import Category from "../components/category/Cate";
import ButtonScrollTop from "../components/buttonScrollTop/page";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ModalProductDetail from "../components/modalProductDetail/[id]/page";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductInterface {
  _id: string;
  id_cate: string;
  name_pro: string;
  img_pro: string;
  price_pro: number;
  sale_pro: number;
  disc_pro: string;
  salesVolume_pro: number;
  status_pro: number; // 1 còn && 0 hết
}

interface ToppingInterface {
  _id: string;
  id_cate: string;
  img_topping: string;
  name_topping: string;
  price_topping: number;
  status_topping: string;
}

interface ProductWithToppings {
  _id: string;
  product: ProductInterface;
  toppings: ToppingInterface[];
}

interface CategoryInterface {
  _id: string;
  img_cate: string;
  name_cate: string;
  status_cate: string;
}

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    if (searchTerm) {
      // Reset selectedCategory when switching to search mode
      setSelectedCategory(null);
    } else {
      setCurrentPage(0);
    }
  }, [searchParams]);

  const [isModalOpenProductDetail, setIsModalOpenProductDetail] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const openModal = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpenProductDetail(true);
  };
  const closeModal = () => setIsModalOpenProductDetail(false);

  // Product
  const { data: products, error: errorProducts } = useSWR<
    ProductWithToppings[]
  >("listProductTopping", fetchProducts);

  //Category
  const { data: categories, error: errorCategories } = useSWR<
    CategoryInterface[]
  >("listCategory", fetchCategories);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const productsPerPage = 12; // Number of products per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setselectedStatus] = useState<number | null>(null);

  if (errorProducts) {
    return <strong className="fetch">Error loading products</strong>;
  }
  if (!products) {
    return <strong className="fetch">Loading products...</strong>;
  }

  if (errorCategories) {
    return <strong className="fetch">Error loading categories</strong>;
  }
  if (!categories) {
    return <strong className="fetch">Loading categories...</strong>;
  }

  // Filter sản phẩm theo cate
  // Xử lý lỗi hoặc trạng thái tải || Handling errors or loading states
  if (errorProducts || errorCategories) {
    return <div>Error loading data</div>;
  }
  if (!products || !categories) {
    return <div>Loading data... </div>;
  }

  // Filter sản phẩm khi chọn Cate
  const filteredProducts = selectedCategory
    ? products.filter((pro) => pro.product.id_cate === selectedCategory)
    : products;

  // const filteredProducts = products.filter((pro) => {
  //    const matchesCategory = selectedCategory ? pro.id_cate === selectedCategory : true;
  //    const matchesAvailability = selectedStatus !== null ? pro.status_pro === selectedStatus : true;
  //    return matchesCategory && matchesAvailability;
  // });

  // Filter products by category, availability, and search term
  const searchProduct = products.filter((pro) =>
    pro.product.name_pro.toLowerCase().includes(searchTerm)
  ); // Filter by search term

  const filteredProductsForPagination = searchTerm
    ? searchProduct // Sử dụng filteredProduct nếu đang tìm kiếm
    : filteredProducts; // Sử dụng filteredProducts nếu không tìm kiếm

  // Handle pagination
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProductsForPagination.slice(
    offset,
    offset + productsPerPage
  );
  const pageCount = Math.ceil(
    filteredProductsForPagination.length / productsPerPage
  );

  // Handle Category click
  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0); // Reset về trang đầu tiên khi chọn danh mục mới
    if (searchTerm) router.push("/menu"); // Điều hướng về /menu nếu đang ở chế độ tìm kiếm
  };

  // Handle status click
  const handleStatusClick = (Statuspro: number | null) => {
    setselectedStatus(Statuspro);
    setCurrentPage(0);
  };

  // Handle pagination click
  const handlePageClick = (selectedItem: { selected: number }) => {
    if (selectedItem.selected === currentPage) return; // Không cập nhật nếu trang hiện tại không thay đổi
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      {selectedProductId && (
        <ModalProductDetail
          id={selectedProductId}
          isOpen={isModalOpenProductDetail}
          onClose={closeModal}
        />
      )}

      <section className="banner-title-other-page overlay-bg">
        <div className="main-title-other-page">
          {searchTerm ? (
            <p>
              Kết quả tìm kiếm: <strong>{searchTerm}</strong>
            </p>
          ) : (
            <p>Trang chủ / Menu sản phẩm</p>
          )}
        </div>
      </section>

      <main className="body-menu">
        {/* Import button scroll to top */}
        <ButtonScrollTop />
        <div className="boxcenter">
          <div className="container-body-menu">
            <div className="list-cate-menu">
              <div className="items-cateBox">
                <h2>Danh mục</h2>
                <div className="container-items-cateBox">
                  <div className="input-items-cateBox">
                    <div className="boxInput-cate">
                      <label htmlFor="allProduct">
                        <input
                          type="radio"
                          id="allProduct"
                          name="cate-menu"
                          checked={selectedCategory === null}
                          onClick={() => handleCategoryClick(null)}
                        />
                        Tất cả sản phẩm
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p className="quantity-pro-cate-menu">
                      ({products.length})
                    </p>
                  </div>
                  {categories.map((pro) => {
                    const countProduct = products.filter(
                      (count) => count.product.id_cate === pro._id
                    ).length;
                    return (
                      <div
                        className={`input-items-cateBox ${
                          selectedCategory === pro._id ? "active" : ""
                        }`}
                        key={pro._id}>
                        <div
                          className="boxInput-cate"
                          onClick={() => handleCategoryClick(pro._id)}>
                          <Category category={pro} />
                        </div>
                        <p className="quantity-pro-cate-menu">
                          ({countProduct})
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="items-cateBox">
                <h2>Tình trạng sản phẩm</h2>
                <div className="container-items-cateBox availability-menu">
                  <div className="input-items-cateBox">
                    <div className="boxInput-cate">
                      <label htmlFor="statusPro1">
                        Còn hàng
                        <input
                          type="radio"
                          id="statusPro1"
                          name="Statuspro"
                          checked={selectedStatus === 1}
                          onChange={() => handleStatusClick(1)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p className="quantity-pro-cate-menu">
                      (
                      {
                        products.filter((pro) => pro.product.status_pro === 1)
                          .length
                      }
                      )
                    </p>
                  </div>

                  <div className="input-items-cateBox">
                    <div className="boxInput-cate">
                      <label htmlFor="statusPro0">
                        Hết hàng
                        <input
                          type="radio"
                          id="statusPro0"
                          name="Statuspro"
                          checked={selectedStatus === 0}
                          onChange={() => handleStatusClick(0)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p className="quantity-pro-cate-menu">
                      (
                      {
                        products.filter((pro) => pro.product.status_pro === 0)
                          .length
                      }
                      )
                    </p>
                  </div>
                </div>
              </div>

              <div className="banner-list-cate-menu">
                <img src="images/small-banner-menu.png" alt="" />
              </div>
            </div>

            {/*  */}
            <div className="list-pro-menu">
              <h2>
                Các sản phẩm (
                {searchTerm ? searchProduct.length : filteredProducts.length})
              </h2>

              <div className="main-banner-list-pro-menu">
                <img src="images/big-banner-menu.png" alt="" />
              </div>
              <div className="container-form-list">
                <div className="items-form-list">
                  <div className="item-form-list active">
                    <i className="bi bi-columns-gap" />
                  </div>
                  <div className="item-form-list">
                    <i className="bi bi-list-task" />
                  </div>
                </div>
                <div className="title-cate-list-pro-menu">
                  <h3>Tất cả sản phẩm ({searchProduct.length})</h3>
                </div>
              </div>

              {/* Product List */}
              <div className="container-list-pro-menu">
                {currentProducts.map((pro) => (
                  <Product
                    key={pro._id}
                    product={pro}
                    idProductDetail={openModal}
                  />
                ))}
              </div>

              {/* Pagination Component */}
              <div className="container-numerical-order">
                <div className="numerical-order">
                  <ReactPaginate
                    previousLabel="<<"
                    nextLabel=">>"
                    breakLabel="..."
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    containerClassName="pagination justify-content-end"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                    disabledClassName="disabled"
                    forcePage={currentPage} // Đảm bảo rằng trang hiện tại được đánh dấu là active
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
