// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ message: 'Invalid email!' });
    }
    res
      .status(201)
      .json({ message: 'Thanks for signing up to the newsletter!' });
  }
};
