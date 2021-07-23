const router = require('express').Router();
const todoModal = require('../modals/todo');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpeg" && ext !== ".png" && ext !== ".gif" && ext !== ".pdf") {
            return callback(('Only jpsg and png gif and pdf file are allowed'));
        }
        callback(null, true);
    },
}).single('media');

/**
 * Add todo
 */

router.post('/', async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err })
            }
            let name = null;
            const { title, description, status } = req.body;
            if (!title || !description || !status) {
                return res.status(400).json({ message: "Title description status are required" })
            }
            
            if(req.file){
                name = req.file.filename ? req.file.filename : undefined;
            }

            const newContact = new todoModal({
                title, description,
                media: name,
                status
            });
            const resp = await newContact.save();
            return res.status(200).json({ message: "Data inserted", resp })
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "something went wrong", error })
    }
})

/**
 * get all todo
 */

router.get('/', async (req, res) => {
    try {
        const todos = await todoModal.find();
        let open = [];
        let progress = [];
        let completed = [];

        
        todos.filter(ele => {
            if(ele.status === "open"){
                open.push(ele)
            }else if(ele.status === "progress"){
                progress.push(ele)
            }else{
                completed.push(ele)
            }
        })
        
        let Data = {open,progress,completed};
        
        // console.log(Data);
        
        return res.status(200).json({ message: "lists of todos", todos:Data });
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", error })
    }
})

/**
 * Get single todo
 */

 router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    try {
        const resp = await todoModal.findById(id);
        return res.status(200).json({ message: "todo deleted", resp })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", error })
    }
})


/**
 * Delete todo
 */

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    try {
        const resp = await todoModal.findByIdAndDelete(id);
        return res.status(200).json({ message: "todo deleted", resp })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", error })
    }
})

/**
 * Update todo
 */

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    try {
        const resp = await todoModal.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ message: "Todo updated", resp })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", error })
    }
})

/**
 * Update status todo
 */

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    if(!req.body.status){
        return res.status(400).json({ message: "Please provide status" })   
    }
    if (!id) {
        return res.status(400).json({ message: "id is required" })
    }
    try {
        const resp = await todoModal.findByIdAndUpdate(id, {status:req.body.status}, { new: true });
        return res.status(200).json({ message: "Data inserted", resp })
    } catch (error) {
        return res.status(400).json({ message: "something went wrong", error })
    }
})


module.exports = router;
