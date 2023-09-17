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

    const previousImage = user.imageProfile;
    if (previousImage) {
      await cloudinary.upload.destroy(previousImage);
    }

    const update = {
      $set: {
        name: name,
        lastName: lastName,
        location: location,
        favorite: favorite
      }
    };

    if (req.file) {
      const newImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Foto de perfil'
      });
      update.$set.imageProfile = newImage.secure_url;
    }

    const updateUser = await Users.findByIdAndUpdate(id, update, { new: true });

    res.status(200).json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al actualizar usuario');
  }
};

module.exports = { createUser, updateUser };
