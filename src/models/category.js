var Sequelize = require('sequelize');

var connection = new Sequelize('lgsignage','root','root', {
    dialect: 'mysql',
    operatorsAliases: false,
});

const Category = connection.define('category',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: Sequelize.TEXT
});

connection.sync();

let categoryModel = {};

categoryModel.getCategories = (callback) => {
	Category.findAll().then(categories => {
		callback(null, categories);
	});
};

categoryModel.insertCategory = (categoryData, callback) => {
	Category.create({
		name: categoryData.name,
		description: categoryData.description
	}).then(result => {
		callback(null, result.get());
	});
};

categoryModel.updateCategory = (categoryData, callback) => {
	Category.findById(categoryData.id).then(category => {
		category.updateAttributes({
			name: categoryData.name,
			description: categoryData.description
		}).then(result => callback(null,result.get()));
	});
};

categoryModel.deleteCategory = (id, callback) => {
	Category.findById(id).then(category => {
		category.destroy().then(result => callback(null,result.get()));
	});
};

categoryModel.findById = (id,callback) => {
	Category.findById(id).then(category => {
		callback(null,category);
	});
}

module.exports = categoryModel;