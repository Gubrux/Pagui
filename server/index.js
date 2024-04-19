const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const { configureDB } = require("./config/mongo");
configureDB();

const { oAuthRouter } = require("./router/oauthRouter");
app.use("/", oAuthRouter);

const { eventRouter } = require("./router/eventRouter");
app.use("/", eventRouter);

app.listen(5000, () => {
    console.log("listening on port 5000");
});