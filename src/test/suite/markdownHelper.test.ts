import * as assert from 'assert';

import { getUrls, replaceUrlsAndIncompleteLinks } from '../../lib/markdownHelper';

const testUrl = 'https://example.com';

suite('markdownHelper Test Suite', () => {

	test('Given text with no urls, getUrls returns empty list', () => {
		const input = ' no urls ';
		const result = getUrls(input);
		assert.strictEqual(result.length, 0);
	});

	test('Given text with single plain URL, getUrls returns the URL', () => {
		const input = ` ${testUrl} `;
		const result = getUrls(input);
		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0], testUrl);
	});

	test('Given text with multiple identical plain URLs, getUrls returns the URLs', () => {
		const input = `${testUrl} ${testUrl}\n${testUrl}`;
		const result = getUrls(input);
		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0], testUrl);
	});

	test('Given text with multiple different plain URLs, getUrls returns the URLs', () => {
		const input = `${testUrl}1 ${testUrl}2\n${testUrl}3`;
		const result = getUrls(input);
		assert.strictEqual(result.length, 3);
		assert.strictEqual(result[0], `${testUrl}1`);
		assert.strictEqual(result[1], `${testUrl}2`);
		assert.strictEqual(result[2], `${testUrl}3`);
	});

	test('Given text with single plain URL in pointed brackets, getUrls returns the URL', () => {
		const input = ` <${testUrl}> `;
		const result = getUrls(input);
		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0], testUrl);
	});

	test('Given text with single plain URL in incomplete link, getUrls returns the URL', () => {
		const input = `[](${testUrl})`;
		const result = getUrls(input);
		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0], testUrl);
	});

	test('Given text with no URLs, replaceUrlsAndIncompleteLinks does not appy replacement', () => {
		const input = ' no urls ';
		const result = replaceUrlsAndIncompleteLinks(
			input, _ => undefined);
		assert.strictEqual(result, input);
	});

	test('Given text with single plain URL and the callback returns undefined, replaceUrlsAndIncompleteLinks does not appy replacement', () => {
		const input = ` ${testUrl} `;
		const result = replaceUrlsAndIncompleteLinks(
			input, _ => undefined);
		assert.strictEqual(result, input);
	});

	test('Given text with single plain URL and the callback returns a title, replaceUrlsAndIncompleteLinks applies the replacement', () => {
		const input = ` ${testUrl} `;
		const result = replaceUrlsAndIncompleteLinks(
			input, url => `!!${url}!!`);
		assert.strictEqual(result, ` !!${testUrl}!! `);
	});

	test('Given text with multiple plain URLs and the callback returns a title, replaceUrlsAndIncompleteLinks returns the text with replaced URLs', () => {
		const input = `${testUrl}1 ${testUrl}2\n${testUrl}3`;
		const result = replaceUrlsAndIncompleteLinks(
			input, url => `!!${url}!!`);
		assert.strictEqual(result, `!!${testUrl}1!! !!${testUrl}2!!\n!!${testUrl}3!!`);
	});

});
