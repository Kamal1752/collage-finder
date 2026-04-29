import { Router, Request, Response } from 'express';
import { query } from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// GET all colleges with search & filters
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, state, type, fees_min, fees_max, page = '1', limit = '9' } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let conditions: string[] = [];
    let params: any[] = [];
    let idx = 1;

    if (search) {
      conditions.push(`(c.name ILIKE $${idx} OR c.location ILIKE $${idx})`);
      params.push(`%${search}%`);
      idx++;
    }
    if (state) {
      conditions.push(`c.state = $${idx}`);
      params.push(state);
      idx++;
    }
    if (type) {
      conditions.push(`c.type = $${idx}`);
      params.push(type);
      idx++;
    }
    if (fees_min) {
      conditions.push(`c.fees_min >= $${idx}`);
      params.push(parseInt(fees_min as string));
      idx++;
    }
    if (fees_max) {
      conditions.push(`c.fees_max <= $${idx}`);
      params.push(parseInt(fees_max as string));
      idx++;
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await query(`SELECT COUNT(*) FROM colleges c ${where}`, params);
    const total = parseInt(countResult.rows[0].count);

    const result = await query(
      `SELECT c.* FROM colleges c ${where} ORDER BY c.rating DESC LIMIT $${idx} OFFSET $${idx + 1}`,
      [...params, parseInt(limit as string), offset]
    );

    res.json({
      colleges: result.rows,
      total,
      page: parseInt(page as string),
      totalPages: Math.ceil(total / parseInt(limit as string))
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// GET single college with courses
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const collegeResult = await query('SELECT * FROM colleges WHERE id=$1', [id]);
    if (collegeResult.rows.length === 0) {
      res.status(404).json({ error: 'College not found' });
      return;
    }
    const coursesResult = await query('SELECT * FROM courses WHERE college_id=$1', [id]);
    const reviewsResult = await query(
      `SELECT r.*, u.name as user_name FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.college_id=$1 ORDER BY r.created_at DESC LIMIT 10`,
      [id]
    );
    res.json({
      ...collegeResult.rows[0],
      courses: coursesResult.rows,
      reviews: reviewsResult.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

// POST add review
router.post('/:id/reviews', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    await query(
      'INSERT INTO reviews (college_id, user_id, rating, comment) VALUES ($1,$2,$3,$4)',
      [id, req.userId, rating, comment]
    );
    res.json({ message: 'Review added!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// GET compare colleges
router.post('/compare', async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    if (!ids || ids.length < 2) {
      res.status(400).json({ error: 'Select at least 2 colleges' });
      return;
    }
    const placeholders = ids.map((_: any, i: number) => `$${i + 1}`).join(',');
    const result = await query(`SELECT * FROM colleges WHERE id IN (${placeholders})`, ids);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Comparison failed' });
  }
});

// GET states list
router.get('/meta/states', async (_req: Request, res: Response): Promise<void> => {
  const result = await query('SELECT DISTINCT state FROM colleges ORDER BY state');
  res.json(result.rows.map((r: any) => r.state));
});

export default router;
