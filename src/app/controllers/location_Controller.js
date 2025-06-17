const District = require('../models/District')
const City = require('../models/City')
const Location = require('../models/Location')
const { request } = require('express')


class location_Controller{
    add_Location = async(req, res) =>{
        try{
            const {city_name, district_id, lat, lng, address, is_deleted} = req.body

            console.log(request.body);
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

            const createdLocation = await Location.create({
                city_id: city._id,
                district_id: district_id,
                lat,
                lng,
                address,
                is_deleted
            });
    
            // Populate the created location
            const location = await Location.findById(createdLocation._id)
                .populate('city_id')
                .populate('district_id')

            return res.status(200).json(location)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_Location = async(req, res) =>{
        try{
            const location_id = req.params.id

            const location = await Location.findById(location_id)
                .populate('city_id')
                .populate('district_id')

            return res.status(200).json(location)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    get_All_Location = async(req, res) =>{
        try{
            
            const locations = await Location.find()
                .populate('city_id')
                .populate('district_id')

            return res.status(200).json(locations)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    update_Location = async(req, res) =>{
        try{
            const location_id = req.params.id
            const {city_name, district_id, lat, lng, address} = req.body

            const query = {lat, lng, address, district_id}

            const city = await City.findOne({name: city_name}, {_id: 1})

            if(city){
                query.city_id = city._id
            }

            let location = await Location.findByIdAndUpdate(
                location_id,
                query,
                {new: true}
            )
            .populate('city_id')
            .populate('district_id')

            if (!location) {
                return res.status(404).json({error: 'Location not found'})
            }

            return res.status(200).json(location)
        }catch(error){
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_Location = async (req, res) => {
        try {
            // get id list
            const { location_Ids } = req.body

            // if no ids
            if (
                !location_Ids ||
                !Array.isArray(location_Ids) ||
                location_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await Location.updateMany(
            {_id: {$in: location_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'Location soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_Location = async (req, res) => {
        try {
            // get id list
            const { location_Ids } = req.body

            // if no ids
            if (
                !location_Ids ||
                !Array.isArray(location_Ids) ||
                location_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await Location.updateMany(
                {_id: { $in: location_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'Location restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_Location = async (req, res) => {
        try {
            // get id list
            const {location_Ids} = req.body

            // if no ids
            if (
                !location_Ids ||
                !Array.isArray(location_Ids) ||
                location_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await Location.deleteMany({_id: {$in: location_Ids}})

            return res.status(200).json({
                message: 'Location deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
    
}

module.exports = new location_Controller