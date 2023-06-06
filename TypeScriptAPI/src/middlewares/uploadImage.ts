import multer, { Multer } from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination folder to save uploaded image
    cb(null, 'src/images/');
  },
  filename: function (req, file, cb) {
    // filename for uploaded image
    const originalName = file.originalname.replace(/\s/g, '-').split('.').slice(0, -1).join('.');;
    const date = Date.now();
    const filename = `${originalName}-${date}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const uploadImage: Multer = multer({ storage });

export default uploadImage;