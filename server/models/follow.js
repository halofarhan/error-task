const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnect")



const tableFollow = () => {
    return getDatabase().collection("Follow")

}

const followUser = async (data) => {
    const newFollowing = await tableFollow().insertOne(data)
    const dataFollowing = await tableFollow().findOne({
        _id: new ObjectId(newFollowing.insertedId)
    })

    return dataFollowing
}

module.exports = { followUser }