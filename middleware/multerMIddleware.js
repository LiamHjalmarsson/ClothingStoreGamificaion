import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set the directory where uploaded files will be stored
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        // set the name of the uploaded file
        cb(null, file.originalname);
    },
});


const upload = multer({ storage });

export default upload;