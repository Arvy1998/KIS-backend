import uploadFile from 'controllers/file/upload';

import verifyToken from 'validations/verifyToken';

import UserNotAuthorized from 'errors/UserNotAuthorized';

import multer from 'multer';

/**
 * @function uploadFileOperation
 * Gathers data from request and passes it to
 * the function executing actual operation.
 * @param {Object} request The request message.
 * @param {Object} response The response message.
 * @returns {Object} Returns a new task entry.
 */
const uploadFileOperation = async (request, response) => {
  const studentCode = request.headers['student-code'];

  const loggedInStudent = await verifyToken(request);

  if (!loggedInStudent || loggedInStudent.studentCode !== studentCode) {
    throw new UserNotAuthorized();
  }

  const upload = multer({ storage: multer.memoryStorage() });
  const uploadFiles = upload.fields([{ name: 'files', maxCount: 5 }]);

  uploadFiles(request, response, async (error) => {
    if (!error) {
      const files = JSON.parse(JSON.stringify(request.files));
      const data = JSON.parse(JSON.stringify(request.body));
      data.studentCode = studentCode;

      const uploadedFiles = await uploadFile(files, data);

      if (uploadedFiles) {
        return response.status(200).send(uploadedFiles);
      } return response.sendStatus(400);
    } return response.sendStatus(400);
  });
};

export default uploadFileOperation;
