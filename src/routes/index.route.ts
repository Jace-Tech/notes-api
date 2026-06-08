import { Router } from "express";
import categoryRouter from "./category.route";
import noteRouter from "./note.route";
import authRouter from "./auth.route";

const router = Router();

router.use("/notes", noteRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);

export default router;
