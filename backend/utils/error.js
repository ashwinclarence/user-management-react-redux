

export const errorHandle = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    error.status = false;
    return error
}