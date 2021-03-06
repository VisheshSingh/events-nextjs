import { MongoClient } from 'mongodb';

export default async (req, res) => {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    `mongodb+srv://test1234:test1234@cluster0.gvoli.mongodb.net/events?retryWrites=true&w=majority`
  );

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid data provided!' });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection('comments').insertOne(newComment);
    // console.log(result);
    newComment.id = result.insertedId;
    res.status(201).json({ message: 'Comment added', comment: newComment });
  }

  if (req.method === 'GET') {
    const db = client.db();

    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();
    return res.status(200).json({ comments: documents });
  }
  client.close();
};
