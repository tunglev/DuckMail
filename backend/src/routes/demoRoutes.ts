import { Router } from 'express';
import admin from 'firebase-admin';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

admin.initializeApp({
  credential: admin.credential.cert('./firebase-adminsdk.json'),
  storageBucket: 'gs://tatack-e1ab7.firebasestorage.app'
});

const bucket = admin.storage().bucket();

router.post('/upload', upload.single('photo'), async (req, res): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }

    const blob = bucket.file(`photos/${Date.now()}_${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: file.mimetype }
    });

    blobStream.on('error', (err) => res.status(500).send(err.message));
    blobStream.on('finish', async () => {
      try {
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).send({ url: publicUrl });
      } catch (error: any) {
        res.status(500).send('Error making file public: ' + error.message);
      }
    });

    blobStream.end(file.buffer);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
