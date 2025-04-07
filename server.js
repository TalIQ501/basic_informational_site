import http from 'http';
import fs from 'fs/promises'
import url from 'url';
import path from 'path';

const PORT = 8000;

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const server = http.createServer( async (req, res) => {
    try {
        if (req.method === 'GET') {
            let filePath;

            if (req.url === '/') {
                filePath = path.join(__dirname, 'index.html')
            } else if (req.url === '/about') {
                filePath = path.join(__dirname, 'about.html')
            } else if (req.url === '/contact-me' || req.url === 'contact') {
                filePath = path.join(__dirname, 'contact-me.html');
            } else {
                filePath = path.join(__dirname, '404.html');
            }

        const pageFile = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'text/html');
        res.write(pageFile);
        res.end();

        } else {
            throw new Error('Incorrect Method');
        }
    } catch (err) {
        res.writeHead(500, { 'Content-Type' : 'text/plain' });
        res.end('Server Error: ' + err);
    }
})

server.listen(8000, err => {
    console.log(`Server running on PORT ${PORT}`)
})