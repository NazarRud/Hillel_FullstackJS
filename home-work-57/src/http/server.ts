import http from "node:http";
import querystring from "node:querystring";

import { env } from "../config/env.js";

function escapeHtml(value: string = ""): string {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function htmlPage(title: string, body: string): string {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>
            ${body}
        </body>
        </html>`;
}

function sendHtml(
    res: http.ServerResponse,
    statusCode: number,
    html: string,
): void {
    const body = Buffer.from(html, "utf8");

    res.writeHead(statusCode, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Length": body.length,
        "X-Content-Type-Options": "nosniff",
    });

    res.end(body);
}

const server = http.createServer((req, res) => {
    try {
        const method = req.method;
        const url = req.url;
        const contentType = req.headers["content-type"] || "";

        if (method === "GET" && url === "/") {
            return sendHtml(res, 200,
                htmlPage("Home", `
                        <h1>Home</h1>
                        <p>Welcome to the Home Page</p>`)
            );
        }

        if (method === "GET" && url === "/about") {
            return sendHtml(res, 200,
                htmlPage("About", `
                        <h1>About</h1>
                        <p>Learn more about us</p>`)
            );
        }

        if (method === "GET" && url === "/contact") {
            return sendHtml(res, 200,
                htmlPage("Contact", `
                        <h1>Contact</h1>
                        <p>Get in touch</p>`)
            );
        }

        if (method === "POST" && url === "/submit" && contentType.startsWith("application/x-www-form-urlencoded") ) {
            let body = "";
            let receivedBytes = 0;
            let tooLarge = false;

            req.on("data", (chunk: Buffer) => {
                receivedBytes += chunk.length;

                if (receivedBytes > env.maxBodySize) {
                    tooLarge = true;
                    sendHtml(res, 413, htmlPage("Payload Too Large", "<h1>Payload Too Large</h1>"))
                    req.destroy();

                    return;
                }

                body += chunk.toString("utf8");
            });

            req.on("end", () => {
                if (tooLarge) {
                    return;
                }

                const parsedBody = querystring.parse(body);
                const name = typeof parsedBody.name === "string" ? parsedBody.name.trim() : "";
                const email = typeof parsedBody.email === "string" ? parsedBody.email.trim() : "";

                if (!name || !email) {
                    return sendHtml(res, 400, htmlPage("Bad Request", "<h1>Invalid form data</h1>"));
                }

                const safeName = escapeHtml(name);
                const safeEmail = escapeHtml(email);

                return sendHtml(res, 200, htmlPage("Form Submitted", ` 
                    <h1>Form Submitted</h1>
                    <p>Name: ${safeName}</p>
                    <p>Email: ${safeEmail}</p>`));
            });

            req.on("error", () => {
                sendHtml(res, 500, htmlPage("Server Error", "<h1>Server Error</h1>"));
            });

            return;
        }

        if (method === "POST" && url === "/submit") {
            return sendHtml(res, 400, htmlPage("Bad Request", "<h1>Invalid Content-Type</h1>"));
        }

        return sendHtml(res, 404, htmlPage("Not Found", "<h1>Page Not Found</h1>"));
    } catch {
        return sendHtml(res, 500, htmlPage("Server Error", "<h1>Server Error</h1>"));
    }
});

server.listen(env.port, () => {
    console.log(`Server started at http://localhost:${env.port}`);
});
