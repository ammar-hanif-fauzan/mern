import { Request, Response } from "express";
import UserModel from "../models/UserModel";
class Controller {
  static async getAllUser(req: Request, res: Response) {
    try {
      const user = await UserModel.find();
      if (!user) {
        res.status(404).json({
          status: "fail",
          message: "No user found",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            user,
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  static async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await UserModel.insertOne(data);
      if (!result) {
        res.status(400).json({
          status: "fail",
          message: "Invalid data",
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            user: result,
          },
        });
      }
    } catch (error) {
      const err = error as Error;
      if (err.message.includes("already exists")) {
        res.status(409).json({
          status: "fail",
          message: err.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    }
  }
  static async updateUserById() {
    try {
    } catch (error) {}
  }
  static async deleteUserById() {
    try {
    } catch (error) {}
  }
}
export default Controller;
