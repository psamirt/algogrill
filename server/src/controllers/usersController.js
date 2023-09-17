const Users = require('../database/models/userModel');
const bcrypt = require('bcrypt');

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

module.exports = { createUser };
