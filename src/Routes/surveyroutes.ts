import { Router } from 'express';
import { CreateSurvey, getListsurvey, getSurvey, participateinSurvey, votingResults } from '../Controllers/survey';

const router: Router = Router();
router.get("/",getListsurvey)

router.post("/createSurvey",CreateSurvey)
router.get("/:id",getSurvey);
router.post("/:id/participate",participateinSurvey)
router.post("/:id/participate/results",votingResults)


export default router;