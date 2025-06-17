const Company = require("../models/Company");
const User1 = require("../models/User1");
const Company_Followed = require("../models/Company_Followed");
const Job_Post = require("../models/Job_Post");
const dayjs = require('dayjs');
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
const fs = require("fs")
require("dotenv").config();

class company_Controller {
    add_Company = async (req, res) => {
        try {
            console.log("✅ [Request Body]:", req.body);
            console.log("✅ [Request Files]:", req.files);
    
            const {
                career_id,
                company_name,
                company_email,
                company_phone,
                employee_size,
                tax_code,
                user_id,
                location_id,
                description,
                website_url,
                facebook_url,
                youtube_url,
                linkedin_url,
                established_date,
                is_deleted
            } = req.body;
    
            if (req.fileValidationError) throw new Error(req.fileValidationError);
    
            // Tạo company trước
            let company = await Company.create({
                career_id,
                company_name,
                company_email,
                company_phone,
                employee_size,
                tax_code,
                user_id,
                location_id,
                description,
                website_url,
                facebook_url,
                youtube_url,
                linkedin_url,
                established_date,
                is_deleted
            });
    
            let multi_media = [];
    
            // Upload media
            if (req.files && req.files.multi_media) {
                console.log("📁 Đang xử lý multi_media:", req.files.multi_media);
    
                for (const file of req.files.multi_media) {
                    console.log("⏫ Uploading multi_media file:", file.originalname);
                    const uploadResult = await cloudinary.uploader.upload(file.path, {
                        folder: "PBL7/multiMedia/",
                        public_id: `${company._id}_${Date.now()}`,
                        overwrite: true
                    });
    
                    multi_media.push({ image: uploadResult.secure_url });
                    fs.unlinkSync(file.path); // xóa file tạm
                }
    
                company.multi_media = multi_media;
            }
    
            // Upload logo
            if (req.files.logo && req.files.logo[0]) {
                const logoFile = req.files.logo[0];
                console.log("⏫ Uploading logo:", logoFile.originalname);
                const logoUpload = await cloudinary.uploader.upload(logoFile.path, {
                    folder: "PBL7/logo/",
                    public_id: `${company._id}_logo`,
                    overwrite: true
                });
                company.logo = logoUpload.secure_url;
                fs.unlinkSync(logoFile.path);
            }
    
            // Upload cover_image
            if (req.files.cover_image && req.files.cover_image[0]) {
                const coverFile = req.files.cover_image[0];
                console.log("⏫ Uploading cover_image:", coverFile.originalname);
                const coverUpload = await cloudinary.uploader.upload(coverFile.path, {
                    folder: "PBL7/coverImage/",
                    public_id: `${company._id}_cover`,
                    overwrite: true
                });
                company.cover_image = coverUpload.secure_url;
                fs.unlinkSync(coverFile.path);
            }
    
            await company.save();
    
            console.log("✅ Company saved successfully:", company._id);
            res.status(201).json(company);
        } catch (error) {
            console.error("❌ Error occurred:", error);
            res.status(400).json({ error: error.message });
        }
    };
    

  get_Company_List = async (req, res) => {
    try {
        let company

        company = await Company.find()
        .populate("career_id")
        .populate({
            path: "location_id",
            populate: [
                { path: "city_id" },
                { path: "district_id" }
            ]
        })
        .populate("user_id", "email phone profile_image username")

        res.status(200).json(company)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
  }

    get_Company_Id_By_Email = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User1.findOne({email: email})

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const company = await Company.findOne({ user_id: user?._id });

            if (!company) {
                return res.status(404).json({ error: "Company not found for this user" });
            }

            return res.status(200).json({ company_id: company?._id });
        } catch (error) {
            console.error("Error getting company ID:", error.message);
            return res.status(500).json({ error: error.message });
        }
    };

    get_Company_By_Email = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User1.findOne({email: email})

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const company = await Company.findOne({ user_id: user?._id })
            .populate("career_id")
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })
            .populate("user_id", "email phone profile_image username")

            if (!company) {
                return res.status(404).json({ error: "Company not found for this user" });
            }

            return res.status(200).json(company);
        } catch (error) {
            console.error("Error getting company ID:", error.message);
            return res.status(500).json({ error: error.message });
        }
    };


  get_Company = async (req, res) => {
    try {
        const id = req.params.id
        //   console.log("Received region_Id:", region_Id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false, message: 'Invalid History ID format'
            })
        }

        const company = await Company.findById(id)
            .populate("career_id")
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })
            .populate("user_id", "email phone profile_image username")

        if (!company) {
            return res.status(404).json({
                success: false, message: 'Company not found'
            })
        }

        res.status(200).json(company)
    } catch (error) {
        console.log('Error:', error.message)
        res.status(500).json({success: false, error: error.message})
    }
  }


    filterCompany = async (req, res) => {
        try {
            const { city_id, career_id } = req.body || {};

            if (city_id && !mongoose.Types.ObjectId.isValid(city_id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid city ID format',
                });
            }

            if (career_id && !mongoose.Types.ObjectId.isValid(career_id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid career ID format',
                });
            }

            const companies = await Company.find({ is_deleted: false })
                .populate({
                    path: 'location_id',
                    populate: {
                        path: 'city_id',
                    },
                })
                .populate('career_id')
                .populate('user_id', 'email phone profile_image username');

            const filteredCompanies = await Promise.all(companies
                .filter((company) => {
                    const matchCity = !city_id || (
                        company.location_id &&
                        company.location_id.city_id &&
                        company.location_id.city_id._id.toString() === city_id
                    );

                    const matchCareer = !career_id || (
                        company.career_id &&
                        company.career_id._id.toString() === career_id
                    );

                    return matchCity && matchCareer;
                })
                .map(async (company) => {
                    const jobCount = await Job_Post.countDocuments({
                        company_id: company._id,
                        is_deleted: false,
                        status: "Đã duyệt",
                        deadline: { $gte: dayjs().startOf('day').toDate() },
                    });

                    const followerCount = await Company_Followed.countDocuments({
                        company_id: company._id,
                        is_deleted: false,
                    });

                    return {
                        ...company.toObject(),
                        job_post_count: jobCount,
                        follower_count: followerCount,
                    };
                }));

            res.status(200).json({
                success: true,
                data: filteredCompanies,
            });
        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    };




    update_Company = async (req, res) => {
        try {
            const company_id = req.params.id;
            const {
                career_id,
                company_name,
                company_email,
                company_phone,
                employee_size,
                tax_code,
                location_id,
                description,
                website_url,
                facebook_url,
                youtube_url,
                linkedin_url,
                established_date,
                delete_images
            } = req.body;

            let company = await Company.findById(company_id);
            if (!company) return res.status(404).json({ error: "Company not found" });

            if (career_id) company.career_id = career_id;
            if (company_name) company.company_name = company_name;
            if (company_email) company.company_email = company_email;
            if (company_phone) company.company_phone = company_phone;
            if (employee_size) company.employee_size = employee_size;
            if (tax_code) company.tax_code = tax_code;
            if (location_id) company.location_id = location_id;
            if (description) company.description = description;
            if (website_url) company.website_url = website_url;
            if (youtube_url) company.youtube_url = youtube_url;
            if (facebook_url) company.facebook_url = facebook_url;
            if (linkedin_url) company.linkedin_url = linkedin_url;
            if (established_date) company.established_date = established_date;

            // Xóa ảnh multi_media nếu có yêu cầu
            if (delete_images && Array.isArray(delete_images)) {
                for (const imageUrl of delete_images) {
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`PBL7/multiMedia/${publicId}`);
                }

                company.multi_media = company.multi_media.filter(
                    img => !delete_images.includes(img.image)
                );
            }

            if (req.files && req.files.multi_media && req.files.multi_media.length > 0) {
                for (const file of req.files.multi_media) {
                    const uploadResult = await cloudinary.uploader.upload(file.path, {
                        folder: "PBL7/multiMedia/",
                        public_id: `${company._id}_${Date.now()}`,
                        overwrite: true
                    });

                    company.multi_media.push({ image: uploadResult.secure_url });
                    fs.unlinkSync(file.path);
                }
            }

            if (req.files && req.files.logo && req.files.logo[0]) {
                const logoFile = req.files.logo[0];
                const logoUpload = await cloudinary.uploader.upload(logoFile.path, {
                    folder: "PBL7/logo/",
                    public_id: `${company._id}_logo`,
                    overwrite: true
                });
                company.logo = logoUpload.secure_url;
                fs.unlinkSync(logoFile.path);
            }

            if (req.files && req.files.cover_image && req.files.cover_image[0]) {
                const coverFile = req.files.cover_image[0];
                const coverUpload = await cloudinary.uploader.upload(coverFile.path, {
                    folder: "PBL7/coverImage/",
                    public_id: `${company._id}_cover`,
                    overwrite: true
                });
                company.cover_image = coverUpload.secure_url;
                fs.unlinkSync(coverFile.path);
            }

            await company.save();

            // Populate nâng cao
            const populatedCompany = await Company.findById(company._id)
                .populate({
                    path: 'location_id',
                    populate: {
                        path: 'city_id',
                    },
                })
                .populate('career_id')
                .populate('user_id', 'email phone profile_image username');

            res.status(200).json({
                message: "Company updated successfully",
                company: populatedCompany
            });
        } catch (error) {
            console.error('Error updating company:', error.message);
            res.status(400).json({ error: error.message });
        }
    };


    delete_Company = async (req, res) => {
        try {
            const company_id = req.params.id;
    
            const company = await Company.findById(company_id);
            if (!company) return res.status(404).json({ error: "Company not found" });
    
            // Lấy danh sách public_id từ multi_media
            const public_Ids = company.multi_media
                .map((companyImage) => {
                    const image_Url = companyImage.image;
                    if (!image_Url) return null;
    
                    const public_Id = image_Url
                        .split("/")
                        .slice(-3)
                        .join("/")
                        .replace(/\.\w+$/, ""); // Bỏ phần mở rộng (.jpg, .png, ...)
                    return public_Id;
                })
                .filter((public_Id) => public_Id);
    
            // Thêm logo và cover_image nếu có
            if (company.logo) {
                const logo_Id = company.logo
                    .split("/")
                    .slice(-3)
                    .join("/")
                    .replace(/\.\w+$/, "");
                public_Ids.push(logo_Id);
            }
    
            if (company.cover_image) {
                const cover_Id = company.cover_image
                    .split("/")
                    .slice(-3)
                    .join("/")
                    .replace(/\.\w+$/, "");
                public_Ids.push(cover_Id);
            }
    
            if (public_Ids.length > 0) {
                const cloudinary_Delete_Promises = public_Ids.map((public_Id) => {
                    return new Promise((resolve, reject) => {
                        cloudinary.uploader.destroy(public_Id, (error, result) => {
                            if (error) {
                                console.error(` Failed to delete ${public_Id}:`, error.message);
                                return resolve(null);
                            }
                            resolve(result);
                        });
                    });
                });
    
                await Promise.all(cloudinary_Delete_Promises);
            }
    
            // Xóa company khỏi database
            await Company.findByIdAndDelete(company_id);
    
            res.status(200).json({
                message: "Company deleted successfully",
                company_id
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    delete_Company_By_User = async (req, res) => {
        try {
            const user_id = req.params.id;
    
            const company = await Company.find({user_id: user_id});
            if (!company) return res.status(404).json({ error: "Company not found" });
    
            // Lấy danh sách public_id từ multi_media
            const public_Ids = company.multi_media
                .map((companyImage) => {
                    const image_Url = companyImage.image;
                    if (!image_Url) return null;
    
                    const public_Id = image_Url
                        .split("/")
                        .slice(-3)
                        .join("/")
                        .replace(/\.\w+$/, ""); // Bỏ phần mở rộng (.jpg, .png, ...)
                    return public_Id;
                })
                .filter((public_Id) => public_Id);
    
            // Thêm logo và cover_image nếu có
            if (company.logo) {
                const logo_Id = company.logo
                    .split("/")
                    .slice(-3)
                    .join("/")
                    .replace(/\.\w+$/, "");
                public_Ids.push(logo_Id);
            }
    
            if (company.cover_image) {
                const cover_Id = company.cover_image
                    .split("/")
                    .slice(-3)
                    .join("/")
                    .replace(/\.\w+$/, "");
                public_Ids.push(cover_Id);
            }
    
            if (public_Ids.length > 0) {
                const cloudinary_Delete_Promises = public_Ids.map((public_Id) => {
                    return new Promise((resolve, reject) => {
                        cloudinary.uploader.destroy(public_Id, (error, result) => {
                            if (error) {
                                console.error(` Failed to delete ${public_Id}:`, error.message);
                                return resolve(null);
                            }
                            resolve(result);
                        });
                    });
                });
    
                await Promise.all(cloudinary_Delete_Promises);
            }
    
            // Xóa company khỏi database
            await Company.delete({user_id: user_id});
    
            res.status(200).json({
                message: "Company deleted successfully",
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    

  soft_Delete_Company = async (req, res) => {
      try {
          // get id list
          const { company_Ids } = req.body

          // if no ids
          if (
              !company_Ids ||
              !Array.isArray(company_Ids) ||
              company_Ids.length === 0
          ) {
              return res.status(400).json({ error: "No IDs provided" })
          }

          // update
          const result = await Company.updateMany(
          {_id: {$in: company_Ids}},
          {is_deleted: true}
          )

          res.status(200).json({
              message: 'Company soft deleted',
              modifiedCount: result.modifiedCount,
          })
      } catch (error) {
          console.log(error.message)
          res.status(400).json({error: error.message})
      }
  }

  restore_Deleted_Company = async (req, res) => {
      try {
          // get id list
          const { company_Ids } = req.body

          // if no ids
          if (
              !company_Ids ||
              !Array.isArray(company_Ids) ||
              company_Ids.length === 0
          ) {
              return res.status(400).json({error: 'No IDs provided'})
          }

          // update
          const result = await Company.updateMany(
              {_id: { $in: company_Ids}},
              {is_deleted: false}
          )

          res.status(200).json({
              message: 'Company restored',
              modifiedCount: result.modifiedCount,
          })
      } catch (error) {
          console.log(error.message)
          res.status(400).json({error: error.message})
      }
  }

  soft_Delete_Company_By_User = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }

            const result = await Company.updateMany(
                { user_id: user_id },
                { is_deleted: true }
            );
    
            res.status(200).json({
                message: 'Company soft deleted by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Company_By_User = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Company.updateMany(
                { user_id: user_id },
                { is_deleted: false }
            );
    
            res.status(200).json({
                message: 'Company restored by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ error: error.message });
        }
    };

    statistic_Top5_Company_With_Most_Approved_JobPosts = async (req, res) => {
        try {
            const today = dayjs().toDate();

            const result = await Job_Post.aggregate([
                {
                    $match: {
                        is_deleted: false,
                        status: "Đã duyệt",
                        deadline: { $gte: today }
                    }
                },
                {
                    $group: {
                        _id: "$company_id",
                        job_post_count: { $sum: 1 }
                    }
                },
                {
                    $sort: { job_post_count: -1 }
                },
                {
                    $limit: 5
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "_id",
                        foreignField: "_id",
                        as: "company"
                    }
                },
                {
                    $unwind: "$company"
                },
                {
                    $project: {
                        _id: "$company._id",
                        company_name: "$company.company_name",
                        company_logo: "$company.logo",
                        job_post_count: 1
                    }
                }
            ]);

            return res.status(200).json(result);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    };

}

module.exports = new company_Controller();
