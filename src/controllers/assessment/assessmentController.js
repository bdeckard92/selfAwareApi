const {
  questions,
  evaluateAnswers,
} = require("../../models/assessment/assessmentModel");

const getAssessmentQuestions = (_req, res) => {
  return res.status(200).json({
    scale: {
      min: 1,
      max: 5,
      labels: {
        1: "Rarely true",
        2: "Sometimes true",
        3: "Usually true",
        4: "Often true",
        5: "Consistently true",
      },
    },
    questions,
  });
};

const evaluateAssessment = (req, res) => {
  const { answers } = req.body || {};

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({
      message: "answers object is required",
    });
  }

  const missingQuestions = questions
    .map((question) => question.id)
    .filter((questionId) => answers[questionId] === undefined || answers[questionId] === null);

  if (missingQuestions.length > 0) {
    return res.status(400).json({
      message: "all question answers are required",
      missingQuestions,
    });
  }

  const invalidAnswers = questions
    .map((question) => {
      const score = Number(answers[question.id]);
      const invalid = Number.isNaN(score) || score < 1 || score > 5;

      return invalid ? question.id : null;
    })
    .filter(Boolean);

  if (invalidAnswers.length > 0) {
    return res.status(400).json({
      message: "answers must be numeric values between 1 and 5",
      invalidAnswers,
    });
  }

  const result = evaluateAnswers(answers);
  return res.status(200).json(result);
};

module.exports = {
  getAssessmentQuestions,
  evaluateAssessment,
};
