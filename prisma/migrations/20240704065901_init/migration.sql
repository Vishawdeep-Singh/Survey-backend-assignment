-- CreateTable
CREATE TABLE "Surveys" (
    "id" SERIAL NOT NULL,
    "surveyName" TEXT NOT NULL,

    CONSTRAINT "Surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyInfo" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "survey_id" INTEGER NOT NULL,

    CONSTRAINT "SurveyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "optionName" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Surveys_surveyName_key" ON "Surveys"("surveyName");

-- CreateIndex
CREATE UNIQUE INDEX "SurveyInfo_survey_id_question_key" ON "SurveyInfo"("survey_id", "question");

-- CreateIndex
CREATE UNIQUE INDEX "Options_questionId_optionName_key" ON "Options"("questionId", "optionName");

-- AddForeignKey
ALTER TABLE "SurveyInfo" ADD CONSTRAINT "SurveyInfo_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "Surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "SurveyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
