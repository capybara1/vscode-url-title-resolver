import axios from 'axios';

import { getTitle } from './htmlHelper';

export interface TitleInfos {
	mapping: Map<string, string>,
	errorSummary: string,
}

const requestConfig = {
	headers: {
		/* eslint-disable @typescript-eslint/naming-convention */
		'Accept': 'text/html,application/xhtml+xml'
		/* eslint-enable @typescript-eslint/naming-convention */
	}
};

export async function requestTitles(urls: string[]): Promise<TitleInfos> {
	const mapping: Map<string, string> = new Map<string, string>();
	const errorStats: Map<string, number> = new Map<string, number>();
	const requests = urls.map(
		url => axios.get(url, requestConfig)
			.then(response => {
				const html: string = response.data;
				const title = getTitle(html);
				if (!title) {
					console.log(`A title for "${url}" could not be retrieved`);
					incrementError(errorStats, "missing title HTML element");
					return;
				}
				console.log(`Resolved title for "${url}": "${title}"`);
				mapping.set(url, title);
			})
			.catch(reason => handleRequestException(url, reason, errorStats)));
	await Promise.all(requests);

	return {mapping, errorSummary: formatErrors(errorStats)};
}

function handleRequestException(url: string, reason: any, errorStats: Map<string, number>) {
	console.log(`Failed to resolve "${url}": ${reason}`);
	if (reason.code === 'ENOTFOUND') {
		incrementError(errorStats, "host not found");
	} else if (reason.response && reason.response.status) {
		const status = reason.response.status;
		const statusText = reason.response.statusText || 'unexpected';
		const message = `${statusText} response (${status})`;
		incrementError(errorStats, message);
	} else {
		incrementError(errorStats, "failed request");
	}
}

function incrementError(errorStats: Map<string, number>, key: string) {
	let count = errorStats.get(key) || 0;
	errorStats.set(key, ++count);
}

function formatErrors(errorStats: Map<string, number>): string {
	let result = Array.from(errorStats.entries())
		.map(pair => pair[1] > 1 ? `${pair[1]}× ${pair[0]}` : pair[0])
		.join(', ');

	return result;
}