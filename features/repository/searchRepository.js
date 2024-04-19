import userModel from "../Model/userModel.js";
import blogModel from "../Model/blogModel.js";
import tagModel from "../Model/tagModel.js";

export const search = async (searchItem) => {
  try {
    const user = await userModel.find(
      { name: { $regex: searchItem, $options: "i" } },
      { _id: 1, name: 1 }
    );

    const blog = await blogModel.find(
      { title: { $regex: searchItem, $options: "i" } },
      { _id: 1, title: 1 }
    );

    const tag = await tagModel.find(
      { name: { $regex: searchItem, $options: "i" } },
      { _id: 1, name: 1 }
    );

    return { status: 200, message: { user, blog, tag } };
  } catch (err) {
    return { status: 500, message: "Internal server error" };
  }
};
