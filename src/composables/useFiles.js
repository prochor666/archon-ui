import { keeper } from './utils';
import { r } from './useApi';
import { objectToBase64 } from '../composables/utils';

export const upload = async (directory, file) => {
    const result = await r({
        endpoint: `${keeper('fileStorageApiUrl')}/v1/file/${directory}`,
        method: 'post',
        authToken: keeper('sessionFsToken'),
        data: {
            file: file,
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (result !== false) {
        console.log('useFile.js: file uploaded', `${directory}/${file.name}`);
    } else {
        console.log('useFile.js: file upload failed', `${directory}/${file.name}`);
    }
    return result;
};

export const updateFile = async (directory, file) => {
    const result = await r({
        endpoint: `${keeper('fileStorageApiUrl')}/v1/file/${directory}`,
        method: 'put',
        authToken: keeper('sessionFsToken'),
        data: {
            file: file,
        },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    if (result !== false) {
        console.log('useFile.js: file uploaded', `${directory}/${file.name}`);
    } else {
        console.log('useFile.js: file upload failed', `${directory}/${file.name}`);
    }
    return result;
};

export const loadDirectory = async (directory) => {
    const result = await r({
        endpoint: `${keeper('fileStorageApiUrl')}/v1/file/${directory}`,
        method: 'get',
        authToken: keeper('sessionFsToken'),
    });
    //console.log('useFile.js: loadDirectory', result);
    return result;
};

export const createNewDir = async (directory) => {
    const envObj = {
        name: directory,
        creator: keeper('username'),
        created_at: new Date(Date.UTC()).toString(),
    };
    const fileRaw = `data:application/json;base4,${objectToBase64(JSON.stringify(envObj))}`;
    const file = await dataUrlToBinaryFile(fileRaw, '.templating.json', 'application/json');
    return {
        raw: fileRaw,
        encoded: file,
    };
    //return await upload(templateDirectoryName(templateId), file);
};

export const templateDirectoryName = (templateId) => {
    return `template-${templateId}`;
};

export const dataUrlToBinaryFile = async (url, filename, mimeType) => {
    if (url.startsWith('data:')) {
        let arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        // Compose binary object
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], filename, {
            type: mime || mimeType,
        });
        return Promise.resolve(file);
    }
    return fetch(url)
        .then((res) => res.arrayBuffer())
        .then((buf) => new File([buf], filename, { type: mimeType }));
};

export const extractFilename = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
};

export const useFile = () => {
    return {
        upload: upload,
        loadDirectory: loadDirectory,
        templateDirectoryName: templateDirectoryName,
        createNewDir: createNewDir,
        dataUrlToBinaryFile: dataUrlToBinaryFile,
        extractFilename: extractFilename,
    };
};

export default useFile;
