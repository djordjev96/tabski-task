"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const user_route_1 = require("./routes/user.route");
const post_route_1 = require("./routes/post.route");
const like_route_1 = require("./routes/like.route");
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = 3000;
(0, typeorm_1.useContainer)(typeorm_typedi_extensions_1.Container);
(0, typeorm_1.createConnection)({
    type: "postgres",
    database: process.env.PGDATABASE,
    host: "172.17.0.2",
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: +(process.env.PGPORT || 5432),
    synchronize: true,
    entities: ["dist/**/*.entity.js"],
})
    .then(() => {
    const userRoute = new user_route_1.UserRoute();
    const postRoute = new post_route_1.PostRoute();
    const likeRoute = new like_route_1.LikeRoute();
    app.get("/", (req, res) => {
        res.send("Hello");
    });
    app.use("/", userRoute.router);
    app.use("/", postRoute.router);
    app.use("/", likeRoute.router);
    //error handling
    app.use(error_middleware_1.errorMiddleware);
})
    .catch((err) => {
    console.error(`Couldn't connect to the database`);
    console.error(err);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
