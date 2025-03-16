const express =require('express');
const {createParent,updateParent,deleteParent,loginParent,getParentById} = require('../controllers/ParentController');

const router = express.Router();

router.get('/:idp', getParentById);

router.post('/', createParent);

router.post('/login', loginParent);

router.put('/:idp', updateParent);

router.delete('/:idp', deleteParent);
module.exports=router;