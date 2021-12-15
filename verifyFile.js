import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import util from 'util';

const verifyFile = async (fileName, sha512) => {
    if (fileName && sha512) {
        const readFile = util.promisify(fs.readFile);
        try {
            const fileData = await readFile(path.resolve('downloads', sha512));
            const values = fileData.toString().split('=');
            const providedShaValue = values[1].trim();

            const pckgBuffer = await readFile(path.resolve('downloads', fileName));
            const hash = crypto.createHash('sha512');
            const hashHex = hash.update(pckgBuffer).digest('hex');

            if (providedShaValue === hashHex) {
                return true;
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return false;
}

export {verifyFile};