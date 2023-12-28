import User from "../models/user";
import * as yup from "yup";
import { sendCreatedUser } from "../helpers/userHelper";
import mongoose from "mongoose";

export const createUser = async (req: any, res: any) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required("Name is required"),
      subscription: yup.string().required("Plan is required")
    });

    await schema.validate(req.body);

    const { name, preferences, ingredients, savedRecipes, subscription } =
      req.body;
    const newUser = new User({
      name,
      preferences,
      ingredients,
      savedRecipes,
      subscription,
    });

    newUser
      .save()
      .then((data: any) => {
        res.status(200).json({
          message: "Successfully create new user",
          data,
        });
      })
      .catch((err: any) => {
        res.status(400).json({
          message: "Error creating new user",
          error: err,
        });
      });
    return;
  } catch (err) {
    res.status(400).json({
      message: `Request error: ${err}`,
      error: err,
    });
    return;
  }
};

export const getUser = async (req: any, res: any, next: any) => {
  try {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(req.body._id),
    });
    if (user) {
      return res.status(404).json({ message: user });
    }
    if (user == null) {
      return res.status(404).json({ message: `Cannot find User: ${req}` });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
  next();
};
