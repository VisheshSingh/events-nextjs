import { MongoClient } from 'mongodb';
import { getAllDocuments } from '../../../utils/db-utils';
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
    const documents = await getAllDocuments(
      client,
      'comments',
      { _id: -1 },
      { eventId: eventId }
    );
    return res.status(200).json({ comments: documents });
  }
  client.close();
};
