import User from "../models/user";

export const sendCreatedUser = async (user: any) => {
  const newUser = new User(user);
  const data = await newUser.save();

  return data;
};