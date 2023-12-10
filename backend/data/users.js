import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin1@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Matias Villar',
    email: 'mv@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Nathan Birch',
    email: 'birch@mail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;
