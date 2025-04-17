import { Request, Response } from "express";
import HobbyModel from "../models/HobbyModel";
class Controller {
  static async getAllHobby(req: Request, res: Response) {
    try {
      const people = await HobbyModel.find();
      if (!people) {
        res.status(404).json({
          status: "fail",
          message: "No people found",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            people,
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

  static async getHobbyById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const people = await HobbyModel.findOne(id);
      if (!people) {
        res.status(404).json({
          status: "fail",
          message: "No people found",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            people,
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
  static async createHobby(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = HobbyModel.insertOne(data);
      if (!result) {
        res.status(400).json({
          status: "fail",
          message: "Invalid data",
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            people: result,
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

  static async updateHobbyById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = HobbyModel.updateOne(id, data);
      if (!result) {
        res.status(404).json({
          status: "fail",
          message: "No people found",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            people: result,
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

  static async deleteHobbyById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = HobbyModel.deleteOne(id);
      if (!result) {
        res.status(404).json({
          status: "fail",
          message: "No people found",
        });
      } else {
        res.status(204).json({
          status: "success",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}
export default Controller;
