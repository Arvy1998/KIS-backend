import jwt from 'jsonwebtoken';
import fs from 'fs';

const signToken = async (user) => {
  const privatekey = fs.readFileSync(`${__dirname}/../ssl/service.key`);

  const payload = {
    email: user.email,
    password: user.password,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, privatekey, { expiresIn: '1h' }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    });
  });
};

export default signToken;
