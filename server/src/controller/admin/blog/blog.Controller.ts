import { IExtendedRequest } from "../../../middleware/types/type";

class Blog {
  static async createBlog(req: IExtendedRequest, res: Response) {
    const { blogTitle, blogDescription, category } = req.body;
  }
}
