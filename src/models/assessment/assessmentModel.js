const levelExpectations = {
  Junior: "Can complete scoped tasks with guidance, writes readable code, and demonstrates core debugging and testing habits.",
  Mid: "Owns features independently, makes sound tradeoff decisions, and contributes to code quality and team delivery.",
  Senior: "Drives architecture decisions, mentors others, and consistently delivers high-impact, reliable systems.",
  Staff: "Leads technical direction across teams, aligns engineering with business strategy, and scales organizational capability.",
};

const questions = [
  {
    id: "coding_fundamentals",
    prompt: "How confidently can you implement production-ready features in your primary language?",
    competency: "Coding fundamentals",
  },
  {
    id: "system_design",
    prompt: "How confidently can you design services, APIs, and data models for evolving requirements?",
    competency: "System design",
  },
  {
    id: "testing_quality",
    prompt: "How consistently do you create tests and quality checks that prevent regressions?",
    competency: "Testing and quality",
  },
  {
    id: "ownership_delivery",
    prompt: "How often do you independently own delivery from planning through production support?",
    competency: "Ownership and delivery",
  },
  {
    id: "collaboration_leadership",
    prompt: "How strongly do you influence teammates through collaboration, mentoring, and technical communication?",
    competency: "Collaboration and leadership",
  },
  {
    id: "help_needed_for_features",
    prompt: "How often do you require help from others to finish features?",
    competency: "Feature delivery independence",
  },
  {
    id: "others_seek_help",
    prompt: "How often do others on your team reach out to you for technical help?",
    competency: "Peer support and technical influence",
  },
  {
    id: "independent_debugging",
    prompt: "How often can you independently debug production or complex local issues?",
    competency: "Independent debugging",
  },
];

const scoreToLevel = (averageScore) => {
  if (averageScore >= 4.5) {
    return "Staff";
  }

  if (averageScore >= 3.5) {
    return "Senior";
  }

  if (averageScore >= 2.5) {
    return "Mid";
  }

  return "Junior";
};

const evaluateAnswers = (answers) => {
  const normalizedScores = questions.map((question) => {
    const rawValue = answers[question.id];
    const value = Number(rawValue);
    const score = Number.isNaN(value) ? 0 : Math.min(5, Math.max(1, value));

    return {
      id: question.id,
      competency: question.competency,
      score,
    };
  });

  const total = normalizedScores.reduce((sum, item) => sum + item.score, 0);
  const averageScore = Number((total / normalizedScores.length).toFixed(2));
  const estimatedLevel = scoreToLevel(averageScore);

  const strongestAreas = normalizedScores
    .filter((item) => item.score >= 4)
    .map((item) => item.competency);

  const growthAreas = normalizedScores
    .filter((item) => item.score <= 3)
    .map((item) => item.competency);

  return {
    estimatedLevel,
    averageScore,
    expectations: levelExpectations[estimatedLevel],
    strongestAreas,
    growthAreas,
    rubricVersion: "phase1-v2",
    evaluatedAt: new Date().toISOString(),
  };
};

module.exports = {
  questions,
  evaluateAnswers,
};
