import * as assert from 'assert';

import { getTitle } from '../../lib/htmlHelper';

const plainTitle = 'test';
const toHtmlContent = (title: string) => `<html><head><title>${title}</title></head><body></body></html>`;

suite('htmlHelper Test Suite', () => {

	test('Given no title element, getTitle returns null', () => {
		const input = '';
		const result = getTitle(input);
		assert.strictEqual(result, null);
	});

	test('Given a title element with plain title, getTitle returns the plain title', () => {
		const input = toHtmlContent(plainTitle);
		const result = getTitle(input);
		assert.strictEqual(result, plainTitle);
	});

	test('Given a title element with leading whitespace, getTitle returns the plain title', () => {
		const input = toHtmlContent(' \n\t ' + plainTitle);
		const result = getTitle(input);
		assert.strictEqual(result, plainTitle);
	});

	test('Given a title element with trailing whitespace, getTitle returns the plain title', () => {
		const input = toHtmlContent(plainTitle + ' \n\t ');
		const result = getTitle(input);
		assert.strictEqual(result, plainTitle);
	});

	test('Given a title element with named entity, getTitle returns the title with resolved entity', () => {
		const input = toHtmlContent('&uuml;');
		const expected = 'ü';
		const result = getTitle(input);
		assert.strictEqual(result, expected);
	});

	test('Given a title element with decimal code point entity, getTitle returns the title with resolved entity', () => {
		const input = toHtmlContent('&#252;');
		const expected = 'ü';
		const result = getTitle(input);
		assert.strictEqual(result, expected);
	});

	test('Given a title element with hexadecimal code point entity, getTitle returns the title with resolved entity', () => {
		const input = toHtmlContent('&#xFC;');
		const expected = 'ü';
		const result = getTitle(input);
		assert.strictEqual(result, expected);
	});

	test('Given a title element with unknown entity, getTitle returns the title with unresolved entity', () => {
		const input = toHtmlContent('&unknown;');
		const expected = '&unknown;';
		const result = getTitle(input);
		assert.strictEqual(result, expected);
	});
});
