import { Router } from 'express';

const router = Router();

router.post('/webhooks/bindplane', (req, res) => {
  const payload = req.body;
  console.log('Received Bindplane webhook payload:', payload);
  // TODO: Trigger Playbook generation via Gemini if anomaly detected
  res.status(202).send('Accepted');
});

router.get('/playbooks', (req, res) => {
  // TODO: Fetch generated playbooks from Firestore
  res.json({ playbooks: [] });
});

export default router;
