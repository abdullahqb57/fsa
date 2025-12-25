import reviews from "../repositories/reviewRepo.js"


const createReviewCtrl = async(req, res) => {
    try{
        const data = req.body
        data.createdAt = new Date()
        await reviews.createReview(data)
        res.status(201)
        res.send("Success")
    } catch(err) {
        res.status(500)
        res.send(err)
    }
}

export default { createReviewCtrl }