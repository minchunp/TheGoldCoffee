var sanphams = [];

let sanpham = {
    id: "",
    masp: "",
    tensp: "",
    giasp: "",
    hinh: "",
    madm: "",
    khoitao: function(id, masp, tensp, giasp, hinh, madm) {
        this.id = id;
        this.masp = masp;
        this.tensp = tensp;
        this.giasp = giasp;
        this.hinh = hinh;
        this.madm = madm;
    },
    nhapsp: function() {
        this.masp = prompt("masp");
        this.tensp = prompt("tensp");
        this.giasp = prompt("giasp");
        this.hinh = prompt("hinh");
    },
    xuatALLsp: function(sanphams) {
        for (let i = 0; i < 8; i++) {
            let addGD = this.xuatmotsanpham(sanphams[i]);
            var rangee = document.createRange();
            var fragmentt = rangee.createContextualFragment(addGD);
            document.getElementById('list_item').appendChild(fragmentt);
        }
    },
    xuatmotsanpham: function(sanpham) {
        let spTam = sanpham;
        let addShow = '<div class="item_sp" style="background: #f0f0f0ff;"><img class="thayanh" src="'+ spTam.hinh +'" width="100%" height="auto" style="box-shadow: 0px 0px 5px gray;"><h6 style="text-align: center; margin-top: 10px;" onclick="luuct(this)"><a href="#">'+ spTam.tensp +'</a></h6><p style="text-align: center; margin-top: 10px;">'+ chuyenso(spTam.giasp) +' <u>đ</u></p><div class="buy"> <span>số lượng: </span><input type="text" class="chonsl" value="1" data-min="0"><button class="nutmua" onclick="chonhang(this);">Mua</button> </div><div class="masp" style="display: none;">'+ spTam.masp +'</div><div class="idsp" style="display: none;">'+ spTam.id +'</div><div class="hinhanh" style="display: none;">'+ spTam.hinh +'</div></div>';
        return addShow;
    }
};

// Hàm chuyển số sang chuỗi có định dạng
function chuyenso(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// // Sử dụng fetch để lấy dữ liệu từ db.json
// fetch('http://localhost:3000/product')
//     .then(response => response.json())
//     .then(data => {
//         // Lưu dữ liệu vào mảng sanphams
//         data.forEach(item => {
//             let newSanPham = new sanpham.khoitao(item.id, item.ma, item.name, item.price, item.image); 
//             sanphams.push(newSanPham);
//         });

//         // Gọi hàm xuatALLsp để hiển thị sản phẩm
//         sanpham.xuatALLsp(sanphams);
//         console.log(sanphams);
//     })
//     .catch(error => console.error('Error:', error));


    // Sử dụng fetch để lấy dữ liệu từ db.json 
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:3000/product');
            const data = await response.json();

            console.log('Đã nhận dữ liệu product');

            // Kiểm tra xem data có phải là mảng không
            if (Array.isArray(data)) {
                data.forEach(item => {
                    let newSanPham = new sanpham.khoitao(item.id, item.ma, item.name, item.price, item.image, item.madm); 
                    sanphams.push(newSanPham);
                });
        
                // Gọi hàm xuatALLsp để hiển thị sản phẩm
                sanpham.xuatALLsp(sanphams);
            } else {
                console.error('Dữ liệu không phải là một mảng.');
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu: ', error);
        }
    }

    fetchData();

