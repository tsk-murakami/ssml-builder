
export function attribute( option: { [word: string]: any }, useKebabCase=false ){
    const attributes: string[] = []
    for( const [ key, val] of Object.entries(option) ){
        if( key === 'word' ) continue;
        if( val ){
            const sureKey = useKebabCase ? kebabCase(key) : key
            attributes.push(`${sureKey}=\"${val}\"`)
        }
    }
    return attributes.join(" ")
};

function kebabCase( str: string){
    return str.replace(/[A-Z]/, function (match) {
        return '-' + match.toLowerCase();
    });
};

export function escape( word: string ){
    let escapedLines = word
    escapedLines = escapedLines.replace(/&/g, '&amp;');
    escapedLines = escapedLines.replace(/"/g, '&quot;');
    escapedLines = escapedLines.replace(/</g, '&lt;');
    escapedLines = escapedLines.replace(/>/g, '&gt;');
    return escapedLines
};