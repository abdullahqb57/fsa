import Review from "../models/reviewModel.js";

const createReview = (data) => {
    const review = new Review(data)
    return review.save()
}

const getReviewById = (productId) => {
    return Review.find({productId}, {__v:0, _id:0})
}

const getAvgRating = (productId) => {
    return Review.aggregate([
        { $match: {productId}},
        {$group: {_id: '$productId', avgRating: { $avg: '$rating'}}},
        { $project: {_id: 0} }
    ])
}

export default {createReview, getReviewById, getAvgRating}