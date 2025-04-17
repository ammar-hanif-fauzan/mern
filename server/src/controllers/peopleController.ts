import { Request, Response } from "express";
import PeopleModel from "../models/PeopleModel";
import { peopleSchema } from "../schemas/mainSchemas";
import { ObjectId } from "mongodb";
class Controller {
  static async getAllPeople(req: Request, res: Response) {
    try {
      const people = await PeopleModel.find();
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
  static async getPeopleById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const people = await PeopleModel.findOne(id);
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
  static async createPeople(req: Request, res: Response) {
    try {
      const data = req.body;
      data.user_id = new ObjectId(data.user_id);
      const result = peopleSchema.safeParse(data);
      if (!result.success) {
        res.status(400).json({
          status: "fail",
          message: result.error,
        });
      } else {
        const people = await PeopleModel.insertOne(result.data);
        if (!people) {
          res.status(404).json({
            status: "fail",
            message: "No people found",
          });
        } else {
          res.status(201).json({
            status: "success",
            data: {
              people,
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
  static async updatePeopleById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = peopleSchema.safeParse(data);
      if (!result.success) {
        res.status(400).json({
          status: "fail",
          message: result.error,
        });
      } else {
        const people = await PeopleModel.updateOne(id, result.data);
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
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  static async deletePeopleById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const people = await PeopleModel.deleteOne(id);
      if (!people) {
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
