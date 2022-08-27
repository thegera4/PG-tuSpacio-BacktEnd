const { Product, Categorie } = require("../db");

/* GET ALL PRODUCTS FROM DB */
const getAllProducts = async (req, res, next) => {
  try {
    const AllProducts = await Product?.findAll({
      include: {
        model: Categorie,
        attributes: ["name"],
      },
    });

    res.status(200).send(AllProducts);
  } catch (error) {
    next(error);
  }
};

/* CREATE NEW PRODUCT IN THE DATABASE */
const createProduct = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const { name, features, price, image, status, stock, category_id } =
      req.body;
    /* CREATE NEW PRODUCT */
    const newProduct = await Product.create({
      name,
      features,
      price,
      image,
      status,
      stock,
      category_id,
    });

    res.status(200).json({
      succMsg: "Product Created Successfully!",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE ONE PRODUCT IN THE DATABASE */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, features, price, image, status, stock, category_id } =
      req.body;

    /* BUSCO EL PRODUCT DE LA BD POR EL ID */
    let productDB = await Product.findOne({
      where: {
        id: id,
      },
    });
    /* ACTUALIZO EL PRODUCT CON LOS DATOS QUE RECIBO DEL BODY */
    const updatedProduct = await productDB.update({
      name,
      features,
      price,
      image,
      status,
      stock,
      category_id,
    });
    res.status(200).send({
      succMsg: "Product Updated Successfully!",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/* DISABLED ONE PRODUCT IN THE DATABASE */
const disableProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
      await Product.update(
        { status: false },
        {
          where: {
            id: id,
          },
        }
      );
  
      const disabledProduct = await Product.findByPk(id, {
        attributes: [
          "id",
          "name",
          "features",
          "price",
          "image",
          "status",
          "stock",
          "category_id",
        ],
        include: {
          model: Categorie,
          attributes: ["name", "id"],
        },
      });
  
      res.status(200).json({
        ok: true,
        disabledProduct,
      });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  disableProduct
};
