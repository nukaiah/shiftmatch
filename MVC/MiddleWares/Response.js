function sendResponse(res, status, message, data = {}) {
    res.status(200).json({
        status,
        message,
        data
    });
}

function sendLoginResponse(res, status, message, data = {},token) {
    res.status(200).json({
        status,
        message,
        data,
        token
    });
}



function sendErrorResponse(res, status, message, data = {}) {
    res.status(500).json({
        status,
        message,
        data
    });
}


module.exports = {sendResponse,sendLoginResponse,sendErrorResponse};
