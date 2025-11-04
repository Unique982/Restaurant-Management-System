"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../database/connection"));
class Blog {
    static createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogTitle, blogDescription, blogCategory } = req.body;
            if (!blogTitle || !blogDescription || !blogCategory)
                return res.status(400).json({ message: "All field required" });
            const blogImage = req.file ? req.file.path : null;
            yield connection_1.default.query(`INSERT INTO blog(blogTitle, blogDescription,blogImage, blogCategory,createdAt,updatedAt)VALUES(?,?,?,?,NOW(),NOW())`, {
                type: sequelize_1.QueryTypes.INSERT,
                replacements: [blogTitle, blogDescription, blogImage, blogCategory],
            });
            res.status(200).json({ message: "Blog Added succefully!" });
        });
    }
    // get all blog
    static allBlogList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allBlog = yield connection_1.default.query(`SELECT * FROM blog`, {
                type: sequelize_1.QueryTypes.SELECT,
            });
            res.status(200).json({ message: "Fetch All blog", data: allBlog });
        });
    }
    // delete
    static blogDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const exists = yield connection_1.default.query(`SELECT id FROM blog WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (exists.length === 0)
                return res.status(404).json({ message: "Blog id not found!" });
            yield connection_1.default.query(`DELETE FROM blog WHERE id = ?`, {
                type: sequelize_1.QueryTypes.DELETE,
                replacements: [id],
            });
            res.status(200).json({ message: "blog delete successfully!" });
        });
    }
    // single
    static singleBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const exists = yield connection_1.default.query(`SELECT * FROM blog WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (exists.length === 0) {
                return res.status(404).json({ message: "Blog id not found!" });
            }
            else {
                res.status(200).json({ message: "Single blog fetch", data: exists });
            }
        });
    }
    // update
    static updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const exists = yield connection_1.default.query(`SELECT * FROM blog WHERE id =?`, {
                type: sequelize_1.QueryTypes.SELECT,
                replacements: [id],
            });
            if (exists.length === 0)
                return res.status(404).json({ message: "Blog id not found!" });
            const { blogTitle, blogDescription, blogCategory } = req.body;
            if (!blogTitle || !blogDescription || !blogCategory)
                return res.status(400).json({ message: "All field required" });
            const blogImage = req.file ? req.file.path : null;
            // update
            yield connection_1.default.query(`UPDATE blog SET blogTitle=?,blogDescription=?,blogCategory=?,blogImage=?,updatedAt=NOW() WHERE id =?`, {
                type: sequelize_1.QueryTypes.UPDATE,
                replacements: [blogTitle, blogDescription, blogImage, blogCategory, id],
            });
            res.status(200).json({ message: "Update successfuly!" });
        });
    }
}
exports.default = Blog;
