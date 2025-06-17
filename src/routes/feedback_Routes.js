const feedback_Controller = require("../app/controllers/feedback_Controller");
const require_Auth = require("../middleware/require_Auth");

const express = require("express");
const router = express.Router();

router.post(
    "/add-feedback", 
    feedback_Controller.add_Feedback
);
router.post(
    "/update-feedback/:id",
    feedback_Controller.update_Feedback
);

router.post(
    "/get-all-feedback",
    feedback_Controller.get_All_Feedback
);
router.post(
    "/get-feedback-by-user/:id", 
    feedback_Controller.get_Feedbacks_By_User_Id
);

router.post(
    "/soft-delete-feedback",
    feedback_Controller.soft_Delete_Feedback
);
router.post(
    "/restore-feedback",
    feedback_Controller.restore_Deleted_Feedback
);
router.post(
    "/delete-feedback",
    feedback_Controller.perma_Delete_Feedback
);
router.post(
    "/soft-delete-feedback-by-user",
    feedback_Controller.soft_Delete_Feedback_By_UserID
);
router.post(
    "/restore-feedback-by-user",
    feedback_Controller.restore_Deleted_Feedback_By_UserId
);
router.post(
    "/delete-feedback-by-user",
    feedback_Controller.perma_Delete_Feedback_By_UserId
);
router.post(
    "/get-feedback-info/:id",
    feedback_Controller.get_Feedback_Info
);
router.post(
    "/get-specific-feedback",
    feedback_Controller.get_Specific_Feedback
);
router.post(
    "/get-top4-feedback",
    feedback_Controller.getTop4Feedbacks
)
router.post(
    "/update-feedback-status/:id",
    feedback_Controller.update_Feedback_Status
);
module.exports = router;
