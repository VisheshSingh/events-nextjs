import {
  getAllDocuments,
  connectDB,
  insertDocument,
} from '../../../utils/db-utils';

export default async (req, res) => {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to DB failed!' });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting a doc failed!' });
    }

    // console.log(result);
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching the comments!' });
    }
  }

  client.close();
};
