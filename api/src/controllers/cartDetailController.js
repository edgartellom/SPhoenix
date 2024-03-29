const { Cart_detail, Phone, Cart } = require("../db");

const getDbInfo = async (cartId) => {
  try {
    const cartDetails = await Cart_detail.findAll({
      where: {
        cartId,
        state: true,
      },
      include: [
        { model: Phone, attributes: ["id"] },
        { model: Cart, attributes: ["id"] },
      ],
    });
    if (cartDetails.length > 0) {
      return { data: cartDetails, status: "success" };
    }
    return { message: "Cart Details Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const createDetail = async (details) => {
  // [{ price: ..., quantity: ..., cartId: ..., phoneId: ... }] => details;
  try {
    let isValid = true;
    let i = 0;
    while (i < details.length && isValid) {
      let el = details[i];
      let cartFound = await Cart.findByPk(el.cartId);
      let phoneFound = await Phone.findByPk(el.phoneId);
      if (!el.cartId || !el.phoneId || !cartFound || !phoneFound)
        isValid = false;
      i++;
    }
    if (isValid) {
      let detailsCreated = await Cart_detail.bulkCreate(details);
      return {
        detailsCreated,
        message: "Details created succesfully",
        status: "success",
      };
    } else {
      return { message: "Invalid Details", status: "error" };
    }
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updateDetail = async (detail) => {
  const { id, price, quantity, state } = detail;
  try {
    const detailFromDb = await Cart_detail.findByPk(id);
    if (detailFromDb) {
      await detailFromDb.update({
        price,
        quantity,
        state,
      });
      return { message: "Detail updated succesfully", status: "success" };
    }
    return { message: "Cart Detail Not Found", status: "error" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getDbInfo,
  createDetail,
  updateDetail,
};
