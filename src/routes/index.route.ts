import { Router } from "express";
import categoryRouter from "./category.route";
import noteRouter from "./note.route";

const router = Router();

router.use("/notes", noteRouter);
router.use("/categories", categoryRouter);

export default router;
