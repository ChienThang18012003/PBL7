const Company_Followed = require('../models/Company_Followed')
const User1 = require('../models/User1')
const Company = require('../models/Company')


class company_followed_Controller{
    add_Company_Followed = async(req, res) =>{
        try{
            const {company_id, email} = req.body

            const company = await Company.findOne({_id: company_id}, {_id: 1})
            if (!company) {
                return res.status(404).json({error: 'Company not found'})
            }
            console.log("email: ",email);

            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({error: 'user not found'})
            }

            // const post = await Post.create({
            //     user_id: account._id, 
            //     speciality_id: speciality.id, 
            //     post_title, 
            //     post_content
            // })
            // .populate('user_id', 'email username __t profile_image')
            // .populate('speciality_id', 'name')


            const createdCompanyFollowed = await Company_Followed.create({
                company_id: company._id,
                user_id: user?._id
            });
    
            // Populate the created post
            const companyFollowed = await Company_Followed.findById(createdCompanyFollowed._id)
                .populate('company_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(companyFollowed)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Company_Followed = async(req, res) =>{
        try{
            const company_followed_id = req.params.id

            const companyFollowed = await Company_Followed.findById(company_followed_id)
                .populate('company_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(companyFollowed)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Specific_Company_Followed = async(req, res) =>{
        try{
            const {company_id, email} = req.body
            const user = await User1.findOne({email: email});
            const companyFollowed = await Company_Followed.findOne({company_id: company_id, user_id: user?._id})
                .populate('company_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(companyFollowed)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Company_Followed_By_User = async(req, res) =>{
        try{
            const {email} = req.body

            const user = await User1.findOne({email: email})
            if (!user) {
                return res.status(404).json({error: 'user not found'})
            }
            
            const companyFollowed = await Company_Followed.find({user_id: user?._id, is_deleted: false})
                .populate({
                path: "company_id",
                populate: [
                    { path: "career_id" },
                    { path: "location_id",
                        populate: [
                            {path: "city_id"},
                            {path: "district_id"}
                        ]
                    }
                ]
            })


            return res.status(200).json(companyFollowed )
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Company_Followed = async(req, res) =>{
        try{
            
            const companyFollowed = await Company_Followed.find()
                .populate('company_id')
                .populate('user_id', 'email username phone')

            return res.status(200).json(companyFollowed)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Company_Followed = async (req, res) => {
        try {
            // get id list
            const { company_followed_Ids } = req.body

            // if no ids
            if (
                !company_followed_Ids ||
                !Array.isArray(company_followed_Ids) ||
                company_followed_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Company_Followed.updateMany(
            {_id: {$in: company_followed_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Company Followed soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Company_Followed = async (req, res) => {
        try {
            // get id list
            const { company_followed_Ids } = req.body

            // if no ids
            if (
                !company_followed_Ids ||
                !Array.isArray(company_followed_Ids) ||
                company_followed_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Company_Followed.updateMany(
                {_id: { $in: company_followed_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Company Followed restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Company_Followed = async (req, res) => {
        try {
            // get id list
            const {company_followed_Ids} = req.body

            // if no ids
            if (
                !company_followed_Ids ||
                !Array.isArray(company_followed_Ids) ||
                company_followed_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Company_Followed.deleteMany({_id: {$in: company_followed_Ids}})

            return res.status(200).json({
                message: 'Company Followed deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Company_Followed_By_User = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }

            const result = await Company_Followed.updateMany(
                { user_id: user_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Company Followed soft deleted by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Company_Followed_By_User = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Company_Followed.updateMany(
                { user_id: user_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Company Followed restored by user_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Company_Followed_By_User = async (req, res) => {
        try {
            const { user_id } = req.body;
    
            if (!user_id) {
                return res.status(400).json({ error: "No user_id provided" });
            }
    
            const result = await Company_Followed.deleteMany({ user_id: user_id });
    
            return res.status(200).json({
                message: 'Company Followed permanently deleted by user_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new company_followed_Controller