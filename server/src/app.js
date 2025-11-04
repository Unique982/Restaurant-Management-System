"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const google_1 = __importDefault(require("./database/config/passport/google"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
// cors import
app.use((0, cors_1.default)({
    origin: "*",
}));
// middleware request pass garna use garaxam
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
// initilize passport
app.use(google_1.default.initialize());
app.use(google_1.default.session());
const auth_Route_1 = __importDefault(require("./routes/globals/auth/auth.Route"));
const profile_Route_1 = __importDefault(require("./routes/globals/profile/profile.Route"));
const password_Route_1 = __importDefault(require("./routes/globals/password/password.Route"));
// admin
const category_Route_1 = __importDefault(require("./routes/admin/category/category.Route"));
const tables_Route_1 = __importDefault(require("./routes/admin/tables/tables.Route"));
const reservations_Route_1 = __importDefault(require("./routes/admin/reservations/reservations.Route"));
const menu_Route_1 = __importDefault(require("./routes/admin/menu/menu.Route"));
const order_Route_1 = __importDefault(require("./routes/admin/order/order.Route"));
const cart_Routes_1 = __importDefault(require("./routes/admin/cart/cart.Routes"));
const customer_Route_1 = __importDefault(require("./routes/admin/customer/customer.Route"));
const about_Route_1 = __importDefault(require("./routes/admin/about/about.Route"));
const blog_Route_1 = __importDefault(require("./routes/admin/blog/blog.Route"));
const service_Route_1 = __importDefault(require("./routes/admin/service/service.Route"));
const inqueryMsg_Route_1 = __importDefault(require("./routes/admin/inqueryMsg/inqueryMsg.Route"));
const gallery_Route_1 = __importDefault(require("./routes/admin/gallery/gallery.Route"));
const restore_Route_1 = __importDefault(require("./routes/admin/Restore/restore.Route"));
// customer
const dashboardOverView_Route_1 = __importDefault(require("./routes/customer/dashboardOverview/dashboardOverView.Route"));
const menu_Route_2 = __importDefault(require("./routes/customer/menu/menu.Route"));
const reservation_Route_1 = __importDefault(require("./routes/customer/reservation/reservation.Route"));
const order_Route_2 = __importDefault(require("./routes/customer/myOrder/order.Route"));
const cart_Route_1 = __importDefault(require("./routes/customer/cart/cart.Route"));
const category_Route_2 = __importDefault(require("./routes/customer/category/category.Route"));
// contact us
const contact_Route_1 = __importDefault(require("./routes/customer/contact/contact.Route"));
const table_Route_1 = __importDefault(require("./routes/tableBooking/table.Route"));
// admin api
app.use("/api/auth/", auth_Route_1.default);
app.use("/api/profile", profile_Route_1.default);
app.use("/api/reset/password", password_Route_1.default);
app.use("/api/category", category_Route_1.default);
app.use("/api/tables", tables_Route_1.default);
app.use("/api/reservations", reservations_Route_1.default);
app.use("/api/menu", menu_Route_1.default);
app.use("/api/order", order_Route_1.default);
app.use("/api/cart", cart_Routes_1.default);
app.use("/api/customer", customer_Route_1.default);
app.use("/api/about", about_Route_1.default);
app.use("/api/blog", blog_Route_1.default);
app.use("/api/service", service_Route_1.default);
app.use("/api/inquery/contact", inqueryMsg_Route_1.default);
app.use("/api/gallery", gallery_Route_1.default);
app.use("/api/restore", restore_Route_1.default);
// customer
app.use("/api/customer/dashboard", dashboardOverView_Route_1.default);
app.use("/api/customer/view-menu", menu_Route_2.default);
app.use("/api/customer/reservations/booking", reservation_Route_1.default);
app.use("/api/customer/myOrder", order_Route_2.default);
app.use("/api/customer/mycart", cart_Route_1.default);
app.use("/category", category_Route_2.default);
// contact user new and old user
app.use("/api/contact", contact_Route_1.default);
app.use("/api/booking/table", table_Route_1.default);
exports.default = app;
