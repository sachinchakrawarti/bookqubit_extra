import HTTP_STATUS from "./http-status.js";
import MESSAGES from "./messages.js";

export default function error(
    res,
    {
        status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message = MESSAGES.INTERNAL_SERVER_ERROR,
        errors = null,
    } = {}
) {
    return res.status(status).json({
        success: false,
        message,
        errors,
    });
}