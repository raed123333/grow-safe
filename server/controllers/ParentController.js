const fs = require("fs");
const path = require("path");
const Parent = require("../models/Parent");
const axios = require("axios");

const saveBase64Image = (base64String, folder = "uploads") => {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return null;
  const ext = matches[1].split("/")[1];
  const base64Data = matches[2];
  const fileName = `${Date.now()}.${ext}`;

  const uploadDir = path.join(__dirname, "..", folder);
  const filePath = path.join(uploadDir, fileName);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(filePath, base64Data, "base64");
  return fileName;
};

exports.createParent = async (req, res) => {
  try {
    const { nom, prenom, email, motpasse, image } = req.body;

    let imageName = null;
    if (image) {
      imageName = saveBase64Image(image);

      // Save Base64 and get filename
    }

    const newParent = await Parent.create({
      nom,
      prenom,
      email,
      motpasse,
      image: imageName,
    });
    res.status(201).json(newParent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Parent (with optional new image)
exports.updateParent = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.idp);
    if (!parent) return res.status(404).json({ error: "Parent non trouvé" });

    const { nom, prenom, motpasse, image } = req.body;

    let imageName = parent.image;
    if (image) {
      imageName = saveBase64Image(image);
    }

    await parent.update({ nom, prenom, motpasse, image: imageName });

    res.json({ message: "Parent mis à jour", parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a Parent
exports.loginParent = async (req, res) => {
  try {
    const { email, motpasse } = req.body;

    // Find the parent by email
    const parent = await Parent.findOne({ where: { email } });

    if (!parent) {
      return res.status(404).json({ error: "Parent non trouvé" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = motpasse == parent.motpasse;

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Successful login
    res.status(200).json({ message: "Connexion réussie", parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//delete a Parent
exports.deleteParent = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.idp);
    if (!parent) return res.status(404).json({ error: "Parent non trouvé" });
    await parent.destroy();
    res.json({ message: "Parent supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.findAll();
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Parent by ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findByPk(req.params.idp);
    if (!parent) return res.status(404).json({ error: "Parent non trouvé" });

    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEnfantApps = async (req, res) => {
  try {
    const response = await axios.get("http://192.168.137.219:8080/get-apps");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching app list:", error);
    res.status(500).send("Error fetching app list");
  }
};

exports.lockEnfantApps = async (req, res) => {
  console.log("Received body:", req.body); // Log to see what is received
  const { packageName, password } = req.body;

  // Check if packageName and password are provided
  if (!packageName || !password) {
    return res.status(400).send("Package name and password are required");
  }

  console.log("Package Name:", packageName);
  console.log("Password:", password);

  try {
    // Log the data being sent to the Android server
    console.log("Sending to Android server:", {
      packageName,
      password,
    });

    // Send the data as JSON
    const response = await axios.post(
      "http://192.168.137.219:8080/lock-app",
      {
        packageName,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure the request is sent as JSON
        },
      }
    );

    console.log("Response from Android:", response.data); // Log Android response for debugging
    res.json({ message: "App locked successfully", status: response.status });
  } catch (error) {
    console.error("Error locking app:", error);
    res.status(500).send("Error locking app");
  }
};



