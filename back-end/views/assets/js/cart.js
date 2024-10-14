var dsSanPham = JSON.parse(sessionStorage.getItem("JsonGH"));


for(let i = 0; i < dsSanPham.length; i++) {
    let motsp = dsSanPham[i];
    var addSP = '<div class="product_product"> <div class="product_delete" style="height: 130px; width: 5%;"><i class="fa-regular fa-circle-xmark dele-btn" onclick="xoaSP(this)"></i></div> <div class="product_icon" style="height: 130px; width: 10%;"><img src="' + motsp.hinhsp + '" alt="" class="icon-pd"></div> <div class="product_name" style="height: 130px; width: 40%; padding: 10px;">'+ motsp.tensp +'</div> <div class="product_price" style="height: 130px; width: 15%;">'+ chuyenso(motsp.giasp) +' Đ</div> <div class="product_quantity" style="height: 130px; width: 15%; color: black; !important">'+ motsp.soluongsp +'</div> <div class="product_subtotal" style="height: 130px; width: 15%; color: black; !important">'+ chuyenso(Number(motsp.giasp)*Number(motsp.soluongsp)) +' Đ</div> <div class="masp" style="display: none;">'+ motsp.masp +'</div> </div>'
    var range = document.createRange();
    var fragment = range.createContextualFragment(addSP);
    document.querySelector('.product').appendChild(fragment);
}

function chuyenso(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  //Update show giỏ hàng - vai trò: chỉ hiển thị các sản phẩm đang có trong mảng ra màn hình[sau khi dùng Json cần fix phần get data]
  function lammoiGH(arrGH) {
  
    var box = document.querySelector('.showGH');
    while (box.firstChild) { 
        box.removeChild(box.firstChild);
    }
  
    
  
    for(let i = 0; i < arrGH.length; i++) {
      let sptam = arrGH[i];
      var addChild =  '<div class="product_product"> <div class="product_icon" style="height: 130px; width: 10%;"><img src="'+ sptam.hinhsp +'" alt="" class="icon-pd"></div> <div class="product_name" style="height: 130px; width: 40%; padding: 10px;">' + sptam.tensp + '</div> <div class="product_quantity" style="height: 130px; width: 15%;">' + sptam.soluongsp +'</div> <div class="product_subtotal" style="height: 130px; width: 15%;">' + "0" +' Đ</div> <div class="product_delete" style="height: 130px; width: 5%;" onclick="xoaSP(this)"><i class="fa-regular fa-circle-xmark dele-btn"></i></div> <div class="masp" style="display: none;">'+ sptam.masp +'</div> </div>'
      // Tạo đối tượng Range
      var range = document.createRange();
      var fragment = range.createContextualFragment(addChild);
      document.querySelector('.showGH').appendChild(fragment);
    }
    var addPay = '<a href="cart.html"><button id="pay">Thanh Toán</button></a>';
    var rangee = document.createRange();
    var fragmentt = rangee.createContextualFragment(addPay);
    document.querySelector('.showGH').appendChild(fragmentt);
  }

function xoaSP(y) {
    var row = y.parentElement.parentElement;
    var childs = y.parentElement.parentElement.children;
    var maCheck = childs[6].innerText;
    arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
    for(let i = 0; i < arrGH.length; i++) {
        if(maCheck == arrGH[i].masp) {
          arrGH.splice(i, 1);
          sessionStorage.setItem("JsonGH", JSON.stringify(arrGH));
        }
      }
      document.getElementById('productMain').removeChild(row);
      LamMoiTongTien();
}

function LamMoiTongTien() {
    var tongTren = document.getElementById('quantityright');
    var tongDuoi = document.getElementById('total-right');
    dsSanPham = JSON.parse(sessionStorage.getItem("JsonGH"));
    var tong = 0;
    for(let i = 0; i < dsSanPham.length; i++) {
        tong += Number(dsSanPham[i].giasp) * Number(dsSanPham[i].soluongsp);
        console.log(tong)
    }
    tongTren.innerText = chuyenso(tong) + " Đ";
    tongDuoi.innerText = chuyenso(tong) + " Đ";
}

LamMoiTongTien();

// vote
    const starUL = document.querySelector(".stars");
    const output = document.querySelector(".output");

    const stars = document.querySelectorAll(".star");
    stars.forEach((star,index) => {
        star.starValue = (index + 1);
        star.addEventListener("click",starRate);
    });
    function starRate(e) {
        output.innerHTML = ' - Bạn đã vote ' + e.target.starValue + ' sao          -';
        stars.forEach ((star,index) => {
            if(index < e.target.starValue) {
                star.classList.add("orange");
            } else {
                star.classList.remove("orange");
            }
        });
    }

    // var formattedDate = "";

function tttc() {
    let btn = document.querySelector(".tttc");
    btn.style.display = 'block';

    let listSP = dsSanPham;
    const luuTKExists = sessionStorage.getItem("luuTK") !== null;

    if (luuTKExists) {
        // "luuTK" tồn tại trong sessionStorage
        var daDangNhap = JSON.parse(sessionStorage.getItem("luuTK")); }
    let userName = daDangNhap.tk;

    dsSanPham = [];
    sessionStorage.setItem("JsonGH", JSON.stringify(dsSanPham));

    // Lấy thời gian hiện tại
    let currentTime = new Date();

    // Chuyển đổi thời gian thành định dạng ngày/tháng/năm
    let day = currentTime.getDate();
    let month = currentTime.getMonth() + 1; // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
    let year = currentTime.getFullYear();

    // Tạo chuỗi định dạng ngày/tháng/năm
    formattedDate = `${day}/${month}/${year}`;

    luuDon(userName, listSP);


}

function ok() {
    let btn = document.querySelector(".tttc");
    btn.style.display = 'none';
    location.reload();
}

function luuDon(userName, listSP) {
    var idmoi = 0;

    for (let i = 0; i < mangsp.length; i++) {
     // console.log("id moi: " + idmoi);
     // console.log("id so sanh: " + mangsp[i].id);
    if( parseFloat(mangsp[i].id) > parseFloat(idmoi) ) {
            idmoi = mangsp[i].id;
        
        }
        
    }

    idmoi = parseInt(idmoi) + 1;
    idmoi = idmoi.toString();
    console.log("kq: " +idmoi);

    // Gửi yêu cầu HTTP POST chứa dữ liệu đăng ký mới đến máy chủ
    fetch('http://localhost:3000/donhang', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idmoi,
            user: userName,
            date: formattedDate,
            listsanpham: listSP,
            status: 0
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Có lỗi khi gửi yêu cầu.');
        }
        return response.json();
    })
    .then(data => {
        // Xử lý phản hồi từ máy chủ sau khi tạo đơn hàng mới
        console.log('Đơn hàng mới đã được tạo:', data);
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu:', error);
    });

}

var mangsp = [];
function getListsp() {
    // Gửi yêu cầu GET đến API để lấy danh mục
    return fetch('http://localhost:3000/donhang')
        .then(response => {
            if (!response.ok) {
                throw new Error('Có lỗi khi tải danh mục từ API.');
            }
            return response.json(); // Chuyển đổi phản hồi thành JSON
        })
        .then(product => {
            // Trả về mảng danh mục đã nhận được từ API
            product.forEach(element => {
               mangsp.push(element);
            });
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}
getListsp();

