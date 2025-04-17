import { ObjectId } from "mongodb";
import { getDatabase, mongoConnect } from "../config/mongoConfig";
import { PeopleType } from "../types/mainTypes";

class Model {
  private static getCollection(collection: string) {
    mongoConnect();
    const db = getDatabase();
    return db.collection(collection);
  }

  static async findOne<People extends PeopleType>(id: string) {
    try {
      const objectId = new ObjectId(id);
      const agg = [
        { $match: { _id: objectId } },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "users",
          },
        },
        {
          $project: {
            "users.password": 0,
          },
        },
        {
          $lookup: {
            from: "hobbies",
            localField: "hobby._id",
            foreignField: "_id",
            as: "hobbies",
          },
        },
        {
          $lookup: {
            from: "phone",
            localField: "phone._id",
            foreignField: "_id",
            as: "phones",
          },
        },
      ];
      const result = await this.getCollection("people")
        .aggregate<People>(agg)
        .limit(1)
        .next();

      return result;
    } catch (error) {
      throw new Error(`Error finding document: ${error}`);
    }
  }

  static async find<People extends PeopleType>() {
    try {
      // const agg = [
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "user_id",
      //       foreignField: "_id",
      //       as: "users",
      //     },
      //   },
      //   {
      //     $project: {
      //       "users.password": 0,
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "hobbies",
      //       localField: "hobby._id",
      //       foreignField: "_id",
      //       as: "hobbies",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "phone",
      //       localField: "phone._id",
      //       foreignField: "_id",
      //       as: "phones",
      //     },
      //   },
      // ];
      const agg = [
        // Join people with users (one-to-one)
        {
          $lookup: {
            from: "users", // "users" collection
            localField: "user_id", // field in people
            foreignField: "_id", // field in users
            as: "user_details", // alias for joined data
          },
        },

        // Project to remove sensitive data like password from user
        {
          $project: {
            "user_details.password": 0, // Exclude password
          },
        },

        // Join people with phones (one-to-many)
        {
          $lookup: {
            from: "phones", // "phones" collection
            localField: "_id", // field in people (person_id)
            foreignField: "person_id", // field in phones
            as: "phones", // alias for joined phones data
          },
        },

        // Join people with hobbies (many-to-many)
        {
          $lookup: {
            from: "hobbies", // "hobbies" collection
            localField: "_id", // field in people (person_id)
            foreignField: "person_ids", // field in hobbies (array of person_ids)
            as: "hobbies", // alias for joined hobbies data
          },
        },
      ];

      const result = await this.getCollection("people")
        .aggregate<People>(agg)
        .toArray();
      console.log(result);
      return result;
    } catch (error) {
      throw new Error(`Error finding documents: ${error}`);
    }
  }

  static async insertOne(data: object) {
    try {
      const result = await this.getCollection("people").insertOne(data);
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
