import { keeper } from './utils.js';
import cs from '../i18n/cs.js';
import en from '../i18n/en.js';

export const lang = keeper('language') || 'cs';

export const langRepository = {
    cs: cs,
    en: en,
};

export const langConfig = {
    leftBracket: '[',
    rightBracket: ']',
    undefinedToken: '🚩',
    splitter: '|',
    defaultLang: 'en',
};

export const getLang = () => {
    return lang in langRepository
        ? langRepository[lang]().all
        : langRepository[langConfig.defaultLang]().all;
};

export const t = (token, options = {}) => {
    const activeLang = getLang(lang);
    const i18nNotSet = 'i18nNotSet' in options ? options.i18nNotSet : langConfig.undefinedToken;

    if (!Object.keys(activeLang).includes(token)) {
        return `${token} ${i18nNotSet}`;
    }

    return pluralize(activeLang[token], options);
};

export const undefinedToken = () => {
    return langConfig.undefinedToken;
};

export const pluralize = (data, options) => {
    const parsed = data.split(langConfig.splitter);
    options.count = 'count' in options ? parseInt(options.count) : 0;

    //console.log('++++++++ pluralize ORIGINAL ++++++++', parsed);
    const selectedWordShape = expandStackedItem(parsed, options);

    //console.log('++++++++ pluralize PARSED selectedWordShape ++++++++', selectedWordShape);
    return replaceVaribles(selectedWordShape, options);
};

export const replaceVaribles = (str, options) => {
    for (let key in options) {
        str = str.replaceAll(`{${key}}`, options[key]);
    }
    return str.trim();
};

export const expandStackedItem = (parsed, options) => {
    let selectedShape = 'ERROR #9999';

    parsed.forEach((x) => {
        let result = conditionDetector(x);

        //console.log('Result mapper expandStackedItem result', x, result, options.count, typeof options.count);

        if (result.variant === 'exact' && result.evalStart === options.count) {
            selectedShape = result.shape;
        }

        if (
            result.variant === 'range' &&
            ((options.count >= result.evalStart && options.count <= result.evalEnd) ||
                (options.count >= result.evalStart && -1 <= result.evalEnd))
        ) {
            selectedShape = result.shape;
        }
    });
    /* console.log(
        'Result mapper expandStackedItem',
        selectedShape,
        options.count,
    ); */
    return selectedShape;
};

export const conditionDetector = (str) => {
    const conditionStart = str.indexOf(langConfig.leftBracket),
        conditionEnd =
            str.indexOf(langConfig.rightBracket) > -1
                ? str.indexOf(langConfig.rightBracket) + 1
                : str.indexOf(langConfig.rightBracket),
        result = {
            evalStart: 0,
            evalEnd: -1,
            variant: 'exact', // exact OR range
            shape: str,
        };

    // condition detected
    if (conditionStart > -1 && conditionEnd > conditionStart) {
        //const _eval = eval(str.substring(conditionStart, conditionEnd));

        const _eval = str.substring(conditionStart, conditionEnd).slice(1, -1).split(',');

        //console.log('For count value(s): ', _eval);
        // Supported count for condition is 1 or 2
        // 1 = exact count value
        // 2 = minimum/maximum count value
        if (typeof _eval === 'object' && _eval.length > 0 && _eval.length < 3) {
            result.shape = str.substring(conditionEnd + 1);
            result.evalStart = parseInt(_eval[0]);
            result.evalEnd = parseInt(_eval[1]) || result.evalEnd;
            result.variant = _eval.length === 1 ? result.variant : 'range';
        }
    }

    return result;
};

const i18n = () => {
    return {
        lang: lang,
        langRepository: langRepository,
        getLang: getLang,
        undefinedToken: undefinedToken,
        pluralize: pluralize,
        replaceVaribles: replaceVaribles,
        expandStackedItem: expandStackedItem,
        conditionDetector: conditionDetector,
        t: t,
    };
};

export default i18n;
