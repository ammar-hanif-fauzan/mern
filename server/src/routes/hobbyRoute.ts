import express from "express";
const router = express.Router();
import HobbyController from "../controllers/hobbyController";
router.get("/", HobbyController.getAllHobby);
router.get("/:id", HobbyController.getHobbyById);
router.post("/", HobbyController.createHobby);
router.put("/update/:id", HobbyController.updateHobbyById);
router.delete("/:id", HobbyController.deleteHobbyById);
export default router;
