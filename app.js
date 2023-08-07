import express from 'express';
import multer from 'multer';
import routerProducts from './routers/products.js';
import config from './config.js';

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const destinationFolder = 'public/img/products';
        const error = null;
        callback(error, destinationFolder);
    },

    filename: function (req, file, callback) {
        const originalFilename = file.originalname.toLowerCase();
        const [filenameWithoutExtension, extension] = originalFilename.split('.');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newFilename = `${uniqueSuffix}-${filenameWithoutExtension.replaceAll(' ', '-')}.${extension}`;
        callback(null, newFilename);
    }
});

const fileFilter = (req, file, callback) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.originalname.split('.').pop().toLowerCase();
    const mimeTypeIsValid = validExtensions.includes(extension) && validMimeTypes.includes(file.mimetype);
    callback(null, mimeTypeIsValid);
};

const upload = multer({ storage, fileFilter});


const PORT = config.PORT;

app.use(express.static('public', { extensions: ['html', 'html']}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/products', routerProducts);

// "upload.single('archivo')"" es un middleware que se ejecuta antes que el callback "function (req, res, next)"
app.post('/upload', upload.single('main-photo'), function (req, res, next) {
    if (req.file) {
        console.log(req.file);
        res.send({status: 'ok'});
    } else {
        res.status(415).send('<h1>Se produjo un error.</h1>');
        // res.status(415).send({ error: 'Se produjo un error.' });
    }
});

const server = app.listen (PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('No se pudo iniciar Express: ', error));

