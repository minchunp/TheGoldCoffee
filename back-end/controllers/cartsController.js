
var modelCart = require("../models/Cart");

class CartsController {
    async index(req, res, next) {
        try {
            var data = await modelCart.find();
            const sttArray = [];
            data.forEach((item, index) => {
                sttArray.push(index + 1);
            });
            const statusArray = [];
            data.forEach((item) => {
                let vt = '';
                if(item.trangthai == 0) {
                    vt = 'đang xử lí';
                } else {
                    vt = 'hoàn thành';
                }
                statusArray.push(vt);
            });
            res.render('listcart', {layout: false, data: data, sttArray: sttArray, statusArray: statusArray});
        } catch (err) {
            next(err);
        }
    }


}

module.exports = new CartsController();