const Users = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const cloudinary = require('../utils/cloudinary.js');

const createUser = async (req, res) => {
  try {
    const {
      name,
      lastName,
      imageProfile,
      email,
      password,
      genre,
      birthday,
      location,
      card,
      favorite,
      orders,
      ban
    } = req.body;

    const existingEmail = await Users.findOne({ 'user.email': email });

    if (existingEmail) {
      return res.status(404).json({ message: 'El email ya está registrado' });
    }

    const hashPassword = password ? await bcrypt.hash(password, 10) : '';

    const newUser = new Users({
      user: {
        name,
        lastName,
        imageProfile,
        email,
        password: hashPassword,
        genre,
        birthday,
        location,
        card,
        favorite,
        orders,
        ban
      }
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al crear usuario');
  }
};

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

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no existe' });
    }

    const newPassword = password ? await bcrypt.hash(password, 10) : '';

    user.user[0].password = newPassword;
    const updatedUser = await user.save();

    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al actualizar la contraseña');
  }
};

module.exports = { createUser, updateUser, updatePassword };
