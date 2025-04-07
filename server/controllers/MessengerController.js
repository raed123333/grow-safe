const Messenger = require("../models/Messenger");
const Parent = require("../models/Parent");
const Enfant = require("../models/Enfant");

// Send Message (Parent to Enfant or Enfant to Parent)
exports.sendMessage = async (req, res) => {
    try {
        const { sender_id, receiver_id, sender_type, message } = req.body;

        if (!["parent", "enfant"].includes(sender_type)) {
            return res.status(400).json({ error: "Type d'expéditeur invalide (parent/enfant requis)" });
        }

        const senderExists = sender_type === "parent" ? await Parent.findByPk(sender_id) : await Enfant.findByPk(sender_id);
        const receiverExists = sender_type === "parent" ? await Enfant.findByPk(receiver_id) : await Parent.findByPk(receiver_id);

        if (!senderExists || !receiverExists) {
            return res.status(404).json({ error: "Expéditeur ou destinataire non trouvé" });
        }

        const newMessage = await Messenger.create({ sender_id, receiver_id, sender_type, message });
        res.status(201).json({ message: "Message envoyé avec succès", data: newMessage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Messages by Parent or Enfant
exports.getMessages = async (req, res) => {
    try {
        const { user_id, user_type } = req.params;

        if (!["parent", "enfant"].includes(user_type)) {
            return res.status(400).json({ error: "Type d'utilisateur invalide (parent/enfant requis)" });
        }

        const messages = await Messenger.findAll({
            where: {
                [user_type === "parent" ? "receiver_id" : "sender_id"]: user_id
            },
            order: [["message_time", "DESC"]]
        });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a Message
exports.deleteMessage = async (req, res) => {
    try {
        const { idmess } = req.params;
        const message = await Messenger.findByPk(idmess);
        if (!message) {
            return res.status(404).json({ error: "Message non trouvé" });
        }
        await message.destroy();
        res.json({ message: "Message supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
