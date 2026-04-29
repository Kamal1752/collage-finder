import { Router, Response } from 'express';
import { query } from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await query(
      `SELECT c.* FROM colleges c JOIN saved_colleges s ON c.id = s.college_id WHERE s.user_id=$1`,
      [req.userId]
    );
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch saved colleges' });
  }
});

router.post('/:collegeId', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await query(
      'INSERT INTO saved_colleges (user_id, college_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',
      [req.userId, req.params.collegeId]
    );
    res.json({ message: 'Saved!' });
  } catch {
    res.status(500).json({ error: 'Failed to save' });
  }
});

router.delete('/:collegeId', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await query('DELETE FROM saved_colleges WHERE user_id=$1 AND college_id=$2', [req.userId, req.params.collegeId]);
    res.json({ message: 'Removed!' });
  } catch {
    res.status(500).json({ error: 'Failed to remove' });
  }
});

export default router;
