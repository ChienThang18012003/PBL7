const District = require('../models/District')
const City = require('../models/City')


class district_Controller{
    add_District = async(req, res) =>{
        try{
            const {city_name, name} = req.body

            const city = await City.findOne({name: city_name}, {_id: 1})
            if (!city) {
                return res.status(404).json({error: 'City not found'})
            }

            // const post = await Post.create({
            //     user_id: account._id, 
            //     speciality_id: speciality.id, 
            //     post_title, 
            //     post_content
            // })
            // .populate('user_id', 'email username __t profile_image')
            // .populate('speciality_id', 'name')

            const createdDistrict = await District.create({
                city_id: city._id,
                name
            });
    
            // Populate the created post
            const district = await District.findById(createdDistrict._id)
                .populate('city_id')

            return res.status(200).json(district)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_District = async(req, res) =>{
        try{
            const district_id = req.params.id

            const district = await District.findById(district_id)
                .populate('city_id')

            return res.status(200).json(district)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_all_District_By_City = async(req, res) =>{
        try{
            const {name} = req.body
            const city = await City.findOne({name: name})

            if (!city) {
                return res.status(400).json({error: "City not found"})
            }
            
            const districts = await District.find({city_id: city._id})

            return res.status(200).json(districts)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_District = async(req, res) =>{
        try{
            
            const dictricts = await District.find()
                .populate('city_id')

            return res.status(200).json(dictricts)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_District = async(req, res) =>{
        try{
            const district_id = req.params.id
            const {name, city_name} = req.body

            const query = {name}

            const city = await City.findOne({name: city_name}, {_id: 1})

            if(city){
                query.city_id = city._id
            }

            let district = await District.findByIdAndUpdate(
                district_id,
                query,
                {new: true}
            )
            .populate('city_id')

            if (!district) {
                return res.status(404).json({error: 'District not found'})
            }

            return res.status(200).json(district)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_District = async (req, res) => {
        try {
            // get id list
            const { district_Ids } = req.body

            // if no ids
            if (
                !district_Ids ||
                !Array.isArray(district_Ids) ||
                district_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await District.updateMany(
            {_id: {$in: district_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'District soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_District = async (req, res) => {
        try {
            // get id list
            const { district_Ids } = req.body

            // if no ids
            if (
                !district_Ids ||
                !Array.isArray(district_Ids) ||
                district_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await District.updateMany(
                {_id: { $in: district_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'District restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_District = async (req, res) => {
        try {
            // get id list
            const {district_Ids} = req.body

            // if no ids
            if (
                !district_Ids ||
                !Array.isArray(district_Ids) ||
                district_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await District.deleteMany({_id: {$in: district_Ids}})

            return res.status(200).json({
                message: 'District deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
}

module.exports = new district_Controller