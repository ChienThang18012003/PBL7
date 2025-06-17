const Career = require("../models/Career");
const Job_Post = require("../models/Job_Post");
const cloudinary = require("../utils/cloudinary");
const dayjs = require('dayjs');

const fs = require("fs");
const mongoose = require("mongoose");

require("dotenv").config();

class career_Controller {
    add_Career = async (req, res) => {
        try {
            // get info from body
            const { career_name } = req.body;

            const exists_Career = await Career.findOne({ career_name });

            if (exists_Career) {
                throw new Error("Career already exist");
            }

            if (req.fileValidationError) throw new Error(req.fileValidationError);

            //create
            let career = await Career.create({ career_name });

            let career_logo = null;

            if (req.file) {
                const image_name = `${career._id}_${Date.now()}`;

                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "PBL7/careers",
                    public_id: career._id,
                    overwrite: true, // Replace any existing file with the same name
                });

                career_logo = uploadResult.secure_url;
                fs.unlinkSync(req.file.path); // Delete temporary file
            }

            if (career_logo) {
                career.career_logo = career_logo;
                await career.save();
            }

            return res.status(201).json(career);
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    get_Career_By_ID = async (req, res) => {
        try {
            // Get _id from req.body
            const id = req.params.id;

            // Find speciality by ID
            const career = await Career.findById(id);

            // If not found
            if (!career) {
                return res.status(404).json({ error: "Career not found" });
            }

            return res.status(200).json(career);
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    get_Career_List = async (req, res) => {
        try {
            let careers;
            const { hidden_state } = req.body;

            // find list of career
            if (JSON.parse(hidden_state)) {
                careers = await Career.find({ is_deleted: true });
            } else {
                careers = await Career.find({ is_deleted: false });
            }

            return res.status(200).json(careers);
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    update_Career = async (req, res) => {
        try {
            // get info from body
            const { career_name } = req.body;

            // get id
            const career_Id = req.params.id;

            // find career
            let career = await Career.findById(career_Id);

            if (!career) {
                return res.status(404).json({ error: "Career not found" });
            }

            if (req.fileValidationError) throw new Error(req.fileValidationError);

            let career_logo = career.career_logo;

            if (req.file) {

                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "PBL7/careers",
                    public_id: career._id,
                    overwrite: true, // Replace any existing file with the same name
                });

                career_logo = uploadResult.secure_url;
                fs.unlinkSync(req.file.path); // Delete temporary file
            }

            // update
            if (career_name) {
                const existingCareer = await Career.findOne({
                    career_name,
                    _id: { $ne: career_Id },
                });
                if (existingCareer) {
                    throw new Error("Career already exits");
                }
                career.career_name = career_name;
            }

            career.career_logo = career_logo;

            await career.save();

            return res.status(200).json(career);
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    soft_Delete_Career = async (req, res) => {
        try {
            // get id list
            const { career_Ids } = req.body;

            // if no ids
            if (
                !career_Ids ||
                !Array.isArray(career_Ids) ||
                career_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" });
            }

            // update
            const result = await Career.updateMany(
                { _id: { $in: career_Ids } },
                { is_deleted: true }
            );

            return res.status(200).json({
                message: "Career soft deleted",
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    restore_Deleted_Career = async (req, res) => {
        try {
            // get id list
            const { career_Ids } = req.body;

            // if no ids
            if (
                !career_Ids ||
                !Array.isArray(career_Ids) ||
                career_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" });
            }

            // update
            const result = await Career.updateMany(
                { _id: { $in: career_Ids } },
                { is_deleted: false }
            );

            return res.status(200).json({
                message: "Career restored",
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    perma_Delete_Career = async (req, res) => {
        try {
            // get id list
            const { career_Ids } = req.body;

            // if no ids
            if (
                !career_Ids ||
                !Array.isArray(career_Ids) ||
                career_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" });
            }

            // Find the brands to delete and retrieve their image public_ids
            const careers = await Career.find(
                { _id: { $in: career_Ids } },
                "career_logo"
            );

            // Prepare an array of public_ids to delete from Cloudinary
            const public_Ids = careers.map((career) => {
                const image_Url = career.career_logo;

                if (!image_Url) return null;

                // Extract public_id from URL
                const public_Id = image_Url
                    .split("/")
                    .slice(-3)
                    .join("/")
                    .replace(/\.\w+$/, "");

                return public_Id; //public_Id
            }).filter((public_Id) => public_Id);

            // Delete images from Cloudinary
            if (public_Ids.length > 0) {
                const cloudinary_Delete_Promises = public_Ids.map((public_Id) => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(public_Id, (error, result) => {
                    console.log({ error, result });
                    if (error) {
                        console.error(`Failed to delete ${public_Id}:`, error.message);
                        return resolve(null);
                    }
                    resolve(result);
                    });
                });
                });

                await Promise.all(cloudinary_Delete_Promises); // Wait for all deletions to complete
            }

            // delete
            const result = await Career.deleteMany({
                _id: { $in: career_Ids },
            });

            return res.status(200).json({
                message: "Career deleted",
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };

    getCareerData = async (req, res) => {
        try {
            const career_Id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(career_Id)) {
                return res
                .status(400)
                .json({ success: false, message: "Invalid Career ID format" });
            }
            const careerData = await Career.findById(career_Id);
            return res.json({ success: true, careerData });
        } catch (error) {
        console.log(error);
            return res.json({ success: false, message: error.message });
        }
    };

    statistic_Top5_Career_By_Job_Post = async (req, res) => {
        try {
            const { start_date, end_date } = req.body;
            const today = dayjs().endOf('day');

            let startDate, endDateFinal;
            if (!start_date || !end_date) {
                endDateFinal = today;
                startDate = dayjs(endDateFinal).subtract(29, 'day').startOf('day');
            } else {
                startDate = dayjs(start_date).startOf('day');
                endDateFinal = dayjs(end_date).endOf('day');

                if (startDate.isAfter(endDateFinal)) {
                    return res.status(400).json({ error: "start_date phải nhỏ hơn hoặc bằng end_date" });
                }
            }

            const thisday = dayjs().toDate();
            const result = await Job_Post.aggregate([
                {
                    $match: {
                        created_at: { $gte: startDate.toDate(), $lte: endDateFinal.toDate() },
                        is_deleted: false,
                        status: 'Đã duyệt',
                        deadline: { $gte: thisday }
                    }
                },
                {
                    $group: {
                        _id: '$career_id',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 5
                },
                {
                    $lookup: {
                        from: 'careers',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'career'
                    }
                },
                {
                    $unwind: '$career'
                },
                {
                    $project: {
                        _id: 0,
                        career_name: '$career.career_name',
                        count: 1
                    }
                }
            ]);

            const labels = result.map(item => item.career_name);
            const counts = result.map(item => item.count);

            return res.status(200).json({ labels, counts });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };

    statistic_Top8_Career_By_Job_Post = async (req, res) => {
        try {
            const today = dayjs().toDate();
            const result = await Job_Post.aggregate([
                {
                    $match: {
                        is_deleted: false,
                        status: 'Đã duyệt',
                        deadline: { $gte: today }
                    }
                },
                {
                    $group: {
                        _id: '$career_id',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 8
                },
                {
                    $lookup: {
                        from: 'careers',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'career'
                    }
                },
                {
                    $unwind: '$career'
                },
                {
                    $project: {
                        _id: 0,
                        career: '$career',
                        count: 1
                    }
                }
            ]);

            return res.status(200).json(result);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };



    // getDoctorsCountPerSpeciality = async (req, res) => {
    //     try {
    //         const result = await Doctor.aggregate([
    //             {
    //             $group: {
    //                 _id: "$speciality_id",
    //                 doctorCount: { $sum: 1 },
    //             },
    //             },
    //             {
    //             $lookup: {
    //                 from: "specialities",
    //                 localField: "_id",
    //                 foreignField: "_id",
    //                 as: "specialityDetails",
    //             },
    //             },
    //             {
    //             $unwind: "$specialityDetails",
    //             },
    //             {
    //             $match: {
    //                 "specialityDetails.is_deleted": false,
    //             },
    //             },
    //             {
    //             $project: {
    //                 _id: 0,
    //                 speciality: "$specialityDetails.name",
    //                 doctorCount: 1,
    //             },
    //             },
    //             {
    //             $sort: { doctorCount: -1 },
    //             },
    //             {
    //             $limit: 5,
    //             },
    //         ]);

    //         if (!result.length) {
    //             return res
    //             .status(404)
    //             .json({ message: "No specialties with doctors found." });
    //         }

    //         return res.status(200).json({ data: result });
    //     } catch (err) {
    //         console.error("Error :", err);
    //         return res.status(500).json({
    //             error: "An error occurred .",
    //         });
    //     }
    // };
}

module.exports = new career_Controller();
