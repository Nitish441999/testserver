const mongoose = require('mongoose')
const DepartmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: [true, "Department Name is Required"]
    }
})
module.exports = mongoose.model("Department", DepartmentSchema);