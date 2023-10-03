const Users = require('../database/models/userModel');
const cloudinary = require('../utils/cloudinary.js');

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, location, favorite } = req.body;

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const previousImage = user.user[0].imageProfile;
    if (previousImage) {
      await cloudinary.uploader.destroy(previousImage);
    }

    user.user[0].name = name;
    user.user[0].lastName = lastName;
    user.user[0].location = location;
    user.user[0].favorite = favorite;

    if (req.file) {
      const newImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Foto de perfil'
      });
      user.user[0].imageProfile = newImage.secure_url;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al actualizar usuario');
  }
};

module.exports = { updateUser };
