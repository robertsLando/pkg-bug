const express = require('express');
const sharp = require('sharp');
const getPort = require('get-port');

const app = express();


app.get('/image', async (req, res) => {
    const { size } = req.query;
    const [width, height] = size.split('x');
    
    const image = await sharp('public/image.jpg')
        .resize(Number(width), Number(height))
        .toBuffer();
    
    res.set('Content-Type', 'image/jpeg');
    res.send(image);
    }
);

// find first available port then listen
getPort().then(port =>
    {
        app.listen(port, () => {
            console.log('Server listening on port', port);
        });
    })


function humanSize(s) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let e = Math.floor(Math.log(s) / Math.log(1024));
    return (s / Math.pow(1024, e)).toFixed(2) + ' ' + units[e];
}

function getMemoryUsage() {
    const { rss, heapTotal, heapUsed } = process.memoryUsage();

    console.table([
        {
            rss: humanSize(rss),
            heapTotal: humanSize(heapTotal),
            heapUsed: humanSize(heapUsed),
        }
    ], ['rss', 'heapTotal', 'heapUsed']);
}


setInterval(() => getMemoryUsage(), 5000)
