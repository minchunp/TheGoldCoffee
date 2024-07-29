
var modelUser = require("../models/User");

class UsersController {
    async index(req, res, next) {
        try {
            var data = await modelUser.find();
            const sttArray = [];
            data.forEach((item, index) => {
                sttArray.push(index + 1);
            });
            const vtArray = [];
            data.forEach((item) => {
                let vt = '';
                if(item.vt == 0) {
                    vt = 'Admin';
                } else {
                    vt = 'User';
                }
                vtArray.push(vt);
            });
            res.render('listUser', {layout: false, data: data, sttArray: sttArray, vtArray: vtArray});
        } catch (err) {
            next(err);
        }
    }

        // user/delete/id
        async delete(req, res, next) {
            var id = req.params.id;
    
            try {
                // Sử dụng findByIdAndDelete() để tìm và xóa document dựa trên id
                const deletedUser = await modelUser.findByIdAndDelete({_id: id});
    
                if (!deletedUser) {
                    return res.status(404).json({ message: 'Không tìm thấy user để xóa.' });
                }
    
                return res.status(200).json({ message: 'Xóa user thành công.', deletedUser });
            } catch (error) {
                console.error('Lỗi khi xóa user:', error);
                return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa user.' });
            }
        }


}

module.exports = new UsersController();