import { ObjectId } from "mongodb";
import { getDatabase, mongoConnect } from "../config/mongoConfig";
import { PhoneType } from "../types/mainTypes";

class Model {
  private static getCollection(collection: string) {
    mongoConnect();
    const db = getDatabase();
    return db.collection(collection);
  }

  static async findOne<Phone extends PhoneType>(id: string) {
    try {
      const objectId = new ObjectId(id);
      const agg = [
        { $match: { _id: objectId } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            "user.password": 0,
          },
        },
      ];
      const result = await this.getCollection("phone")
        .aggregate<Phone>(agg)
        .limit(1)
        .next();

      return result;
    } catch (error) {
      throw new Error(`Error finding document: ${error}`);
    }
  }

  static async find<Phone extends PhoneType>() {
    try {
      const result = await this.getCollection("phone")
        .find<Phone>({})
        .toArray();
      return result;
    } catch (error) {
      throw new Error(`Error finding documents: ${error}`);
    }
  }

  static async insertOne(data: object) {
    try {
      const result = await this.getCollection("phone").insertOne(data);
      return result;
    } catch (error) {
      throw new Error(`Error inserting document: ${error}`);
    }
  }

  static async updateOne(id: string, data: object, options?: object) {
    try {
      const result = await this.getCollection("people").updateOne(
        { _id: new ObjectId(id) },
        data,
        options
      );
      return result;
    } catch (error) {
      throw new Error(`Error updating document: ${error}`);
    }
  }

  static async deleteOne(id: string) {
    try {
      const result = await this.getCollection("people").deleteOne({
        _id: new ObjectId(id),
      });
      return result;
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }
}

export default Model;
