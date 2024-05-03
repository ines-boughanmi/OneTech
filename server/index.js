const express = require("express")
const app = express()
const PORT = 3001
const multer  = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

const cors = require("cors")
const userRoute = require("./router/user.router")
const carRoute = require("./router/car.router")
const projectRoute = require("./router/project.router")
const missionRoute = require("./router/mission.router")
const partitionRoute = require("./router/partition.router")

require("./database")


app.use(express.static(__dirname+'/..client/dist'))
app.use(cors())
app.use(express.json())


app.use("/api/user", userRoute)
app.use("/api/car", carRoute)
app.use("/api/project", projectRoute)
app.use("/api/mission", missionRoute)
app.use("/api/partition", partitionRoute)

app.post('/upload', upload.single('file'), (req, res) => {
    // Access the uploaded file via req.file
    console.log('Uploaded file:', req.file);
    // Construct the URL to the uploaded file
    const uploadedFilePath = `/uploads/${encodeURIComponent(req.file.filename)}`;
    res.status(200).json({ message: 'File uploaded successfully', fileUrl: uploadedFilePath });
  });
  
  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));







app.listen(PORT,()=>{
    console.log("listening on PORT :",PORT);
})