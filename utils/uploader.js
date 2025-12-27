import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("DEST", file);
        
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const fileName = `${Math.round(Math.random()*1E9)}_${file.originalname}` 
        req.body.img = fileName
        console.log("FILENAME...", file, req.body);
        cb(null, fileName)
    }
})
const upload = multer({ storage,
    fileFilter: (req, file, cb) => {
        console.log('reqFILE', req.file)
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    }
 })

 export default upload;