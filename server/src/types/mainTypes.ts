import { ObjectId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
};

export type PeopleType = {
  _id: ObjectId;
  user_id: ObjectId;
  IDcard?: string;
  phone: PhoneType[];
  hobbies: ObjectId[];
};

export type HobbiesType = {
  _id: ObjectId;
  name: string;
  people_ids: ObjectId[];
};

export type PhoneType = {
  _id: ObjectId;
  people_id: ObjectId;
  number: string;
};
