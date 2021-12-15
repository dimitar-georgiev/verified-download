import https from 'https';
import fs from 'fs';
import path from 'path';

const downloadFile = (url) => {
    const fileName = path.basename(url);
    
    return new Promise ((resolve, reject) => {
        const request = https.get(url, (res) => {
        
            const downloadStream = fs.createWriteStream(path.resolve('downloads', fileName));
            res.pipe(downloadStream);
    
            downloadStream.on('finish', () => {
                resolve({fileName});
            });
    
            downloadStream.on('error', err => {
                reject(err);
            });
        });

        request.on('error', err => {
            reject(err);
        });
    });
}

export {downloadFile};