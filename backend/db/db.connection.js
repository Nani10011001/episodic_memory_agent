import mongoose from "mongoose"
const Dbconnection= async()=>{
try {
    await mongoose.connect(process.env.MONG_URL)
    console.log("dbconnection sucessfullly ")
} catch (error) {
    console.log(error)
}
}
export default Dbconnection