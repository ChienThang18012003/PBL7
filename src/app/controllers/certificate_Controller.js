const Certificate = require('../models/Certificate')
const Resume = require('../models/Resume')


class certificate_Controller{
    add_Certificate = async(req, res) =>{
        try{
            const {resume_id, name, training_place, start_date, expiration_date, description} = req.body

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})
            if (!resume) {
                return res.status(404).json({error: 'Resume not found'})
            }

            // const post = await Post.create({
            //     user_id: account._id, 
            //     speciality_id: speciality.id, 
            //     post_title, 
            //     post_content
            // })
            // .populate('user_id', 'email username __t profile_image')
            // .populate('speciality_id', 'name')

            const createdCertificate = await Certificate.create({
                resume_id: resume._id,
                name,
                training_place,
                start_date,
                expiration_date,
                description
            });
    
            // Populate the created post
            const certificate = await Certificate.findById(createdCertificate._id)
                .populate('resume_id')

            return res.status(200).json(certificate)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Certificate = async(req, res) =>{
        try{
            const certificate_id = req.params.id

            const certificate = await Certificate.findById(certificate_id)
                .populate('resume_id')

            return res.status(200).json(certificate)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_Certificate_By_Resume = async(req, res) =>{
        try{
            const {resume_id} = req.body
            
            const certificates = await Certificate.find({resume_id: resume_id})

            return res.status(200).json(certificates)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Certificate = async(req, res) =>{
        try{
            
            const certificates = await Certificate.find()
                .populate('resume_id')

            return res.status(200).json(certificates)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Certificate = async(req, res) =>{
        try{
            const certificate_id = req.params.id
            const {resume_id, name, training_place, start_date, expiration_date, description} = req.body

            const query = {name, training_place, start_date, expiration_date, description}

            const resume = await Resume.findOne({_id: resume_id}, {_id: 1})

            if(resume){
                query.resume_id = resume._id
            }

            let certificate = await Certificate.findByIdAndUpdate(
                certificate_id,
                query,
                {new: true}
            )
            .populate('resume_id')

            if (!certificate) {
                return res.status(404).json({error: 'Certificate not found'})
            }

            return res.status(200).json(certificate)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Certificate = async (req, res) => {
        try {
            // get id list
            const { certificate_Ids } = req.body

            // if no ids
            if (
                !certificate_Ids ||
                !Array.isArray(certificate_Ids) ||
                certificate_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Certificate.updateMany(
            {_id: {$in: certificate_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Certificate soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Certificate = async (req, res) => {
        try {
            // get id list
            const { certificate_Ids } = req.body

            // if no ids
            if (
                !certificate_Ids ||
                !Array.isArray(certificate_Ids) ||
                certificate_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Certificate.updateMany(
                {_id: { $in: certificate_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Certificate restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Certificate = async (req, res) => {
        try {
            // get id list
            const {certificate_Ids} = req.body

            // if no ids
            if (
                !certificate_Ids ||
                !Array.isArray(certificate_Ids) ||
                certificate_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Certificate.deleteMany({_id: {$in: certificate_Ids}})

            return res.status(200).json({
                message: 'Certificate deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
    soft_Delete_Certificate_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }

            const result = await Certificate.updateMany(
                { resume_id: resume_id },
                { is_deleted: true }
            );
    
            return res.status(200).json({
                message: 'Certificate soft deleted by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    restore_Deleted_Certificate_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Certificate.updateMany(
                { resume_id: resume_id },
                { is_deleted: false }
            );
    
            return res.status(200).json({
                message: 'Certificate restored by resume_id',
                modifiedCount: result.modifiedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
    
    perma_Delete_Certificate_By_Resume = async (req, res) => {
        try {
            const { resume_id } = req.body;
    
            if (!resume_id) {
                return res.status(400).json({ error: "No resume_id provided" });
            }
    
            const result = await Certificate.deleteMany({ resume_id: resume_id });
    
            return res.status(200).json({
                message: 'Certificate permanently deleted by resume_id',
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new certificate_Controller