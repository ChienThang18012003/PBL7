const City = require('../models/City')
const mongoose = require('mongoose')
const axios = require('axios');


class city_Controller {

    add_City = async (req, res) => {
        try {
            // get info from body
            const {name} = req.body

            const exists_reg = await City.findOne({name})

            if (exists_reg) {
                throw new Error('City already exits')
            }

            // create
            const city = await City.create({name})

            return res.status(201).json(city)
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    fetchVNLocation = async (req, res) => {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/?depth=2');
            return res.json(response.data); // chuyển tiếp data về client
        } catch (error) {
            return res.status(500).json({ error: 'Không lấy được dữ liệu từ API ngoài' });
        }
    };

    get_City_List = async (req, res) => {
        try {
            let cities
            const {hidden_state} = req.body

            // find list of city
            if (hidden_state == 'true') {
                cities = await City.find({is_deleted: true})
            } else {
                cities = await City.find({is_deleted: false})
            }

            return res.status(200).json(cities)
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    update_City = async (req, res) => {
        try {
            // get info from body
            const {name} = req.body

            // get id
            const city_Id = req.params.id

            // update
            if (!name) {
                throw new Error('Missing information')
            }

            const existing_City = await City.findOne({
                name,
                _id: { $ne: city_Id },
            })
            if (existing_City) {
                throw new Error('City already exits')
            }

            const city = await City.findByIdAndUpdate(
                city_Id,
                {name},
                {new: true}
            )

            return res.status(200).json(city)
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    soft_Delete_City = async (req, res) => {
        try {
            // get id list
            const { city_Ids } = req.body

            // if no ids
            if (
                !city_Ids ||
                !Array.isArray(city_Ids) ||
                city_Ids.length === 0
            ) {
                return res.status(400).json({ error: "No IDs provided" })
            }

            // update
            const result = await City.updateMany(
            {_id: {$in: city_Ids}},
            {is_deleted: true}
            )

            return res.status(200).json({
                message: 'City soft deleted',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    restore_Deleted_City = async (req, res) => {
        try {
            // get id list
            const { city_Ids } = req.body

            // if no ids
            if (
                !city_Ids ||
                !Array.isArray(city_Ids) ||
                city_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // update
            const result = await City.updateMany(
                {_id: { $in: city_Ids}},
                {is_deleted: false}
            )

            return res.status(200).json({
                message: 'City restored',
                modifiedCount: result.modifiedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    perma_Delete_City = async (req, res) => {
        try {
            // get id list
            const {city_Ids} = req.body

            // if no ids
            if (
                !city_Ids ||
                !Array.isArray(city_Ids) ||
                city_Ids.length === 0
            ) {
                return res.status(400).json({error: 'No IDs provided'})
            }

            // delete
            const result = await City.deleteMany({_id: {$in: city_Ids}})

            return res.status(200).json({
                message: 'City deleted',
                deletedCount: result.deletedCount,
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }

    get_City = async (req, res) => {
        try {
            const {city_Id} = req.body

            //   console.log("Received city_Id:", city_Id)

            if (!mongoose.Types.ObjectId.isValid(city_Id)) {
            return res
                .status(400)
                .json({success: false, message: 'Invalid city ID format'})
            }

            const city = await City.findById(city_Id)

            if (!city) {
            return res
                .status(404)
                .json({success: false, message: 'City not found'})
            }

            return res.status(200).json({success: true, data: city })
        } catch (error) {
            console.log('Error:', error.message)
            return res.status(500).json({success: false, error: error.message})
        }
    }
      
}

module.exports = new city_Controller()
