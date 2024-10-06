import { Router } from 'express';
import { getAllEntries, createEntry } from '../controllers/entryController.js';
const router = Router();
// Define the routes
router.get('/entries', getAllEntries); // GET /api/v1/entries
router.post('/entries', createEntry); // POST /api/v1/entries
export default router;
//# sourceMappingURL=index.js.map