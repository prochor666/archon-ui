import { expect, test, describe } from 'vitest';
import * as utils from '../../src/composables/utils.js';

describe('Utils', () => {
    test('Clone object similarity test (toStrictEqual)', () => {
        const origin = {
            name: 'Test suite',
            type: 'Object',
            usage: 'Testing',
            id: 1,
        };

        expect(origin).toStrictEqual(utils.cloneData(origin));
    });

    test('Format Bytes [234344565 toBe 223.488 MB]', () => {
        const origin = 234344565;
        expect(utils.formatBytes(origin, 3)).toBe('223.488 MB');
    });

    test('Format Bytes [1024 toBe 1 KB]', () => {
        const origin = 1024;
        expect(utils.formatBytes(origin, 0)).toBe('1 KB');
    });

    test('Format Bytes [1024 * 1024 toBe 1 MB]', () => {
        const origin = 1024 * 1024;
        expect('1 MB').toBe(utils.formatBytes(origin, 0));
    });

    test('Format Bytes [1 !toBe 1 MB]', () => {
        const origin = 1;
        expect(true).toBe('1 MB' !== utils.formatBytes(origin, 0));
    });

    test('Decode path [usr|bin|mysql toBe usr/bin/mysql]', () => {
        const origin = 'usr|bin|mysql';
        expect('usr/bin/mysql').toBe(utils.decodePath(origin));
    });

    test('Encode path [etc/nginx/conf.d toBe etc|nginx|conf.d]', () => {
        const origin = 'etc/nginx/conf.d';
        expect('etc|nginx|conf.d').toBe(utils.encodePath(origin));
    });

    test('Random key toBeTypeOf string', () => {
        expect(utils.getRndKey(15)).toBeTypeOf('string');
    });

    test('Random key string length toBeLessThanOrEqual 7 (default)', () => {
        expect(utils.getRndKey().length).toBeLessThanOrEqual(7);
    });

    test('File template-01.pdf extension is pdf', () => {
        expect(utils.fileExtension('template-01.pdf')).toBe('pdf');
    });

    test('File .htaccess extension is zero length string', () => {
        expect(utils.fileExtension('.htaccess')).toBe('');
    });

    test('Merge two objects with spread operator ...', () => {
        const origin = {
            user: 'root',
            uuid: 10001,
            path: '/root/.ssh',
            operations: true,
        };
        const updater = {
            user: 'john',
            uuid: 10019,
            path: '/home/john/.ssh',
            scope: 'backend',
        };
        expect(utils.mergeObject(origin, updater)).toStrictEqual({
            user: 'john',
            uuid: 10019,
            path: '/home/john/.ssh',
            operations: true,
            scope: 'backend',
        });
    });

    test('Validate email address john.doe@gmail.com', () => {
        expect(utils.validateEmail('john.doe@gmail.com')).toBe(true);
    });

    test('Keeper save /var/www/tplui into com.softino.app.root and check its value to be the same', () => {
        utils.keeper('com.softino.app.root', '/var/www/tplui');
        expect(utils.keeper('com.softino.app.root')).toBe('/var/www/tplui');
    });

    test('Keeper get never defined com.softino.app.backup and check its value to be null', () => {
        expect(utils.keeper('com.softino.app.backup')).toBe(null);
    });

    test('Object {a: 1000,b: 20,c: "BTC"} to query string "a=1000&b=20&c=BTC"', () => {
        const origin = {
            a: 1000,
            b: 20,
            c: 'BTC',
        };
        expect(utils.objectToQueryString(origin)).toBe('a=1000&b=20&c=BTC');
    });

    test('Locale string "Příliš žluťoučký kůň cválá" to latin 127 base chars "Prilis zlutoucky kun cvala"', () => {
        expect(utils.toLatin128('Příliš žluťoučký kůň cválá')).toBe('Prilis zlutoucky kun cvala');
    });

    test('Hyphenate camel case string "StartTestingYourCode" into "start-testing-your-code"', () => {
        expect(utils.camelToKebabCase('StartTestingYourCode')).toBe('start-testing-your-code');
    });

    test('Tokenize string "Start testing your code" with custom delimiter "_" into "Start_testing_your_code"', () => {
        expect(utils.replaceStringSpaces('Start testing your code')).toBe('Start_testing_your_code');
    });

    test('Guess valid API object detecting relevant keys id + isValid (false)', () => {
        const origin = {
            id: '1000000000',
            isPlague: true,
            title: 'Template',
        };
        expect(utils.guessValidDbObject(origin)).toBe(false);
    });

    test('Guess valid API object detecting relevant keys id + isValid (true)', () => {
        const origin = {
            id: '1000000000',
            isValid: true,
            title: 'Template',
        };
        expect(utils.guessValidDbObject(origin)).toBe(true);
    });
});
