const axios = require("axios");
const { Op } = require("sequelize");
const { Phone, Category } = require("../db");
require("dotenv").config();
const API_URL = process.env.API_URL;

const getApiInfo = async () => {
  const phones = (await axios(`${API_URL}/phones`)).data;
  let orderedData = await phones.sort((a, b) => a.brand.localeCompare(b.brand));
  const apiInfo = await orderedData.map((el) => ({
    // id: el.id,
    brand: el.brand,
    name: el.name,
    model: el.model,
    network: el.network,
    launch: el.launch,
    dimensions: el.dimensions,
    weight: el.weight,
    displayType: el.display.type,
    displaySize: el.display.size,
    displayResolution: el.display.resolution,
    os: el.os,
    ram: el.memory.ram.map((ram) => ram),
    internMemory: el.memory.intern.map((mem) => mem),
    chipset: el.chipset,
    cpu: el.cpu,
    selfieCameraResolution: el.cameras.selfie.resolution,
    selfieCameraVideo: el.cameras.selfie.video,
    mainCameraResolution: el.cameras.main.resolution,
    mainCameraVideo: el.cameras.main.video,
    battery: el.battery,
    price: el.price,
    color: el.color.map((col) => col),
    image: el.image,
    category: el.category.map((cat) => cat.name),
  }));
  return apiInfo;
};

const getAllPhones = async () => {
  try {
    const apiInfo = await getApiInfo();
    let createdCount = 0;
    let foundCount = 0;
    let phonePromises = await Promise.all(
      apiInfo.map(async (phoneData) => {
        const [phone, created] = await Phone.findOrCreate({
          where: {
            brand: phoneData.brand,
            name: phoneData.name,
          },
          defaults: {
            model: phoneData.model,
            network: phoneData.network,
            launch: phoneData.launch,
            dimensions: phoneData.dimensions,
            weight: phoneData.weight,
            displayType: phoneData.displayType,
            displaySize: phoneData.displaySize,
            displayResolution: phoneData.displayResolution,
            os: phoneData.os,
            ram: phoneData.ram,
            internMemory: phoneData.internMemory,
            chipset: phoneData.chipset,
            cpu: phoneData.cpu,
            selfieCameraResolution: phoneData.selfieCameraResolution,
            selfieCameraVideo: phoneData.selfieCameraVideo,
            mainCameraResolution: phoneData.mainCameraResolution,
            mainCameraVideo: phoneData.mainCameraVideo,
            battery: phoneData.battery,
            price: phoneData.price,
            color: phoneData.color,
            image: phoneData.image,
          },
          include: [Category],
        });
        if (created) {
          createdCount++;
        } else {
          foundCount++;
        }
        const category = await Category.findAll({
          where: { name: { [Op.in]: phoneData.category } },
        });
        if (category) {
          await phone.addCategory(category);
        }
        return phone;
      })
    );
    console.log(
      `${createdCount} phones created, ${foundCount} phones found in the database.`
    );
    const phones = await Phone.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    //return phones;
    return { data: phones, status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

const updatePhone = async (phone) => {
  const {
    id,
    brand,
    name,
    model,
    network,
    launch,
    dimensions,
    weight,
    displaySize,
    displayResolution,
    os,
    ram,
    internMemory,
    chipset,
    cpu,
    selfieCameraResolution,
    selfieCameraVideo,
    mainCameraResolution,
    mainCameraVideo,
    battery,
    price,
    color,
    image,
    category,
    state,
  } = phone;
  try {
    const phoneFromDb = await Phone.findByPk(id);
    if (!phoneFromDb) return { message: "PHONE NOT FOUND", status: "error" };
    await phoneFromDb.update({
      brand,
      name,
      model,
      network,
      launch,
      dimensions,
      weight,
      displaySize,
      displayResolution,
      os,
      ram,
      internMemory,
      chipset,
      cpu,
      selfieCameraResolution,
      selfieCameraVideo,
      mainCameraResolution,
      mainCameraVideo,
      battery,
      price,
      color,
      image,
      category,
      state,
    });
    return { message: "Phone updated succesfully", status: "success" };
  } catch (error) {
    return { message: error.message, status: "error" };
  }
};

module.exports = {
  getAllPhones,
  updatePhone,
};
