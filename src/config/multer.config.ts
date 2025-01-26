import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/products', // Thư mục lưu trữ
    filename: (_req, file, callback) => {
      // Đặt tên file: product-<timestamp>.<extension>
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname);
      callback(null, `product-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (_req, file, callback) => {
    // Chỉ cho phép các định dạng ảnh
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};
