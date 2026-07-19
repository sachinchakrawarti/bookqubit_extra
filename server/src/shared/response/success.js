import HTTP_STATUS from "./http-status.js";
import MESSAGES from "./messages.js";

export default function success(
    res,
    {
        status = HTTP_STATUS.OK,
        message = MESSAGES.SUCCESS,
        data = null,
        meta = null,
    } = {}
) {
    return res.status(status).json({
        success: true,
        message,
        data,
        meta,
    });
}