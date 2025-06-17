const resume_Controller = require('../app/controllers/resume_Controller')
const require_Auth = require('../middleware/require_Auth')

const express = require('express')
const router = express.Router()
const { uploadPDF } = require("../middleware/multer")

router.post(
    '/update-resume-info/:id', 
    uploadPDF.none(),
    resume_Controller.update_Resume_Info
)
router.post(
    "/upload-attached-file/:id", 
    uploadPDF.single("attached-file"), (req, res) => {
    // Log để xác minh middleware đúng được gọi
        console.log("Middleware uploadPDF được kích hoạt");
        if (!req.file) {
        return res
            .status(400)
            .json({ error: "No file uploaded or invalid file type" });
        }
        resume_Controller.upload_Attached_Resume(req, res);
    });

router.post(
    '/filter-resume-list', 
    resume_Controller.get_Filtered_Resume_List
)
router.post(
    '/get-default-resume',
    resume_Controller.get_Default_Resume
)
router.post(
    '/get-attached-resume',
    resume_Controller.get_Attached_Resume
)
router.post(
    '/add-resume', 
    uploadPDF.none(),
    resume_Controller.add_Resume
)
router.post(
    '/get-resume-list', 
    resume_Controller.get_All_Resume
)
router.post(
    '/get-resumes-by-email', 
    resume_Controller.get_Resumes_By_Email
)
router.get(
    '/get-resume/:id', 
    resume_Controller.get_Resume
)
router.post(
    "/soft-delete-resume",
    resume_Controller.soft_Delete_Resume
);
router.post(
    "/restore-resume",
    resume_Controller.restore_Deleted_Resume
);
router.post(
    "/delete-resume",
    resume_Controller.perma_Delete_Resume
);
router.post(
    "/soft-delete-resume-by-user",
    resume_Controller.soft_Delete_Resume_By_UserID
);
router.post(
    "/restore-resume-by-user",
    resume_Controller.restore_Deleted_Resume_By_UserId
);
router.post(
    "/delete-resume-by-user",
    resume_Controller.perma_Delete_Resume_By_UserId
);

module.exports = router