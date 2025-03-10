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


/////////////////////////////////////////////////////////////////
// ParentController.js



// Login a Parent
exports.loginParent = async (req, res) => {
  try {
    const { email, motpasse } = req.body;

    // Find the parent by email
    const parent = await Parent.findOne({ where: { email } });
    
    if (!parent) {
      return res.status(404).json({ error: 'Parent non trouvé' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = motpasse==parent.motpasse;

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Successful login
    res.status(200).json({ message: 'Connexion réussie', parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
