const mongoose = require('mongoose')
require('dotenv/config')

const ADMIN = process.env.MONGOOSE_ADMIN
const CLUSTER = process.env.MONGOOSE_CLUSTER

export const connect = async () => {
  await mongoose.connect(`mongodb+srv://admin:${ADMIN}@${CLUSTER}.mongodb.net/libsDB?retryWrites=true&w=majority`)
}
