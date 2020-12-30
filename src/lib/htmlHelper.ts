
const htmlEntityMapping = new Map<string, string>([
	['lt', '<'],
	['gt', '>'],
	['amp', '&'],
	['Agrave', 'À'],
	['Aacute', 'Á'],
	['Acirc', 'Â'],
	['Atilde', 'Ã'],
	['Auml', 'Ä'],
	['Aring', 'Å'],
	['AElig', 'Æ'],
	['Ccedil', 'Ç'],
	['Egrave', 'È'],
	['Eacute', 'É'],
	['Ecirc', 'Ê'],
	['Euml', 'Ë'],
	['Igrave', 'Ì'],
	['Iacute', 'Í'],
	['Icirc', 'Î'],
	['Iuml', 'Ï'],
	['ETH', 'Ð'],
	['Ntilde', 'Ñ'],
	['Ograve', 'Ò'],
	['Oacute', 'Ó'],
	['Ocirc', 'Ô'],
	['Otilde', 'Õ'],
	['Ouml', 'Ö'],
	['Oslash', 'Ø'],
	['Ugrave', 'Ù'],
	['Uacute', 'Ú'],
	['Ucirc', 'Û'],
	['Uuml', 'Ü'],
	['Yacute', 'Ý'],
	['THORN', 'Þ'],
	['szlig', 'ß'],
	['agrave', 'à'],
	['aacute', 'á'],
	['acirc', 'â'],
	['atilde', 'ã'],
	['auml', 'ä'],
	['aring', 'å'],
	['aelig', 'æ'],
	['ccedil', 'ç'],
	['egrave', 'è'],
	['eacute', 'é'],
	['ecirc', 'ê'],
	['euml', 'ë'],
	['igrave', 'ì'],
	['iacute', 'í'],
	['icirc', 'î'],
	['iuml', 'ï'],
	['eth', 'ð'],
	['ntilde', 'ñ'],
	['ograve', 'ò'],
	['oacute', 'ó'],
	['ocirc', 'ô'],
	['otilde', 'õ'],
	['ouml', 'ö'],
	['oslash', 'ø'],
	['ugrave', 'ù'],
	['uacute', 'ú'],
	['ucirc', 'û'],
	['uuml', 'ü'],
	['yacute', 'ý'],
	['thorn', 'þ'],
	['yuml', 'ÿ'],
	['nbsp', ' '],
	['iexcl', '¡'],
	['cent', '¢'],
	['pound', '£'],
	['curren', '¤'],
	['yen', '¥'],
	['brvbar', '¦'],
	['sect', '§'],
	['uml', '¨'],
	['copy', '©'],
	['ordf', 'ª'],
	['laquo', '«'],
	['not', '¬'],
	['shy', '­'],
	['reg', '®'],
	['macr', '¯'],
	['deg', '°'],
	['plusmn', '±'],
	['sup2', '²'],
	['sup3', '³'],
	['acute', '´'],
	['micro', 'µ'],
	['para', '¶'],
	['cedil', '¸'],
	['sup1', '¹'],
	['ordm', 'º'],
	['raquo', '»'],
	['frac14', '¼'],
	['frac12', '½'],
	['frac34', '¾'],
	['iquest', '¿'],
	['times', '×'],
	['divide', '÷'],
	['forall', '∀'],
	['part', '∂'],
	['exist', '∃'],
	['empty', '∅'],
	['nabla', '∇'],
	['isin', '∈'],
	['notin', '∉'],
	['ni', '∋'],
	['prod', '∏'],
	['sum', '∑'],
	['minus', '−'],
	['lowast', '∗'],
	['radic', '√'],
	['prop', '∝'],
	['infin', '∞'],
	['ang', '∠'],
	['and', '∧'],
	['or', '∨'],
	['cap', '∩'],
	['cup', '∪'],
	['int', '∫'],
	['there4', '∴'],
	['sim', '∼'],
	['cong', '≅'],
	['asymp', '≈'],
	['ne', '≠'],
	['equiv', '≡'],
	['le', '≤'],
	['ge', '≥'],
	['sub', '⊂'],
	['sup', '⊃'],
	['nsub', '⊄'],
	['sube', '⊆'],
	['supe', '⊇'],
	['oplus', '⊕'],
	['otimes', '⊗'],
	['perp', '⊥'],
	['sdot', '⋅'],
	['Alpha', 'Α'],
	['Beta', 'Β'],
	['Gamma', 'Γ'],
	['Delta', 'Δ'],
	['Epsilon', 'Ε'],
	['Zeta', 'Ζ'],
	['Eta', 'Η'],
	['Theta', 'Θ'],
	['Iota', 'Ι'],
	['Kappa', 'Κ'],
	['Lambda', 'Λ'],
	['Mu', 'Μ'],
	['Nu', 'Ν'],
	['Xi', 'Ξ'],
	['Omicron', 'Ο'],
	['Pi', 'Π'],
	['Rho', 'Ρ'],
	['Sigma', 'Σ'],
	['Tau', 'Τ'],
	['Upsilon', 'Υ'],
	['Phi', 'Φ'],
	['Chi', 'Χ'],
	['Psi', 'Ψ'],
	['Omega', 'Ω'],
	['alpha', 'α'],
	['beta', 'β'],
	['gamma', 'γ'],
	['delta', 'δ'],
	['epsilon', 'ε'],
	['zeta', 'ζ'],
	['eta', 'η'],
	['theta', 'θ'],
	['iota', 'ι'],
	['kappa', 'κ'],
	['lambda', 'λ'],
	['mu', 'μ'],
	['nu', 'ν'],
	['xi', 'ξ'],
	['omicron', 'ο'],
	['pi', 'π'],
	['rho', 'ρ'],
	['sigmaf', 'ς'],
	['sigma', 'σ'],
	['tau', 'τ'],
	['upsilon', 'υ'],
	['phi', 'φ'],
	['chi', 'χ'],
	['psi', 'ψ'],
	['omega', 'ω'],
	['thetasym', 'ϑ'],
	['upsih', 'ϒ'],
	['piv', 'ϖ'],
	['OElig', 'Œ'],
	['oelig', 'œ'],
	['Scaron', 'Š'],
	['scaron', 'š'],
	['Yuml', 'Ÿ'],
	['fnof', 'ƒ'],
	['circ', 'ˆ'],
	['tilde', '˜'],
	['ensp', ' '],
	['emsp', ' '],
	['thinsp', ' '],
	['zwnj', '‌'],
	['zwj', '‍'],
	['lrm', '‎'],
	['rlm', '‏'],
	['ndash', '–'],
	['mdash', '—'],
	['lsquo', '‘'],
	['rsquo', '’'],
	['sbquo', '‚'],
	['ldquo', '“'],
	['rdquo', '”'],
	['bdquo', '„'],
	['dagger', '†'],
	['Dagger', '‡'],
	['bull', '•'],
	['hellip', '…'],
	['permil', '‰'],
	['prime', '′'],
	['Prime', '″'],
	['lsaquo', '‹'],
	['rsaquo', '›'],
	['oline', '‾'],
	['euro', '€'],
	['trade', '™'],
	['larr', '←'],
	['uarr', '↑'],
	['rarr', '→'],
	['darr', '↓'],
	['harr', '↔'],
	['crarr', '↵'],
	['lceil', '⌈'],
	['rceil', '⌉'],
	['lfloor', '⌊'],
	['rfloor', '⌋'],
	['loz', '◊'],
	['spades', '♠'],
	['clubs', '♣'],
	['hearts', '♥'],
	['diams', '♦']
]);

const htmlEntityRegExp = new RegExp(`&(#\\d+|${Array.from(htmlEntityMapping.keys()).join('|')});`, 'gi');

export function getTitle(html: string): string|null {
	const matches = html.match(/(?<=\<title\>).*?(?=\<\/title\>)/si);
	if (!matches) {
		return null;
	}
	const result = sanitizeTitle(matches[0]);

	return result;
}

function sanitizeTitle(title: string): string {
	const normalizedWS = title.trim().replace(/[\s\r\n]+/g, ' ');
	const result = resolveHtmlEntities(normalizedWS);

	return result;
}

function resolveHtmlEntities(html: string) {
	return html.replace(
		htmlEntityRegExp,
		(_, p1: string): string => {
			const char = htmlEntityMapping.get(p1);
			if (char) {
				return char;
			}
			const codePoint = +p1.substr(1);
			return String.fromCodePoint(codePoint);
		});
}