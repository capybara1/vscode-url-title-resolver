import * as vscode from 'vscode';

import { getUrls, replaceUrlsAndIncompleteLinks } from './lib/markdownHelper';
import { TitleInfos, requestTitles } from './lib/requestHelper';

export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "vscode-url-title-resolver" is now active!');

	let disposable = vscode.commands.registerCommand(
		'vscode-url-title-resolver.resolve-url-title',
		() => {
			const textEditor = vscode.window.activeTextEditor;
			if (!textEditor) {
				console.log('No active text editor');
				return;
			}

			textEditor.selections.forEach(
				sel => resolveTitlesForSelection(textEditor, sel));
		});

	context.subscriptions.push(disposable);
}

function resolveTitlesForSelection(
		textEditor: vscode.TextEditor,
		selection: vscode.Selection) {
	const text = textEditor.document.getText(selection);
	const urls = getUrls(text);
	console.log(`Urls found: ${urls}`);
	requestTitles(urls)
		.then(titleInfos => {
			provideFeedback(urls, titleInfos);
			if (titleInfos.mapping.size === 0) {
				return;
			}
			const replacement = getReplacementForSelection(text, titleInfos);
			textEditor.edit(e => {
				e.replace(selection, replacement);
			});
		});
}

function getReplacementForSelection(text: string, titleInfos: TitleInfos) {
	return replaceUrlsAndIncompleteLinks(text, url => {
		const title = titleInfos.mapping.get(url);
		if (title) {
			return `[${title}](${url})`;
		}
	});
}

function provideFeedback(urls: string[], titleInfos: TitleInfos) {
	const message = `resolved ${titleInfos.mapping.size} titles of ${urls.length} URLs`;
	if (titleInfos.mapping.size === urls.length) {
		vscode.window.showInformationMessage(message);
	} else {
		const messageWithErrorStats = `${message} (${titleInfos.errorSummary})`;
		vscode.window.showWarningMessage(messageWithErrorStats);
	}
}

export function deactivate() {}
