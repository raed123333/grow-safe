
const Messenger =require("../models/Messenger");
exports.getMessenger=async (req,res)=>{
        try{
                const messengers=await Messenger.findAll();
                res.json(messengers);
        }catch(err){
                res.status(500).json({error:err.message});
        }
};
exports.createMessenger=async (req,res)=>{
        try{
                const {sender_id,reciever_id,message} = req.body;
                const newMessenger= await Messenger.create({sender_id,reciever_id,message});
                res.status(200).json(newMessenger);

        }catch(err){
                res.status(500).json({error:err.message});
        }


};