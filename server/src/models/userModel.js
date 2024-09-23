const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.insertUser = async(username, email, role, password) => {
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await pool.query(`INSERT INTO USERS(USERNAME, EMAIL, ROLE, PASSWORD, CREATED_ON) VALUES($1,$2,$3,$4,NOW()) RETURNING ID, USERNAME, EMAIL, ROLE`,[username,email,role,hashedPassword]);
        return result.rows[0];
    }catch(error){
        throw new Error(error);
    }
}

exports.findUser = async(email) => {
    try{
        const result = await pool.query(`SELECT * FROM USERS WHERE EMAIL = $1`,[email]);
        return result.rows[0];
    }catch(error){
        throw new Error(error);   
    }
}

exports.getSellerProducts = async(id) =>{
    try{
        const result = await pool.query(`select * from products where user_id = $1`,[id]);
        return result.rows;
    }catch(error){
        throw new Error(error);
    }
}

exports.getAllSellerProducts = async() =>{
    try{
        const result = await pool.query(`select * from products` );
        return result.rows;
    }catch(error){
        throw new Error(error);
    }
}

exports.getProductById = async(productId) =>{
    try{
        const result = await pool.query(`select * from products WHERE ID = $1`,[productId] );
        return result.rows[0];
    }catch(error){
        throw new Error(error);
    }
}
exports.addSellerProducts = async(id, body) =>{
    try{
        const {productName, category, description, price, discount} = body;
        const result = await pool.query(`INSERT INTO PRODUCTS(USER_ID, PRODUCT_NAME, CATEGORY, DESCRIPTION, PRICE, DISCOUNT, CREATED_AT) VALUES($1,$2,$3,$4,$5,$6,NOW()) RETURNING PRODUCT_NAME, DESCRIPTION`,[id,productName,category,description,price,discount]);
        return result.rows[0];
    }catch(error){
        throw new Error(error);
    }
}

exports.updateSellerProduct = async(productId,userId,body) =>{
    try{
        const {product_name, category, description, price, discount} = body;
        const result = await pool.query(`UPDATE PRODUCTS SET PRODUCT_NAME = COALESCE($1,PRODUCT_NAME), CATEGORY = COALESCE($2,CATEGORY),DESCRIPTION = COALESCE($3,DESCRIPTION),PRICE = COALESCE($4,PRICE),DISCOUNT = COALESCE($5,DISCOUNT) WHERE ID = $6 AND USER_ID = $7`,[product_name,category,description,price,discount,productId,userId]);
        return result.rows[0];
    }catch(error){
        throw new Error(error);
    }
}

exports.deleteSellerProducts = async(id) => {
    try{
        const result = await pool.query(`DELETE FROM PRODUCTS WHERE ID = $1 RETURNING *`,[id]);
        if(result.rowCount === 0){
            return {success : false, message : 'Product not found.'}
        }
        return {success : true, message : 'Product deleted successfully',product : result.rows[0]};
    }catch(error){
        return {success : false, message : 'Error deleting product.'};

    }
}

exports.addToCart = async(body) =>{
    try{
        const {productId, userId} = body;
        const existingCartItem = await pool.query('SELECT * FROM CART WHERE USER_ID = $1 AND PRODUCT_ID = $2',[userId,productId]);
        if(existingCartItem.rows.length > 0){
            return "error";
        }
        const result = await pool.query(`INSERT INTO CART(USER_ID, PRODUCT_ID, CREATED_AT) VALUES($1,$2,NOW())`,[userId,productId]);
        return result.rows[0];
    }catch(error){
        throw new Error(error);
    }
}

exports.getMyCart = async(userId) =>{
    try{
        const result = await pool.query(`SELECT C.ID, P.PRODUCT_NAME,P.PRICE,P.CATEGORY, P.DISCOUNT,  P.DESCRIPTION  FROM CART C JOIN PRODUCTS P ON C.PRODUCT_ID = P.ID WHERE C.USER_ID = $1`,[userId]);
        return result.rows;
    }catch(error){
        throw new Error(error);
    }
}

exports.removeCart = async(id) =>{
    try{
        const result = await pool.query(`DELETE FROM CART WHERE ID = $1`,[id]);
        return result.rows;
    }catch(error){
        throw new Error(error);
    }
}