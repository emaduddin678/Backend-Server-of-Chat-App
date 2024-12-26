import createHttpError from "http-errors";

const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, "Your requested content was not found!!"));
};


const errorHandler = (req,res, next) =>{
    res.json()   
}