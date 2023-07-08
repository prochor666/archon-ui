import { load } from './useConfig';
import ASCIIFolder from 'fold-to-ascii';
import { Buffer } from 'buffer';

const prefix = 'archonui';

export const asleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cloneData = (data) => {
    return JSON.parse(JSON.stringify(data));
};

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) {
        return '0 B';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const decodePath = (path) => {
    return path.split('|').join('/');
};

export const encodePath = (path) => {
    return path.split('/').join('|');
};

export const getRndKey = (length = 7) => {
    let result = '',
        counter = 0;
    const characterBank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    while (counter < length) {
        result += characterBank.charAt(Math.floor(Math.random() * characterBank.length));
        counter += 1;
    }
    return result;
};

export const fileExtension = (filename) => {
    if (filename.startsWith('.')) {
        filename = filename.substring(1);
    }

    const ext = /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : [''];
    return ext[0];
};

export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const mergeObject = (origin, updater) => {
    return { ...origin, ...updater };
};

export const sortArrayOfObjectsBy = (data, byKey) => {
    let sortedData;
    if (typeof byKey === 'string') {
        sortedData = data.sort(function (a, b) {
            let x = a[byKey].toLowerCase();
            let y = b[byKey].toLowerCase();
            if (x > y) {
                return 1;
            }
            if (x < y) {
                return -1;
            }
            return 0;
        });
    }

    if (typeof byKey === 'number') {
        sortedData = data.sort(function (a, b) {
            return a[byKey] - b[byKey];
        });
    }
    return sortedData;
};

export const sortObjectByKey = (origin) => {
    return Object.keys(origin)
        .sort()
        .reduce((obj, key) => {
            obj[key] = origin[key];
            return obj;
        }, {});
};

export const validateEmail = (email) => {
    const res = String(email).match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/);
    return !res ? false : true;
};

export const keeper = (key, value = null) => {
    const config = load();
    const safeKey = `${prefix}_${key}`;
    const storageEngine = config.keeper.safe ? sessionStorage : localStorage;
    if (value === null) {
        return JSON.parse(storageEngine.getItem(safeKey));
    }
    return storageEngine.setItem(safeKey, JSON.stringify(value));
};

export const keeperRemove = (key, valueIf = '') => {
    const config = load();
    const safeKey = `${prefix}_${key}`;
    const storageEngine = config.keeper.safe ? sessionStorage : localStorage;
    if ((typeof valueIf === 'string' && valueIf.length === 0) || valueIf === storageEngine.getItem(safeKey)) {
        return storageEngine.removeItem(safeKey);
    }
};

export const objectToQueryString = (obj) => {
    let str = [];
    for (let p in obj) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
    return str.join('&');
};

export const toLatin128 = (str) => {
    return ASCIIFolder.foldReplacing(str);
};

export const kebabToCamelCase = (str) => {
    str = str.replace(/-./g, (match) => match[1].toUpperCase());
    if (str.startsWith('-')) {
        return str.substring(1);
    }
    return str;
};

export const camelToKebabCase = (str) => {
    str = str.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
    if (str.startsWith('-')) {
        return str.substring(1);
    }
    return str;
};

export const objectToBase64 = (obj) => {
    const objJsonStr = JSON.stringify(obj);
    return Buffer.from(objJsonStr).toString('base64');
};

export const base64ToObject = (base64Str) => {
    const json = Buffer.from(base64Str, 'base64').toString();
    return JSON.parse(json);
};

export const replaceStringSpaces = (str, delimiter = '_') => {
    return str.replace(/\s/g, delimiter);
};

export const uuidCreate = (version = '4') => {
    let chars = '0123456789abcdef'.split('');
    let uuid = [],
        rnd = Math.random,
        r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = version.toString(); // version 4 ...

    for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | (rnd() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r & 0xf];
        }
    }
    return uuid.join('');
};

export const ark = (o, k, d = false) => {
    return (typeof o === 'object' && o[k]) || d;
};

export const isMACAddress = (str) => {
    const regex = new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}.[0-9a-fA-F]{4}.[0-9a-fA-F]{4})$/);
    if (str === null) {
        return false;
    }
    return regex.test(str) == true;
};

export const utils = () => {
    return {
        sleep: sleep,
        asleep: asleep,
        cloneData: cloneData,
        formatBytes: formatBytes,
        decodePath: decodePath,
        encodePath: encodePath,
        getRndKey: getRndKey,
        fileExtension: fileExtension,
        getRandomColor: getRandomColor,
        mergeObject: mergeObject,
        sortArrayOfObjectsBy: sortArrayOfObjectsBy,
        sortObjectByKey: sortObjectByKey,
        keeper: keeper,
        objectToQueryString: objectToQueryString,
        validateEmail: validateEmail,
        toLatin128: toLatin128,
        objectToBase64: objectToBase64,
        base64ToObject: base64ToObject,
        camelToKebabCase: camelToKebabCase,
        kebabToCamelCase: kebabToCamelCase,
        replaceStringSpaces: replaceStringSpaces,
        uuidCreate: uuidCreate,
        ark: ark,
        isMACAddress: isMACAddress,
    };
};

export default utils;
