export default (req, res) => {
  const eventId = req.query.eventId;

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
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    res.status(201).json({ message: 'Comment added', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyComments = [
      { id: 'c1', text: 'first comment', name: 'Max', email: 'max@gmail.com' },
      {
        id: 'c2',
        text: 'second comment',
        name: 'Manu',
        email: 'manu@gmail.com',
      },
    ];
    return res.status(200).json({ comments: dummyComments });
  }
};
