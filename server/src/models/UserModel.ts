import { getDatabase, mongoConnect } from "../config/mongoConfig";
import { UserType } from "../types/mainTypes";
import { hashPassword } from "../utils/bcrypt";

class Model {
  private static getCollection(collection: string) {
    mongoConnect();
    const db = getDatabase();
    return db.collection(collection);
  }

  static async findOne<User extends UserType>(query: object) {
    try {
      const agg = [{ $match: query }, { $project: { password: 0 } }];
      const result = await this.getCollection("users")
        .aggregate<User>(agg)
        .limit(1)
        .next();

      return result;
    } catch (error) {
      throw new Error(`Error finding document: ${error}`);
    }
  }

  static async find<User extends UserType>() {
    try {
      const agg = [
        {
          $project: {
            password: 0,
          },
        },
      ];
      const result = await this.getCollection("users")
        .aggregate<User>(agg)
        .toArray();
      return result;
    } catch (error) {
      throw new Error(`Error finding documents: ${error}`);
    }
  }

  static async insertOne(data: UserType) {
    try {
      const user = await this.findOne({ email: data.email });
      if (user) {
        throw new Error("User already exists");
      }
      data.password = await hashPassword(data.password);
      const result = await this.getCollection("users").insertOne(data);
      return result;
    } catch (error) {
      throw new Error(`Error insert documents: ${error}`);
    }
  }

  static async updateOne(query: object, data: object, options?: object) {
    try {
      const result = await this.getCollection("users").updateOne(
        query,
        data,
        options
      );
      return result;
    } catch (error) {
      throw new Error(`Error updating document: ${error}`);
    }
  }

  static async deleteOne(query: object) {
    try {
      const result = await this.getCollection("users").deleteOne(query);
      return result;
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }
}

export default Model;
