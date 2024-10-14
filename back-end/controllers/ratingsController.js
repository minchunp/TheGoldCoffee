
var modelRating = require("../models/Rating");

class RatingsController {
    async index(req, res, next) {
        try {
            var data = await modelRating.find();
            const sttArray = [];
            data.forEach((item, index) => {
                sttArray.push(index + 1);
            });
            res.render('listRating', {layout: false, data: data, sttArray: sttArray});
        } catch (err) {
            next(err);
        }
    }

        // rating/delete/id
        async delete(req, res, next) {
            var id = req.params.id;
    
            try {
                // Sử dụng findByIdAndDelete() để tìm và xóa document dựa trên id
                const deletedRating = await modelRating.findByIdAndDelete({_id: id});
    
                if (!deletedRating) {
                    return res.status(404).json({ message: 'Không tìm thấy đánh giá để xóa.' });
                }
    
                return res.status(200).json({ message: 'Xóa đánh giá thành công.', deletedRating });
            } catch (error) {
                console.error('Lỗi khi xóa đánh giá:', error);
                return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đánh giá.' });
            }
        }


}

module.exports = new RatingsController();