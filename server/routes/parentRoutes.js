const express =require('express');
const {createParent,updateParent,deleteParent} = require('../controllers/ParentController');

const router = express.Router();

router.post('/', createParent);

router.put('/:idp', updateParent);

router.delete('/:idp', deleteParent);
module.exports=router;