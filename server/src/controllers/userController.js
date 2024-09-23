const {loginUserService, signUpUserService, getSellerProductsService, addSellerProductsService, deleteSellerProductService, getAllSellerProductsService, addToCartService, updateSellerProductService,
    getMyCartService, removeCartService,getProductByIdService} = require("../Service/userService");

exports.signUpUser = async(req,res) => {
    try{
        const data = req.body;
        const result  = await signUpUserService(data);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({error:'Internal Server Error'});
    }
}

exports.loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;
        const result = await loginUserService(email,password);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error : error.message});
    }
}

exports.getSellerProducts = async(req,res) => {
    try{
        const id = req.params.userId;
        const result = await getSellerProductsService(id);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

exports.getAllSellerProducts = async(req,res) => {
    try{
        const result = await getAllSellerProductsService();
        return res.status(200).json(result);

    }catch(error){
        return res.status(400).json({error:error.message});

    }
}

exports.getProductById = async(req,res) => {
    try{
        const productId = req.params.productId;
        const result = await getProductByIdService(productId);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

exports.addSellerProducts = async(req,res) => {
    try{
        const body = req.body;
        const id = req.params.userId;
        const result = await addSellerProductsService(id,body);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error:error.message});

    }
}

exports.updateSellerProduct = async(req,res) => {
    try{
        const productId = req.params.productId;
        const userId = req.params.userId;
        const body = req.body;
        const result = await updateSellerProductService(productId,userId,body);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

exports.deleteSellerProducts  = async(req,res) => {
    try{
        const id = req.params.id;
        const result = await deleteSellerProductService(id);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error : error.message});
    }
}

exports.addToCart = async(req,res) => {
    try{
        const body = req.body;
        const result = await addToCartService(body);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

exports.getMyCart = async(req,res) => {
    try{
        const id = req.params.userId;
        const result = await getMyCartService(id);
        return res.status(200).json(result);

    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

exports.removeCart = async(req,res) => {
    try{
        const id = req.params.id;
        const result = await removeCartService(id);
        return res.status(200).json(result);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
}
