import { assert, expect, test, describe } from 'vitest';
import * as i18n from '../../src/composables/i18n.js';

describe('I18n', () => {
    test('Get lang token value [pwdPlaceholder toBe Heslo]', () => {
        expect(i18n.t('pwdPlaceholder')).toBe('Heslo');
    });

    test('Get non existent lang token value and get default red flag [blablabla toBe blablabla 🚩]', () => {
        expect(i18n.t('blablabla')).toBe(`blablabla ${i18n.undefinedToken()}`);
    });

    test('Get lang token value pluralized [test toBe žádná položka]', () => {
        expect(i18n.t('test', { count: 0 })).toBe('žádná položka');
    });

    test('Get lang token value pluralized [test toBe pár položek (4)]', () => {
        expect(i18n.t('test', { count: 4 })).toBe('pár položek (4)');
    });
});
