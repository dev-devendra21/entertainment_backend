class ApiError extends Error {
    constructor(status, message, details = null) {
        super();
        this.status = status;
        this.message = message;
        this.details = details;

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}


export default ApiError