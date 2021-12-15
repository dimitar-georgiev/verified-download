import {downloadFile} from './downloadFile.js';
import {verifyFile} from './verifyFile.js';

const verifiedDownload = async (fileUrl, sha512Url) => {
    
    try {
        const pckg = await downloadFile(fileUrl);

        const sha = await downloadFile(sha512Url);

        const verified = await verifyFile(pckg.fileName, sha.fileName);

        console.log('Verified: ', verified);
    }
    catch (err) {
        console.log(err);
    }
}

verifiedDownload(
    'https://downloads.apache.org/accumulo/accumulo2-maven-plugin/1.0.0/accumulo2-maven-plugin-1.0.0-source-release.tar.gz',
    'https://downloads.apache.org/accumulo/accumulo2-maven-plugin/1.0.0/accumulo2-maven-plugin-1.0.0-source-release.tar.gz.sha512'
    );