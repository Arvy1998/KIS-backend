/**
 * @function isOpenApiError
 * Identifying if the passed error object is an OpenAPI error object.
 * @param {Object} error An error object.
 * @returns {boolean} Boolean state to indicate if the error belongs to OpenAPI or not.
 */
const isOpenApiError = (error) => error.errors && !!error.errors.find(
  /* error mostly includes something like `required.openapi.requestValidation` */
  (err) => err.errorCode && err.errorCode.includes('openapi'),
);

export default isOpenApiError;
