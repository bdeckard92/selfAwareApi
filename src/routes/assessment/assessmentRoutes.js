const express = require("express");
const {
  getAssessmentQuestions,
  evaluateAssessment,
} = require("../../controllers/assessment/assessmentController");

const router = express.Router();

router.get("/questions", getAssessmentQuestions);
router.post("/evaluate", evaluateAssessment);

module.exports = router;
