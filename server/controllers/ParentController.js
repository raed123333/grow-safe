const Parent=require("../models/Parent");

// create a new Parent 
exports.createParent=async(req ,res)=>{
        try{
                const {nom,prenom,image,email,motpasse} =req.body;
                const newParent = await Parent.create({nom,prenom,image,email,motpasse});
                res.status(201).json(newParent);
        }catch(err){
                res.status(500).json({error:err.message});
        }
};

//Update a Parent
exports.updateParent=async(req ,res)=>{
        try{
                const parent =await Parent.findByPk(req.params.idp);
                if(!parent) return res.status(404).json({error: 'Parent non trouvé'});

        }catch(err){
                res.status(500).json({error:err.message});
        }
};

//delete a Parent 
exports.deleteParent=async (req,res)=>{
        try{
                const parent=await Parent.findByPk(req.params.idp);
                if(!parent) return res.status(404).json({error: 'Parent non trouvé'});
                await parent.destroy();
                res.json({message: 'Parent supprimé'}); 

        }catch(err){
                res.status(500).json({error:err.message});

        }
}