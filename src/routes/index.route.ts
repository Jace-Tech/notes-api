import { Router } from "express";
import noteRouter from "./note.route";

const router = Router();

router.use("/note", noteRouter);

export default router;
