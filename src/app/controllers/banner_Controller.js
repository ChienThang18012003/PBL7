const Banner = require('../models/Banner')
const User1 = require('../models/User1')
const cloudinary = require('../utils/cloudinary')

// const multer = require('multer')
// const { promisify } = require('util')
const fs = require("fs")
// const path = require("path")
// const mime = require("mime-types")
require('dotenv').config()

// const storage = multer.memoryStorage()

// const upload = multer({
//     storage: storage,
//     fileFilter: (res, file, cb) => {
//         if (file.mimetype === 'image/jpeg') {
//             cb(null, true)
//         } else {
//             cb(new Error('Only JPG image files are allowed'))
//         }
//     },
// }).single('article_image')

// const uploadPromise = promisify(upload)

class banner_Controller {
    add_Banner = async (req, res) => {
        try {
            // await uploadPromise(req, res)

            const { email, type } = req.body
        
            const user = await User1.findOne({ email }, { _id: 1 })

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            let banner = await Banner.create({
                user_id: user._id,
                type
            })

            let banner_image = null

            if (req.file) {

                const image_name = `${banner._id}_${Date.now()}`

                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'PBL7/banners/',
                    public_id: image_name,
                    overwrite: true // Replace any existing file with the same name
                })
        
                banner_image = uploadResult.secure_url
                fs.unlinkSync(req.file.path) // Delete temporary file
            }

            if (banner_image) {
                banner.banner_image = banner_image
                await banner.save()
            }

            banner = await Banner.findById(banner?._id)
            .populate({
                path: 'user_id',
                select: 'email username',
            })

            return res.status(201).json(banner)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    get_Banner = async(req, res) =>{
        try{
            const banner_id = req.params.id

            const banner = await Banner.findById(banner_id)
            .populate({
                path: 'user_id',
                select: 'email username',
            })

            return res.status(200).json(banner)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Banner_By_Email = async(req, res) =>{
        try{
            const {email} = req.body
            const user = await User1.findOne({email}, {_id: 1})
            
            const banners = await Banner.find({user_id: user._id})
            .populate({
                path: 'user_id',
                select: 'email username',
            })

            return res.status(200).json(banners)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Banner_By_Type = async(req, res) =>{
        try{
            const {type} = req.body
            
            const banners = await Banner.find({type: type})
            .populate({
                path: 'user_id',
                select: 'email username',
            })

            return res.status(200).json(banners)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Banner = async(req, res) =>{
        try{
            let banners
            const { hidden_state } = req.body
            

            if (hidden_state == "true") {
            banners = await Banner.find({ is_deleted: true }).populate({
                path: 'user_id',
                select: 'email username',
            })
            } else {
            banners = await Banner.find({ is_deleted: false }).populate({
                path: 'user_id',
                select: 'email username',
            })
            }
            return res.status(200).json(banners)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }


    update_Banner = async(req, res) =>{
        try{
            // await uploadPromise(req, res)

            const banner_id = req.params.id
            const {type} = req.body

            let banner = await Banner.findById(banner_id)

            let banner_image = null

            if (req.file) {

                const image_name = `${banner._id}_${Date.now()}`

                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'PBL7/banners/',
                    public_id: image_name,
                    overwrite: true // Replace any existing file with the same name
                })
        
                banner_image = uploadResult.secure_url
                fs.unlinkSync(req.file.path) // Delete temporary file
            }

            if (!banner) {
                throw new Error('Banner not found')
            }

            if (type) {
                banner.type = type
            }

            if (banner_image) {
                banner.banner_image = banner_image
            }

            await banner.save()

            banner = await Banner.findById(banner_id)
            .populate({
                path: 'user_id',
                select: 'email username',
            })

            return res.status(200).json(banner)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Banner = async(req, res) =>{
        try{
            // get id list
            const {banner_ids} = req.body

            // if no ids
            if (!banner_ids || !Array.isArray(banner_ids) || banner_ids.length === 0) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            const result = await Banner.updateMany(
                {_id: {$in: banner_ids}},
                {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Banners soft deleted',
                modifiedCount: result.modifiedCount
            }) 

        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    restore_Banner = async(req, res) =>{
        try{
            // get id list
            const {banner_ids} = req.body

            // if no ids
            if (!banner_ids || !Array.isArray(banner_ids) || banner_ids.length === 0) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            const result = await Banner.updateMany(
                {_id: {$in: banner_ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Banners restored',
                modifiedCount: result.modifiedCount
            })

        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Banner = async(req, res) =>{
        try{
            // get id list
            const {banner_Ids} = req.body
            

            // if no ids
            if (!banner_Ids || !Array.isArray(banner_Ids) || banner_Ids.length === 0) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            
            const banners = await Banner.find({ _id: { $in: banner_Ids } }, 'banner_image')

            // Prepare an array of public_ids to delete from Cloudinary
            const public_Ids = banners.map(banner => {
                const image_Url = banner.banner_image

                if (!image_Url) return null
                
                const url_Parts = image_Url.split('/')
                const public_Id = url_Parts.slice(-3).join('/')// Extract public_id from URL
                return public_Id
            }).filter(public_Id => public_Id)

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

            const result = await Banner.deleteMany(
                {_id: {$in: banner_Ids}}
            )

            return res.status(200).json({
                message: 'Banners deleted',
                modifiedCount: result.deletedCount
            })

        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Banner_By_UserID = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }

            const result = await Banner.updateMany(
                { user_id: user_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Banners soft deleted by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Banner_By_UserId = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Banner.updateMany(
                { user_id: user_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Banner restored by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Banner_By_UserId = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const banners = await Banner.find({ user_id: user_id }, 'banner_image')

            // Prepare an array of public_ids to delete from Cloudinary
            const public_Ids = banners.map(banner => {
                const image_Url = banner.banner_image

                if (!image_Url) return null
                
                const url_Parts = image_Url.split('/')
                const public_Id = url_Parts.slice(-3).join('/')// Extract public_id from URL
                return public_Id
            }).filter(public_Id => public_Id)

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

            const result = await Banner.deleteMany({ user_id: user_id });
    
            return res.status(200).json({
                message: 'Feedback permanently deleted by user_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new banner_Controller()
