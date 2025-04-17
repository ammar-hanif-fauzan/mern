import express from "express";
const router = express.Router();
import UserController from "../controllers/userController";
router.post("/", UserController.createUser);
router.get("/", UserController.getAllUser);
router.put("/update/:id", UserController.updateUserById);
router.delete("/delete/:id", UserController.deleteUserById);
export default router;
