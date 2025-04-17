import { Request, Response } from "express";
import PhoneModel from "../models/PhoneModel";
import { phoneSchema } from "../schemas/mainSchemas";
import { ObjectId } from "mongodb";
class Controller {
  static async getAllPhone(req: Request, res: Response) {
    try {
      const Phone = await PhoneModel.find();
      if (!Phone) {
        res.status(404).json({
          status: "fail",
          message: "No Phone found",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            Phone,
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
  static async getPhoneByPhoneId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const Phone = await PhoneModel.findOne(id);
      if (!Phone) {
        res.status(404).json({
          status: "fail",
          message: "No Phone found",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            Phone,
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
  static async createPhone(req: Request, res: Response) {
    try {
      const data = req.body;
      data.people_id = new ObjectId(data.people);
      const result = phoneSchema.safeParse(data);
      if (!result.success) {
        res.status(400).json({
          status: "fail",
          message: result.error,
        });
      } else {
        const Phone = await PhoneModel.insertOne(result.data);
        if (!Phone) {
          res.status(404).json({
            status: "fail",
            message: "No Phone found",
          });
        } else {
          res.status(201).json({
            status: "success",
            data: {
              Phone,
            },
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  static async updatePhoneById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = req.body;
      data.people_id = new ObjectId(data.people);
      const result = phoneSchema.safeParse(data);
      if (!result.success) {
        res.status(400).json({
          status: "fail",
          message: result.error,
        });
      } else {
        const Phone = await PhoneModel.updateOne(id, result.data);
        if (!Phone) {
          res.status(404).json({
            status: "fail",
            message: "No Phone found",
          });
        } else {
          res.status(200).json({
            status: "success",
            data: {
              Phone,
            },
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  static async deletePhoneById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const Phone = await PhoneModel.deleteOne(id);
      if (!Phone) {
        res.status(404).json({
          status: "fail",
          message: "No Phone found",
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
