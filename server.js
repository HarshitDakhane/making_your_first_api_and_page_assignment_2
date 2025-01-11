const express = require('express');
const app = express();

// Status code descriptions
const statusDescriptions = {
    200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
    201: "Created: The request has been fulfilled and resulted in a new resource being created.",
    204: "No Content: The server has successfully processed the request, but there is no content to return.",
    400: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
    401: "Unauthorized: The client must authenticate itself to get the requested response.",
    403: "Forbidden: The client does not have access rights to the content.",
    404: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
    405: "Method Not Allowed: The request method is known by the server but is not supported by the target resource.",
    429: "Too Many Requests: The user has sent too many requests in a given amount of time.",
    500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
    502: "Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
    503: "Service Unavailable: The server is not ready to handle the request, often due to maintenance or overload.",
    504: "Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server."
};

// GET endpoint for /status-info
app.get('/status-info', (req, res) => {
    const { code } = req.query;

    // Check if "code" parameter is provided
    if (!code) {
        return res.status(400).json({
            error: "Missing query parameter: 'code'. Please provide an HTTP status code."
        });
    }

    // Convert the code to a number and look up the description
    const statusCode = parseInt(code, 10);
    const message = statusDescriptions[statusCode];

    // Check if the status code is supported
    if (!message) {
        return res.status(404).json({
            error: `Status code ${statusCode} is not supported or invalid.`
        });
    }

    // Return the status code and its description
    res.json({
        status: statusCode,
        message: message
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Status Code API is running on http://localhost:${PORT}`);
});
