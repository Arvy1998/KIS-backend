import loginStudent from 'controllers/student/login';

import signToken from 'utils/signToken';

const loginStudentOperation = async (request, response) => {
  const student = request.body;

  const signedInStudent = await loginStudent(student);

  if (signedInStudent) {
    const token = await signToken(signedInStudent);

    response.setHeader('Authorization', `Bearer ${token}`);
    return response.status(200).send(signedInStudent);
  } return response.sendStatus(400);
};

export default loginStudentOperation;
