import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  deleteSentMail,
  getReceivedMails,
  getSentMailById,
  getSentMails,
  sendMail,
} from "../controllers/mailControllers.js";

const router = Router();
router.post("/send", authMiddleware, sendMail);
router.get("/read/:id", authMiddleware, getSentMailById);
router.get("/sent-mails", authMiddleware, getSentMails);
router.get("/received-mails", authMiddleware, getReceivedMails);
router.delete("/delete/:id", authMiddleware, deleteSentMail);

export default router;
