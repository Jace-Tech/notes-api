import { Router } from "express";
import categoryRouter from "./category.route";
import noteRouter from "./note.route";

const router = Router();

router.use("/note", noteRouter);
router.use("/category", categoryRouter);

export default router;
