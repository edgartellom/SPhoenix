const axios = require('axios');
const { Category } = require('../db');
require('dotenv').config();
const API_URL = process.env.API_URL;

const getAllCategories = async () => {
    let allCategories = (await axios(`${API_URL}/categories`)).data;
    allCategories = allCategories.map(el => el.name); 
    
    allCategories.forEach(category => {
        Category.findOrCreate({
            where: { name: category }
        });
    });
    console.log("Categories loaded into database succesfully!")
    return await Category.findAll();
}

module.exports = { 
    getAllCategories 
}