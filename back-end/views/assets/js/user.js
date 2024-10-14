var users = [];

let user = {
    id: "",
    name: "",
    image: "",
    tk: "",
    mk: "",
    email: "",
    sdt: "",
    vt: "",
    user: function(id, name, image, tk, mk, email,sdt,vt) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.tk = tk;
        this.mk = mk;
        this.email = email;
        this.sdt = sdt;
        this.vt = vt;
    }
};





// Sử dụng fetch để lấy dữ liệu từ db.json 
async function getUser() {
    try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();

        console.log('Đã nhận dữ liệu user');

        // Kiểm tra xem data có phải là mảng không
        if (Array.isArray(data)) {
            data.forEach(item => {
                let adduser = new user.user(item.id, item.name, item.image, item.tk, item.mk, item.email, item.sdt, item.vt); 
                users.push(adduser);
            });
    
            // console.log(users);
        } else {
            console.error('Dữ liệu không phải là một mảng.');
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu: ', error);
    }
}

getUser();

function dangNhap(tk,mk) {
    let foundUser = null;
    for (const user of users) {
        if (user.tk == tk && user.mk == mk) {
            foundUser = user;
            break;
        }
    }

    //luu
        sessionStorage.setItem("luuTK", JSON.stringify(foundUser));
        console.log(JSON.parse(sessionStorage.getItem("luuTK")));
        // window.location.href = "index.html";

    // lay
    // const tuychon = JSON.parse(sessionStorage.getItem("luuTK"));        
    
}

function dangXuat() {
    sessionStorage.removeItem("luuTK");
    location.reload();
    // window.location.href = "index.html";
}

// function trangThaiLogin() {
//     const luuTKExists = sessionStorage.getItem("luuTK") !== null;

//     if (luuTKExists) {
//     // "luuTK" tồn tại trong sessionStorage
//     const daDangNhap = JSON.parse(sessionStorage.getItem("luuTK")); 
//     document.write("<li><a href=''>" + daDangNhap.name + "</a></li>");
//     } else {
//     // "luuTK" không tồn tại trong sessionStorage
//     document.write("<li><a href='login.html'>ĐĂNG NHẬP</a></li>");
//     }
// }

