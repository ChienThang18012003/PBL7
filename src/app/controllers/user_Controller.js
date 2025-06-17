const User1 = require('../models/User1')
const Company = require('../models/Company')
const Company_Followed = require('../models/Company_Followed')
const Location = require('../models/Location')
const cloudinary = require('../utils/cloudinary')

const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const moment = require('moment');
const dayjs = require('dayjs');
const Resume_Viewed = require('../models/Resume_Viewed')
const Resume_Saved = require('../models/Resume_Saved')
const Resume_Applied = require('../models/Resume_Applied')
const Resume = require('../models/Resume')
const Job_Post = require('../models/Job_Post')
const Job_Post_Saved = require('../models/Job_Post_Saved')

require('dotenv').config()

class user_Controller{

    create_Token = (_id, expiresIn = '1d') => {
        return jwt.sign({_id}, process.env.JWTSecret, {expiresIn})
    }
    
    acc_Login = async(req, res) => {
        // get info from body
        const {email, password} = req.body
        // get account
        try{
            let acc
            acc = await User1.login(email, password)

            if (acc.is_deleted || !acc?.is_active) {
                // console.log("Login failed. Account has been soft-deleted: ", email);
                return res.status(403).json({
                    error:
                        "Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên để được hỗ trợ.",
                });
            }

            const token = this.create_Token(acc._id)
            const role = acc?.role
            
            if(acc.role === "employer"){
                const verified = acc.verified
                res.status(200).json({email, token, role, verified})
            }else{
                res.status(200).json({email, token, role})
            }
        }catch(error){
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    acc_Signup = async (req, res) => {
        try {
            // get info from body
            const { email, password, username, role } = req.body
            //   const proof = req.file ? req.file.buffer : null
            console.log(req.body)
            let acc
        
            acc = await User1.add_User(email, password, username, role)
        
            // create token and respone
            const token = this.create_Token(acc._id)
            const confirm_Url = `${req.protocol}://${req.get(
                "host"
            )}/acc/confirm-acc/${token}`;

            await this.send_Confirmation_Email(email, confirm_Url);

            return res.status(201).json({ email, token, role })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ error: error.message })
        }
    }

    send_Confirmation_Email = async (email, confirm_Url) => {
        // Configure email transporter
        const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
        });

        const email_Template_Path = path.join(
            __dirname,
            "../views",
            "account-confirmation.ejs"
        );

        // Render email content
        const html_Content = await ejs.renderFile(email_Template_Path, {
            email,
            confirm_Url,
        });

        const mail_Options = {
            from: process.env.EMAIL,
            to: email,
            subject: "Xác nhận tài khoản",
            html: html_Content,
        };

        await transporter.sendMail(mail_Options);
    };

    confirm_Account = async (req, res) => {
        try {
            const token = req.params.token;

            if (!token) {
                throw new Error("Token is required");
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWTSecret);

            // Find user by ID first
            const user = await User1.findById(decoded._id);

            if (!user) {
                throw new Error("No user found");
            }

            // Build the update object
            const userUpdateFields = { is_deleted: false };
            if (user.role !== 'admin') {
                userUpdateFields.is_active = true;
            }

            // Update user with the appropriate fields
            const updatedUser = await User1.findByIdAndUpdate(
                decoded._id,
                userUpdateFields,
                { new: true }
            );

            if (updatedUser.role === 'employer') {
                const company = await Company.findOneAndUpdate(
                    { user_id: decoded._id },
                    { is_deleted: false },
                    { new: true }
                );

                if (!company) {
                    throw new Error("No company found");
                }

                const location = await Location.findOneAndUpdate(
                    { _id: company.location_id },
                    { is_deleted: false },
                    { new: true }
                );

                if (!location) {
                    throw new Error("No location found");
                }
            }

            return res.status(200).send(
                "<h1>Đã xác nhận tài khoản thành công</h1>"
            );
        } catch (error) {
            const error_Message =
                error.name === "TokenExpiredError"
                    ? "Đường dẫn xác nhận đã hết hạn. Xin hãy thử lại đường dẫn mới sau."
                    : "Đã xảy ra sự cố. Xin thử lại sau.";

            const html_Error_Content = await ejs.renderFile(
                path.join(__dirname, "../views", "landing-error.ejs"), {
                    error_Message,
                }
            );

            return res.status(400).send(html_Error_Content);
        }
    };


    get_Account_List = async(req, res) =>{
        try{
            let accounts, query
            const {user, hidden_state, verified} = req.body

            query = { is_deleted: hidden_state }
            query.verified = verified

            if (user === true) { 
                query.role = "user"
                accounts = await User1.find(query)
            } else { 
                query.role = "employer"
                accounts = await User1.find(query)
            }
            
            return res.status(200).json(accounts)

        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
 
    get_Account_By_Mail = async(req, res) =>{
        try{
            // get id
            const {email}= req.body

            let account = await User1.findOne({email})
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })

            return res.status(200).json(account)

        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Account = async(req, res) =>{
        try{
            // get id

            let account = await User1.find()
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })

            return res.status(200).json(account)

        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    update_Account_Status = async (req, res) => {
        try {
            const user_id = req.params.id;
            const { is_active } = req.body;

            // Cập nhật trạng thái của người dùng
            const updatedUser = await User1.findByIdAndUpdate(
                user_id,
                { is_active },
                { new: true }
            ).populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            });

            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            if (updatedUser?.role === 'employer') {
                const company = await Company.findOneAndUpdate(
                    { user_id: updatedUser?._id },
                    { is_deleted: !is_active }
                );

                if (company) {
                    await Company_Followed.updateMany(
                        { company_id: company?._id, is_deleted: is_active }, 
                        { is_deleted: !is_active }
                    );

                    await Resume_Viewed.updateMany(
                        { company_id: company?._id, is_deleted: is_active }, 
                        { is_deleted: !is_active }
                    );
                }

                await Job_Post.updateMany(
                    { user_id: updatedUser?._id, is_deleted: is_active }, 
                    { is_deleted: !is_active }
                );

                const jobPostIds = await Job_Post.find({ user_id: updatedUser._id }).distinct('_id');
                await Job_Post_Saved.updateMany(
                    { job_post_id: { $in: jobPostIds }, is_deleted: is_active },
                    { is_deleted: !is_active }
                );

                await Resume_Applied.updateMany(
                    { employer_id: updatedUser?._id, is_deleted: is_active }, 
                    { is_deleted: !is_active }
                );
            } else if (updatedUser?.role === 'user') {
                await Resume.updateMany(
                    { user_id: updatedUser?._id, is_deleted: is_active }, 
                    { is_deleted: !is_active }
                );

                const resumeIds = await Resume.find({ user_id: updatedUser._id }).distinct('_id');
                await Resume_Saved.updateMany(
                    { resume_id: { $in: resumeIds }, is_deleted: is_active },
                    { is_deleted: !is_active }
                );

                await Resume_Applied.updateMany(
                    { user_id: updatedUser?._id, is_deleted: is_active }, 
                    { is_deleted: !is_active }
                );
            }

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };


    get_Account_By_Id = async(req, res) =>{
        try{
            // get id
            const account_Id = req.params.id

            let account = await User1.findById(account_Id)
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })
            
            return res.status(200).json(account)
          
        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    get_Account_Status = async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
    
            const user = await User1.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ message: "No user found" });
            }
    
            return res.status(200).json({ is_active: user.is_active });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ error: error.message });
        }
    };

    update_Acc_Info = async(req, res) =>{
        try{

            // get info from body
            const {username, phone, martial_status, date_of_birth, gender, location_id} = req.body

            // get id
            const account_Id = req.params.id

            // find account
            let account = await User1.findById(account_Id)

            if(!account){
                return res.status(404).json({error: 'Account not found'})
            }

            let profile_image = null

            if (req.file) {

                const image_name = `${account_Id}_${Date.now()}`

                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'PBL7/profiles',
                    public_id: image_name,
                    overwrite: true // Replace any existing file with the same name
                })
        
                profile_image = uploadResult.secure_url
                fs.unlinkSync(req.file.path) // Delete temporary file
            }

            // update
            if(username){
                account.username = username
            }
            if(phone){
                account.phone = phone
            }
            if(martial_status){
                account.martial_status = martial_status
            }
            if(date_of_birth){
                account.date_of_birth = date_of_birth
            }
            if(gender){
                account.gender = gender
            }
            if(location_id){
                account.location_id = location_id
            }
            if(profile_image){ // if image
                account.profile_image = profile_image
            }
            
            await account.save()

            const populatedAccount = await User1.findById(account._id)
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            });
          
            return res.status(200).json(populatedAccount)
        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Account = async(req, res) =>{
        try{
            // get id list
            const {account_Ids} = req.body

            // if no ids
            if (!account_Ids || !Array.isArray(account_Ids) || account_Ids.length === 0) {
                return res.status(400).json({error: 'No IDs provided'});
            }

            // update
            const result = await User1.updateMany(
                {_id: {$in: account_Ids}},
                {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Account soft deleted',
                modifiedCount: result.modifiedCount
            })

        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Account = async(req, res) =>{
        try{
            // get id list
            const {account_Ids} = req.body

            // if no ids
            if (!account_Ids || !Array.isArray(account_Ids) || account_Ids.length === 0) {
                return res.status(400).json({error: 'No IDs provided'});
            }

            // update
            const result = await User1.updateMany(
                {_id: {$in: account_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Account restored',
                modifiedCount: result.modifiedCount
            })

        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Account = async(req, res) =>{
        try{
            // get id list
            const {account_Ids} = req.body

            // if no ids
            if (!account_Ids || !Array.isArray(account_Ids) || account_Ids.length === 0) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // Find the accounts to delete and retrieve their profile image public_ids
            const accounts = await User1.find({ _id: { $in: account_Ids } }, 'profile_image proof')

            // Prepare an array of public_ids to delete from Cloudinary
            const public_Ids = accounts.flatMap(account => [

                // Extract public_id from profile_image
                account.profile_image ? account.profile_image.split('/').slice(-3).join('/') : null,

                // Extract public_id from proof
                account.proof ? account.proof.split('/').slice(-3).join('/') : null,

            ].filter(Boolean))

            // Delete images from Cloudinary
            if (public_Ids.length > 0) {
                const cloudinary_Delete_Promises = public_Ids.map(public_Id => {
                    return new Promise((resolve) => {
                        cloudinary.uploader.destroy(public_Id, (error, result) => {
                            if (error) {
                                console.error(`Failed to delete ${public_Id}:`, error.message)
                                return resolve(null)
                            }
                            resolve(result)
                        })
                    })
                })

                await Promise.all(cloudinary_Delete_Promises) // Wait for all deletions to complete
            }

            // delete
            const result = await User1.deleteMany(
                {_id: {$in: account_Ids}}
            )

            return res.status(200).json({
                message: 'Account deleted',
                modifiedCount: result.modifiedCount
            })

        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    forgot_password = async(req, res) =>{
        try {
            const {email} = req.body
            const account = await User1.findOne({email})
            
            
            if(!account){
                return res.status(404).json({error: 'Account not found'})
            }
            
            // Generate a reset token
            const reset_Token = this.create_Token(account._id, '10m')

            // Configure email transporter
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_HOST,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false,
                }
            })
    
            const reset_URL = `${req.protocol}://${req.get('host')}/acc/reset-password/${reset_Token}`
            const mail_Options = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Đặt lại mật khẩu',
                html: `
                        <p>Xin hãy nhấn vào đường dẫn bên dưới để cài đặt lại mật khẩu:</p>
                        <a href="${reset_URL}">Đặt lại mật khẩu</a>
                        <p>Đường dẫn sẽ mất hiệu lực sau 10 phút</p>
                    `
            }
    
            await transporter.sendMail(mail_Options)
    
            return res.status(200).json({message: 'Password reset link sent to your email'})
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: error.message })
        }
    }
    
    reset_password = async(req, res) =>{
        try {
            const token = req.params.token
    
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWTSecret)
            const user = await User1.findById(decoded._id)
            
            
            if (!user) {
                throw new Error('Invalid or expired token')
            }

            // Generate new password
            const new_Password = crypto.randomBytes(4).toString('hex').slice(0, 8)
            
            // Set new password
            const updated_user = await User1.change_pass(user.email, new_Password , true)
            
            // Render the return page with the new password
            const html_Content = await ejs.renderFile(path.join(__dirname, '../views', 'password-reset-success.ejs'), {
                new_Password, // Pass the dynamic password to the template
            })

            return res.status(200).send(html_Content)
        } catch (error) {
            const error_Message =
            error.name === 'TokenExpiredError'
                ? 'Đường dẫn xác nhận đã hết hạn. Xin hãy thử lại đường dẫn mới sau.'
                : 'Đã xảy ra sự cố. Xin thử lại sau.'

            // Render the error page with the error message
            const html_Error_Content = await ejs.renderFile(path.join(__dirname, '../views', 'landing-error.ejs'), {
                error_Message, // Pass the error message to the template
            })

            // Send the error page as the response
            return res.status(400).send(html_Error_Content)
        }
    }

    change_password = async(req, res) =>{
        try{
            // const {email} = req.user
            const {email, new_password} = req.body
            const user = await User1.change_pass(email, new_password)
            
            console.log(user)
            return res.status(200).json({email, user})

        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    change_Account_Role = async(req, res) =>{
        try{
            const {email, role} = req.body

            let query = {role}

            const account = await User1.findOneAndUpdate(
                {email}, 
                query,
                {new: true}
            ).populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            });

            return res.status(200).json(account)
        }catch(error){
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    count_Users_By_Role = async (req, res) => {
        try {
            const userCount = await User1.countDocuments({ role: 'user', is_deleted: false });
            const employerCount = await User1.countDocuments({ role: 'employer', is_deleted: false });

            res.status(200).json({ user: userCount, employer: employerCount });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ error: error.message });
        }
    }

    statistic_Users_By_Date = async (req, res) => {
        try {
            const { start_date, end_date } = req.body;
            const today = dayjs().endOf('day');

            // Hàm tính khoảng cách ngày
            const diffDays = (start, end) => dayjs(end).diff(dayjs(start), 'day') + 1;

            let startDate, endDate;

            if (!start_date || !end_date) {
            // Mặc định 10 ngày gần nhất
            endDate = today;
            startDate = dayjs(endDate).subtract(14, 'day').startOf('day');
            } else {
            startDate = dayjs(start_date).startOf('day');
            endDate = dayjs(end_date).endOf('day');

            if (startDate.isAfter(endDate)) {
                return res.status(400).json({ error: "start_date phải nhỏ hơn hoặc bằng end_date" });
            }
            }

            const totalDays = diffDays(startDate, endDate);

            // Helper function để đếm theo ngày hoặc tháng
            const countByInterval = async (intervals, formatStr, isMonth = false) => {
            const userCounts = [];
            const employerCounts = [];

            for (const interval of intervals) {
                let from = interval.start;
                let to = interval.end;

                // Query với createdAt trong khoảng từ..đến
                const userCount = await User1.countDocuments({
                role: 'user',
                createdAt: { $gte: from.toDate(), $lte: to.toDate() },
                });

                const employerCount = await User1.countDocuments({
                role: 'employer',
                createdAt: { $gte: from.toDate(), $lte: to.toDate() },
                });

                userCounts.push(userCount);
                employerCounts.push(employerCount);
            }

            const labels = intervals.map(i => i.start.format(formatStr));
            return { labels, userCounts, employerCounts };
            };

            if (totalDays <= 15) {
            // Thống kê theo ngày từng ngày trong khoảng
            let intervals = [];
            for (let i = 0; i < totalDays; i++) {
                intervals.push({
                start: dayjs(startDate).add(i, 'day').startOf('day'),
                end: dayjs(startDate).add(i, 'day').endOf('day'),
                });
            }

            const result = await countByInterval(intervals, 'YYYY-MM-DD');
            return res.status(200).json(result);

            } else if (totalDays > 15 && totalDays <= 30) {
            // Lấy 10 ngày rải đều trong khoảng đó
            let intervals = [];
            const step = Math.floor(totalDays / 15);

            for (let i = 0; i < 15; i++) {
                let day = dayjs(startDate).add(i * step, 'day');
                intervals.push({
                start: day.startOf('day'),
                end: day.endOf('day'),
                });
            }

            const result = await countByInterval(intervals, 'YYYY-MM-DD');
            return res.status(200).json(result);

            } else {
            // Thống kê theo tháng
            // Lấy tháng đầu tiên của startDate đến tháng cuối cùng của endDate
            const startMonth = startDate.startOf('month');
            const endMonth = endDate.endOf('month');
            const totalMonths = endMonth.diff(startMonth, 'month') + 1;

            let intervals = [];
            for (let i = 0; i < totalMonths; i++) {
                let monthStart = startMonth.add(i, 'month').startOf('month');
                let monthEnd = monthStart.endOf('month');

                // Giới hạn tháng cuối cùng không vượt quá endDate
                if (monthEnd.isAfter(endDate)) {
                monthEnd = endDate;
                }

                intervals.push({
                start: monthStart,
                end: monthEnd,
                });
            }

            const result = await countByInterval(intervals, 'YYYY-MM');
            return res.status(200).json(result);
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    };

    send_Email = async (req, res) => {
        try {
            const { title, email, receiverEmail, content } = req.body;

            if (!email || !receiverEmail || !content) {
                return res.status(400).json({ message: "Missing fields!" });
            }

            // Tìm user theo email
            const user = await User1.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            // Tìm company theo user._id
            const company = await Company.findOne({ user_id: user._id })
            .populate("career_id")
            .populate({
                path: "location_id",
                populate: [
                    { path: "city_id" },
                    { path: "district_id" }
                ]
            })
            .populate("user_id", "email phone profile_image username");
            if (!company) {
                return res.status(404).json({ message: "Company not found!" });
            }

            // Tạo nội dung email từ EJS
            const emailHtml = await ejs.renderFile(
                path.join(__dirname, "../views", "email-template.ejs"),
                {
                    company_name: company?.company_name,
                    content: content,
                    company_logo: company?.logo,
                    company_phone: company?.company_phone,
                    company_email: company?.company_email,
                    company_website: company?.website_url,
                    company_address: company?.location_id?.address
                }
            );

            // Gửi email
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_HOST,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: receiverEmail,
                subject: title,
                html: emailHtml,
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: "Email sent successfully!" });
        } catch (err) {
            console.error("Error sending email:", err.message);
            res.status(500).json({ message: "Server error!" });
        }
    };

}

module.exports = new user_Controller
