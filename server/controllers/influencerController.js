const expressAsyncHandler = require("express-async-handler")
const Influencer = require('../models/influencerModel')


const getInfluencers = expressAsyncHandler(async(req,res) =>{
    // res.send("All Influencer")

    const influencers = await Influencer.find()

    if(!influencers){
        res.status(404)
        throw new Error("Influencers Not Found")
    }
    res.status(200).json(influencers)

})

const getInfluencer =async(req,res) =>{
    // res.send("Single Influencer")
    const influencer = await Influencer.findById(req.params.id)

    if(!influencer){
        res.status(404)
        throw new Error("Influencer Not Found")
    }
    res.status(200).json(influencer)
}


// const searchInfluencer = expressAsyncHandler(async (req, res) => {
//   const { query } = req.query;

//   const results = await Influencer.find({
//     $or: [
//       { name: { $regex: query, $options: "i" } },
//       { company: { $regex: query, $options: "i" } },
//     ],
//   });

//   if (!results) {
//     res.status(400);
//     throw new Error("No Influencer Here");
//   }
//   res.status(200);
//   res.json(results);
// });


// Search Influencer by name only

// Search Influencer by name only (with partial matching)
const searchInfluencer = expressAsyncHandler(async (req, res) => {
  const { query } = req.query;  // Getting the query parameter from the URL

  // If no query is provided, return an error
  if (!query) {
    res.status(400);
    throw new Error("Please provide a search query.");
  }

    // Check the query being passed
//   console.log("Search Query:", query); // Debugging log

  // Use regex to search influencers by name (case-insensitive and partial matching)
  const results = await Influencer.find({
    name: { $regex: query, $options: "i" },  // Case-insensitive partial match
  }).limit(10);  // Limit the number of results (optional)

  if (results.length === 0) {
    res.status(404);
    throw new Error("No influencers found.");
  }

  res.status(200).json(results);  // Return the found influencers
});

module.exports = {getInfluencers,getInfluencer,searchInfluencer}