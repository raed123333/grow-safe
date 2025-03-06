const Donnees =require("../models/Donnees");
exports.getDonnees=async(req , res)=>{
        try{
                const donnees=await Donnees.findAll();
                res.json(donnees);

        }catch(err){
                res.status(500).json({error: err.message});

        }
};
exports.getDonneeById=async(req , res)=>{
        try{
                const donnee=await Donnees.findByPk(req.params.iddon);
                if(!donnee) return res.status(404).json({error:"Donnée non trouvée"});
                res.json(donnee);
        }catch(err){
                console.error(err);
                res.status(500).json({message: err.message});
        }
};
exports.createDonnee=async(req , res)=>{
        try{
                const {cap,image,gestion,local,appblock}=req.body;
                const newDonnee=await Donnees.create({cap,image,gestion,local,appblock});
                res.status(201).json(newDonnee);

        }catch(err){
                console.error(err);
                res.status(500).json({message: err.message});
        }
};
exports.updateDonnee=async(req,res)=>{
        try{
                const donnee=await Donnees.findByPk(req.params.iddon);
                if(!donnee) return res.status(404).json({error:"Donnée non trouvée"});
                donnee.update(req.body);
                res.json(donnee);

        }catch(err){
                console.error(err);
                res.status(500).json({message: err.message});
        }
};

exports.deleteDonnee= async (req,res)=>{
        try{
                const donnee=await Donnees.findByPk(req.params.iddon);
                if(!donnee) return res.status(404).json({error:"Donnée non trouvée"});
                await donnee.destroy();
                res.json({message:"Donnée supprimée"});

        }catch(err){
                console.error(err);
                res.status(500).json({message: err.message});
        }
};