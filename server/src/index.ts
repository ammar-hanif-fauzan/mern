import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = 3000;
const app = express();
import cors from "cors";
import userRouter from "./routes/userRoute";
import peopleRouter from "./routes/peopleRoute";
import hobbyRouter from "./routes/hobbyRoute";
import phoneRouter from "./routes/phoneRoute";

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/people", peopleRouter);
app.use("/hobby", hobbyRouter);
app.use("/phone", phoneRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
