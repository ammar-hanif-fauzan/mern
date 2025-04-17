import express from "express";
const router = express.Router();
import PeopleController from "../controllers/peopleController";
router.get("/", PeopleController.getAllPeople);
router.get("/:id", PeopleController.getPeopleById);
router.post("/", PeopleController.createPeople);
router.put("/update/:id", PeopleController.updatePeopleById);
router.delete("/:id", PeopleController.deletePeopleById);
export default router;
