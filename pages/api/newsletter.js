import { connectDB, insertDocument } from '../../utils/db-utils';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ message: 'Invalid email!' });
    }

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: 'Connection to DB failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting a document failed!' });
      return;
    }

    res
      .status(201)
      .json({ message: 'Thanks for signing up to the newsletter!' });
  }
};
