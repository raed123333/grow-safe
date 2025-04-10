const Prix=require("../models/Prix");
exports.getPrix=async(req,res)=>{
        try{
                const prix=await Prix.findAll();
                res.json(prix);

        }catch(err){
                res.status(500).json({error:err.message});

        }
};
//get prix by idprix
exports.getPrixById=async(req,res)=>{
        try{
                const prix=await Prix.findByPk(req.params.idPrix);
                if(!prix) return res.status(404).json({error:"Prix non trouvé"});
                res.json(enfant);

        }catch(err){
                res.status(500).json({error:err.message});
        }
};

//create a new enfant 
exports.createPrix=async(req,res)=>{
        try{
                const{idPrix,nomPrix,scorePrix,statut,idp}=req.body;
                const newPrix=await Prix.create({idPrix,nomPrix,scorePrix,statut,idp});
                res.status(201).json(newPrix);

        }catch(err){
                res.status(500).json({error:err.message});
        }
}
//update a Prix
exports.updatePrix=async(req,res)=>{
        try{
                const prix=await Prix.findByPk(req.params.idPrix);
                if(!prix) return res.status(404).json({error:"aucun Prix"});
                const {idPrix,nomPrix,scorePrix,statut,idp}=req.body;
                await Prix.update({nomPrix,scorePrix,statut});
                res.json(prix);

        }catch(err){
                res.status(400).json({error:err.message});
        }
};
//delete prix 
exports.deletePrix=async(req,res)=>{
        try{
                const prix=await Prix.findByPk(req.params.idPrix);
                if(!prix) return res.status(404).json({error:"aucun prix"});
                await prix.destroy();
                res.json({message:"prix supprimé"});

        }catch(err){
                res.status(400).json({error:err.message});
        }
}