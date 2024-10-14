let dem = 1;

setInterval(function(){
    if(dem == 0) {
        let myMargin = document.getElementById('list');
        myMargin.style.marginLeft = "0px";
    }

    if(dem == 1) {
        let myMargin = document.getElementById('list');
        myMargin.style.marginLeft = "calc((100vw - 16px)*(-1))";
        // console.log("0 = " + dem)
    }

    if(dem == 2) {
        let myMargin = document.getElementById('list');
        myMargin.style.marginLeft = "calc((100vw - 16px)*(-2))";
        // console.log("0 = " + dem)
    }

    dem++;
    if(dem >= 3) {
        dem = 0;
    }
}, 4000);