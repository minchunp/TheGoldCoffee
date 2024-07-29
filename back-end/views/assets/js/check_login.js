function login() {

    //kiểm tra form
    let check_tk = document.forms["loginmixi"]["tkmixi"].value;
    if (check_tk == "") {
        alert("mời nhập tài khoản")
        return false;
    } else if(check_tk.length < 6) {
        alert("mời nhập tài khoản lớn hơn 6 kí tự");
        return false;
    }

    let check_mk = document.forms["loginmixi"]["mkmixi"].value;
    
    if(check_mk == "") {
        alert("mời nhập mật khẩu");
        return false;
    } else if(check_mk.length < 6) {
        alert("mời nhập mật khẩu lớn hơn 6 kí tự");
        return false;
    }

    //tiến hành đăng nhập
    dangNhap(check_tk,check_mk);
    
} 

function signup() {
    console.log("hi")
    let check_use = document.forms["signupmx"]["usename"].value;
    let check_email = document.forms["signupmx"]["email"].value;
    let check_passw = document.forms["signupmx"]["passw"].value;
    let check_passww = document.forms["signupmx"]["passww"].value;

    if(check_use == "") {
        alert("mời nhập tài khoản")
        return false;
    } else if(check_use.length < 6) {
        alert("mời nhập tài khoản lớn hơn 6 kí tự");
        return false;
    }
    if(check_email == "") {
        alert("mời nhập email")
        return false;
    } 

    if(check_passw == "") {
        alert("mời nhập mật khẩu")
        return false;
    } else if(check_passw.length < 6) {
        alert("mời nhập mật khẩu lớn hơn 6 kí tự");
        return false;
    }
    if(check_passww == "") {
        alert("mời nhập mật khẩu")
        return false;
    } else if(check_passww.length < 6) {
        alert("mời nhập mật khẩu lớn hơn 6 kí tự");
        return false;
    }

    if(check_passw != check_passww) {
        alert("Mật khẩu phải trùng nhau");
        return false;
    }

    function isValidEmail(email) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{1,10}\.[a-zA-Z]{1,}$/;
        return pattern.test(email);
    }

    const email = check_email;
    if (isValidEmail(email)) {
        // return true;
        // return false;
        // alert("email sai định dạng")
    } else {
        alert("email sai định dạng")
        return false;
    }

    register();
}


// Tạo tài khoản mới
function register() {
    // Lấy thông tin từ form
    var userMoi = document.querySelector('input[name="usename"]').value;
    var emailMoi = document.querySelector('input[name="email"]').value;
    var matkhauMoi = document.querySelector('input[name="passw"]').value;

    var idmoi = 0;

    // getListuser();
    for (let i = 0; i < users.length; i++) {
        if(users[i].id > idmoi) {
            idmoi = users[i].id;
        }
        
    }

    console.log(users);
    console.log(idmoi);

    idmoi = parseInt(idmoi) + 1;
    idmoi = idmoi.toString();
    // Gửi yêu cầu HTTP POST chứa dữ liệu đăng ký mới đến máy chủ
    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idmoi,
            name: 'Tài Khoản',
            image: '',
            tk: userMoi,
            mk: matkhauMoi,
            email: emailMoi,
            sdt: '',
            vt: 1
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Có lỗi khi gửi yêu cầu.');
        }
        return response.json();
    })
    .then(data => {
        // Xử lý phản hồi từ máy chủ sau khi tạo tài khoản mới
        console.log('Tài khoản mới đã được tạo:', data);
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu:', error);
    });
}


// function getListuser() {
//     // Lấy dữ liệu từ tệp JSON sử dụng fetch
//     fetch('http://localhost:3000/user')
//     .then(response => {
//     if (!response.ok) {
//         throw new Error('Có lỗi khi tải dữ liệu từ tệp JSON');
//     }
//     return response.json();
//     })
//     .then(data => {
//     // Xử lý dữ liệu đã tải được từ tệp JSON
//     // console.log(data);

//     const users = data.user;
//     console.log(users);

//     })
//     .catch(error => {
//     console.error('Lỗi:', error);
//     });

// }


