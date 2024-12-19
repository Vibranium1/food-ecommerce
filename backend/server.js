const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/authAdmin");
const userRoutes = require("./routes/authUser");
const { setupIndex } = require("../backend/sync/setupelastic");
const { pollChanges } = require("../backend/sync/streamsync");
const { deleteAllDocuments } = require("../backend/sync/streamsync");
const { syncData } = require("../backend/sync/synctoelastic");
const { Client } = require("@elastic/elasticsearch");

const searchRoute = require('../backend/sync/search');


dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/food", productRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.use('/api', searchRoute);



setupIndex();
syncData();

pollChanges();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
