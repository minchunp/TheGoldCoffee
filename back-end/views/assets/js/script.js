// bấm chọn 1 sp sẽ lưu sản phẩm vừa chọn vào mảng dưới dạng 1 đối tượng
// hiện sản phẩm vừa chọn trong mục showSP và giỏ hàng
// khi người dùng click chọn lại sản phẩm hoặc tăng số lượng thì sẽ cập nhật lại số lượng ở 2 nơi
// lưu ý: - phân biệt đã chọn và chưa chọn sản phẩm 
//        - tạo hàm kiểm tra mảng giỏ hàng: niếu tìm được sản phẩm nào trong giỏ có mã trùng với sp vừa chọn thì trả về vị trí ngược lại niếu chạy hết vòng lặp không tìm ra thì trả về -1
//          (trong cuối hàm chọn sp niếu chưa chọn sp thì add nó vào, ngược lại lấy số lượng cũ đã lưu trong mảng cộng với số lượng mới vừa thêm vào sau đó gáng lại số lượng vào mảng) 

// Check số lượng input
  const inputs = document.querySelectorAll('input[data-min]');
  inputs.forEach(input => {
    input.addEventListener('change', function() {
      if (this.value < this.getAttribute('data-min')) {
        this.value = this.getAttribute('data-min');
      }
    });
  });

// On & Off Show Product
function showOnOff() {
    let x = document.getElementById('showGH');
    if(x.style.display == "none") {
        x.style.display = "block"
    } else if(x.style.display == "block") {
        x.style.display = "none"
    }
    checkPay();
}

// tạo mảng và dối tượng sản phẩm
var arrGH = []; 
arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
var giohang = {
    id: "",
    masp: "",
    hinhsp: "",
    tensp: "",
    giasp: "",
    soluongsp: "",
    addSP: function(id, ma,hinh,ten,gia,soluong) {
      this.id = id;
        this.masp = ma;
        this.hinhsp = hinh;
        this.tensp = ten;
        this.giasp = gia;
        this.soluongsp = soluong;
    }
};

// chọn hàng, lấy thông tin sản phẩm và add vào mảng
function chonhang(x) {

    //cách lúc học môn js cơ bản 
    // var card = x.parentElement.parentElement.children;
    // var ma = card[4].innerText;
    // var hinh = card[0].src;
    // var ten = card[1].children[0].innerText;
    // var tam = card[2].innerText;
    // var gia = tam.slice(0, -2);
    // var soluong = card[3].children[1].value;



    var card = x.closest('.item_sp');
    var ten = card.querySelector('h6 a').textContent;
    var gia = parseFloat(card.querySelector('p').textContent.replace(/,/g, ""));
    // var hinh = card.querySelector('img').src; 
    var hinh = card.querySelector('.hinhanh').textContent; 

    var soluong = parseInt(card.querySelector('input[type="text"]').value);
    var ma = card.querySelector('.masp').textContent;
    var idne = card.querySelector('.idsp').textContent;


    var newAdd = new giohang.addSP(idne, ma,hinh,ten,gia,soluong);
    console.log(newAdd);
    // check xem sản phẩm có trong giỏ chưa[tức mảng]
    arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
    if(arrGH == null) {
      arrGH = [];
    }
    let kqCheck = checkTonTai(arrGH,ma);
    if(kqCheck == -1) {
      arrGH.push(newAdd);
    } else {
      // arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
      arrGH[kqCheck].soluongsp = Number(arrGH[kqCheck].soluongsp) + Number(soluong);
      // sessionStorage.setItem("JsonGH", JSON.stringify(arrGH));
    }

    lammoiGH(arrGH);

    sessionStorage.setItem("JsonGH", JSON.stringify(arrGH));

    checkPay();
}

// check xem sản phẩm có trong giỏ chưa[tức mảng]
function checkTonTai(arrGH,ma) {
   for(let i = 0; i < arrGH.length; i++) {
      if(arrGH[i].masp == ma) {
        return i;
      }
   }
   return -1;
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
    var addChild =  '<div class="product_product"> <div class="product_icon" style="height: 130px; width: 10%;"><img src="'+ sptam.hinhsp +'" alt="" class="icon-pd"></div> <div class="product_name" style="height: 130px; width: 40%; padding: 10px;">' + sptam.tensp + '</div> <div class="product_quantity" style="height: 130px; width: 15%;">' + sptam.soluongsp +'</div> <div class="product_subtotal" style="height: 130px; width: 15%;">' + chuyenso(sptam.giasp) +' Đ</div> <div class="product_delete" style="height: 130px; width: 5%;" onclick="xoaSP(this)"><i class="fa-regular fa-circle-xmark dele-btn"></i></div> <div class="masp" style="display: none;">'+ sptam.masp +'</div> </div>'
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




// xóa sản phẩm - vai trò: xóa 1 sản phẩm khỏi mảng, giao diện(chạy lại hàm lammoiGH)
function xoaSP(y) {
  var row = y.parentElement;
  var childs = y.parentElement.children;
  var maCheck = childs[5].innerText;  
  for(let i = 0; i < arrGH.length; i++) {
    if(maCheck == arrGH[i].masp) {
      arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
      arrGH.splice(i, 1);
      sessionStorage.setItem("JsonGH", JSON.stringify(arrGH));
    }
  }
  document.getElementById('showGH').removeChild(row);

  checkPay();
}

arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
if(arrGH == null) {
  arrGH = [];
}
lammoiGH(arrGH);


// hover item
const itemSpList = document.querySelectorAll('.item_sp');

for (let i = 0; i < itemSpList.length; i++) {
  itemSpList[i].addEventListener('mouseover', function() {
    this.style.boxShadow = '0 0 20px #16b8ba';
  });
  
  itemSpList[i].addEventListener('mouseout', function() {
    this.style.boxShadow = '';
  });
}

function checkPay() {
  dsSanPham = JSON.parse(sessionStorage.getItem("JsonGH"));
  var checkthua = document.getElementById('showGH').children;
  if(checkthua.length < 2) {
      let tt = document.getElementById('pay');
      tt.style.display = "none";
  }

  let soL = document.querySelector("#countCart");
  soL.innerText = dsSanPham.length;
}

// function chitiet() {

//   var sl = document.getElementById("showSL").value;

//   var newAdd = mang[0];

//   arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
//     if(arrGH == null) {
//       arrGH = [];
//     }
//     let kqCheck = checkTonTai(arrGH,mang[0].masp);
//     if(kqCheck == -1) {
//       arrGH.push(newAdd);
//     } else {
//       // arrGH = JSON.parse(sessionStorage.getItem("JsonGH"));
//       arrGH[kqCheck].soluongsp = Number(arrGH[kqCheck].soluongsp) + Number(sl);
//       // sessionStorage.setItem("JsonGH", JSON.stringify(arrGH));
//     }

//     console.log(arrGH[kqCheck].soluongsp);

//     sessionStorage.setItem("JsonGH", JSON.stringify(arrGH));
//     console.log(newAdd)

// }

// luu thong tin 1 sp de hien ben chi tiet

function luuct(x) {
  var luusp = [];
  var card = x.parentElement.children;
  var ma = card[4].innerText;
  var hinh = card[0].src;
  var ten = card[1].children[0].innerText;
  var tam = card[2].innerText;
  var gia = tam.slice(0, -2);
  var sl = card[3].children[1].value;
  var soluong = parseInt(sl);
  var newAdd = new giohang.addSP(ma,hinh,ten,gia,soluong);
  luusp.push(newAdd)
  sessionStorage.setItem("luuSP", JSON.stringify(luusp));
  console.log(luusp)
}

checkPay();




