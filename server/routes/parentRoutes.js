const express =require('express');
const {createParent,updateParent,deleteParent,loginParent} = require('../controllers/ParentController');

const router = express.Router();

router.post('/', createParent);

router.post('/login', loginParent);

router.put('/:idp', updateParent);

router.delete('/:idp', deleteParent);
module.exports=router;