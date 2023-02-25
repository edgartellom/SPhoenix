const axios = require("axios");
const { Cart, User } = require("../db");

const getDbInfo = async (userId) => {
  try {
    const carts = await Cart.findAll({
      where: {
        userId,
        state: true,
      },
      include: { model: User, attributes: ["id"] },
    });
    return { carts: carts, status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const createCart = async (cart) => {
  const { userId } = cart;
  console.log(cart);
  try {
    let user = User.findByPk(userId);
    if (user) {
      Cart.create(cart);
      return { message: "Cart created succesfully", status: "success" };
    } else {
      return { message: "Invalid User", status: "error" };
    }
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updateCart = async (cart) => {
  const { id, toTalPrice, state } = cart;
  try {
    const cartFromDb = Cart.findByPk(id);
    if (cartFromDb) {
      cartFromDb.update({
        toTalPrice,
        state,
      });
    }
    return { message: "Cart updated succesfully", status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getDbInfo,
  createCart,
  updateCart,
};
