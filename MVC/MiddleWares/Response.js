export function sendResponse(res, status, message, data = {}) {
    res.status(200).json({
        status,
        message,
        data
    });
}

export function sendLoginResponse(res, status, message, data = {},token) {
    res.status(200).json({
        status,
        message,
        data,
        token
    });
}



export function sendErrorResponse(res, status, message, data = {}) {
    res.status(500).json({
        status,
        message,
        data
    });
}


