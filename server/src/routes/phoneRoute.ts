import express from "express";
const router = express.Router();
import PhoneController from "../controllers/phoneController";
router.post("/", PhoneController.createPhone);
router.get("/", PhoneController.getAllPhone);
router.get("/", PhoneController.getPhoneByPhoneId);
router.put("/update/:id", PhoneController.updatePhoneById);
router.delete("/delete/:id", PhoneController.deletePhoneById);
export default router;
