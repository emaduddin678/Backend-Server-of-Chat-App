import express from "express";
import { checkEmail } from "../controller/testController.js";

const testingRouter = express.Router();

testingRouter.post("/email", checkEmail);

export default testingRouter;
