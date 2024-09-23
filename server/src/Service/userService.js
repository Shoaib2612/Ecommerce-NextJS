const bcrypt = require('bcrypt');
const {insertUser, findUser, getSellerProducts, addSellerProducts, deleteSellerProducts, getAllSellerProducts,addToCart,updateSellerProduct,
     getMyCart, removeCart, getProductById} = require("../models/userModel");
require("dotenv").config();


exports.loginUserService = async (email, password) => {
    try{
        const user = await findUser(email);
        if(!user){
            throw new Error("User does not exist")
        }  
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch == false) {
            throw new Error('Incorrect password');
        }
        return {
            message: 'Login successful',
            role:user.role,
            username:user.username,
            id:user.id,
        };
    }catch(error){
        return {error:error.message}
    }
};

exports.signUpUserService = async(data) => {
    const {username,email,role,password, confirmPassword} = data;
    try{
        if(password !== confirmPassword){
            throw new Error("Passwords do not match");
        }
        const newUser = await insertUser(username,email,role,password);
        return {message:'User registered successfully',user: newUser};

    }catch(error){
        return {error:error.message};
    }
}

exports.getSellerProductsService = async(id) => {
    try{
        const data = await getSellerProducts(id);
        return {message : "Products fetched successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}

exports.getAllSellerProductsService = async() => {
    try{
        const data = await getAllSellerProducts();
        return {message : "Products fetched successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}

exports.getProductByIdService = async(productId) => {
    try{
        const data = await getProductById(productId);
        return {message : "Product fetched successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}

exports.addSellerProductsService = async(id,body) => {
    try{   
        const data = await addSellerProducts(id,body);
        return {message : "Product added successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}

exports.updateSellerProductService = async(productId, userId, body) => {
    try{
        
        const data = await updateSellerProduct(productId,userId,body);
        return {message : "Product added successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}
exports.deleteSellerProductService = async(id) => {
    try{
        const data = await deleteSellerProducts(id);
        return {message:`Product with id = ${id} deleted successfully`, data : data};
    }catch(error){
        return {error : error.message};
    }
}

exports.addToCartService = async(body) => {
    try{
        const data = await addToCart(body);
        if(data == "error"){
            return {message : "Product already exists in the cart.",product : data};
        }
        return {message : "Product added to cart successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}

exports.getMyCartService = async(id) => {
    try{    
        const data = await getMyCart(id);
        return {message : "Product fetched to cart successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}

exports.removeCartService = async(id) => {
    try{   
        const data = await removeCart(id);
        return {message : "Product deleted from cart successfully",product : data};
    }catch(error){
        return {error:error.message};
    }
}