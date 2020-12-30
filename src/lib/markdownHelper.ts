const urlRegExp = /\[\]\((https?\:\/\/[^\)]+)\)|(https?\:\/\/[^\s\)\>\n]+)/gi;

export function getUrls(text: string): string[] {
	const urls = new Set<string>();
	while (true) {
		const matches = urlRegExp.exec(text);
		if (matches === null) {
			break;
		}
		const url = matches[1] ? matches[1] : matches[0];
		urls.add(url);
	}

	const result =  Array.from(urls.values());
	
	return result;
}

export function replaceUrlsAndIncompleteLinks(text: string, callback: (url:string) => string|undefined): string {
	urlRegExp.lastIndex = 0;
	const result = text.replace(urlRegExp, (match: string, group1: string|undefined) => {
		const url = group1 ? group1 : match;
		return callback(url) || match;
	});

	return result;
}