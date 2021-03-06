import { MongoClient } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ message: 'Invalid email!' });
    }

    const client = await MongoClient.connect(
      `mongodb+srv://test1234:test1234@cluster0.gvoli.mongodb.net/events?retryWrites=true&w=majority`
    );
    const db = client.db();
    await db.collection('newsletter').insertOne({ email });
    client.close();

    res
      .status(201)
      .json({ message: 'Thanks for signing up to the newsletter!' });
  }
};
