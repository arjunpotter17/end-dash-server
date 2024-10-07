import { Router } from 'express';
import { getAllEntries, createEntry, registerDevice, getRecentData } from '../controllers/entryController.js';

const router = Router();

// Define the routes
router.get('/entries', getAllEntries);    // GET /api/v1/entries
router.post('/entries', createEntry);     // POST /api/v1/entries
router.post('/register', registerDevice);     // POST /api/v1/register
router.get('/recent-data', getRecentData);     // GET /api/v1/recent-data?field=sst or ?field=pubkey

export default router;
