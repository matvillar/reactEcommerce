import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });

  // set jwt token in cookie (HTTP-only cookie)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development' ? true : false,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days
  });
};

export default generateToken;
