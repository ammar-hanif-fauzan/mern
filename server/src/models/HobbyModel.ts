import { ObjectId } from "mongodb";
import { getDatabase, mongoConnect } from "../config/mongoConfig";
import { HobbiesType } from "../types/mainTypes";

class Model {
  private static getCollection(collection: string) {
    mongoConnect();
    const db = getDatabase();
    return db.collection(collection);
  }

  static async findOne<Hobby extends HobbiesType>(id: string) {
    try {
      const objectId = new ObjectId(id);
      const agg = [{ $match: { _id: objectId } }];
      const result = await this.getCollection("hobbies")
        .aggregate<Hobby>(agg)
        .limit(1)
        .next();

      return result;
    } catch (error) {
      throw new Error(`Error finding document: ${error}`);
    }
  }

  static async find<Hobby extends HobbiesType>() {
    try {
      const result = await this.getCollection("hobbies")
        .find<Hobby>({})
        .toArray();
      return result;
    } catch (error) {
      throw new Error(`Error finding documents: ${error}`);
    }
  }

  static async insertOne(data: object) {
    try {
      const result = await this.getCollection("hobbies").insertOne(data);
      return result;
    } catch (error) {
      throw new Error(`Error inserting document: ${error}`);
    }
  }

  static async updateOne(id: string, data: object, options?: object) {
    try {
      const result = await this.getCollection("hobbies").updateOne(
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
      const result = await this.getCollection("hobbies").deleteOne({
        _id: new ObjectId(id),
      });
      return result;
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }
}

export default Model;
