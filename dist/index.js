import express from 'express';
import entryRoutes from './routes/index.js';
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
// Middleware to parse JSON
app.use(express.json());
app.use(cors());
// Base route for API version 1
app.use('/api/v1', entryRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map