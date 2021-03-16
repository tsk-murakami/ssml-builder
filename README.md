# ssml-builder

## Description
Speech Synthesis Markup Language (SSML) is an XML-based markup language for speech synthesis applications.

This library supports the creation of SSML.

## Install

```bash
npm install ts-ssml-builder
```

## Usage

```ts
import { SSMLBuilder } from 'ts-ssml-builder';

const builder = new SSMLBuilder();
const ssml = builder
    .paragraph()
        .raw('This is sample')
        .break({ time: '10s' })
        .audio( {src: 'audio.mp4' } )
        .up()
    .up()
    .ssml();
console.log( ssml )
/** 
 * Output: String
 * <speak><p >This is sample<break time="10s" /><audio src="audio.mp4"></audio></p></speak>
*/
```

## API

```ts
interface ISsmlBuilder {
    ssml(): string;
    raw( value: string, useEscape?: boolean ): Builder;
    sayAs( option: interfaces.ISayAs ): Builder;
    break( option?: Partial<interfaces.IBreak> ): Builder;
    sub( option: interfaces.ISub ): Builder;
    audio( option: interfaces.IAudio ): Builder; // Wrap tag
    sentence(): Builder; // Wrap tag
    paragraph(): Builder; // Wrap tag
    prosody( option: interfaces.IProsody ): Builder;
    emphasis( option?: interfaces.IEmphasis ): Builder; // Wrap tag
    up(): Builder;
};

export class Builder implements ISsmlBuilder { /** */}
```
Wrap tag( sentence, paragraph... ) needs to explicitly call `up()` when closing a tag.

| Name | Wrap tag? |Description |
| ---- | ---- | ---- |
| raw | No | You can add text and insert custom tags. `useEscape` is default `true`.　|
| sayAs | No |Insert the `say-as` tag. |
| break | No |Insert the `break` tag. |
| sub | No |Insert the `sub` tag. |
| audio | Yes | Insert the `audio` tag. |
| sentence | Yes | Insert the `s` tag. |
| paragraph | Yes | Insert the `p` tag. |
| prosody | No | Insert the `prosody` tag. |
| emphasis | Yes | Insert the `emphasis` tag. |

### API Params
The `audio` and `prosody` can be set to any attribute.
```ts
type InterpretAs = 'characters' | 'spell-out' | 'cardinal' | 'number' | 'address'
    | 'ordinal' | 'digits' | 'fraction' | 'unit' | 'date' | 'time' | 'telephone' 
    | 'interjection' | 'expletive'
interface ISayAs {
    interpretAs: InterpretAs;
    word: string;
    format?: string;
    detail?: string;
};

type BreakStrength = 'none' | 'x-weak' | 'weak' | 'medium' | 'strong' | 'x-strong'

interface IBreak {
    strength: BreakStrength;
    time: string;
};

interface ISub {
    alias: string;
    word: string;
};

interface IAudio {
    src: string;
    [ key: string ] : string;
};
interface IProsody {
    word: string;
    [ key: string ] : string;
};
export type EmphasisLevel = 'strong' | 'moderate' | 'none' | 'reduced'
export interface IEmphasis {
    level: EmphasisLevel;
};
```

### Escape
Applies to all `word` values of the above API parameters and when `useEscape` of API:`raw` is `true`.

Therefore, if you use custom elements in raw, `useEscape` should be set to `false`.

```ts
/* Escape processing　*/
escapedLines = escapedLines.replace(/&/g, '&amp;');
escapedLines = escapedLines.replace(/"/g, '&quot;');
escapedLines = escapedLines.replace(/</g, '&lt;');
escapedLines = escapedLines.replace(/>/g, '&gt;');
```


## Feature
<ul>
<li><input type="checkbox">Corresponding to commonly used tag.</li>
<li><input type="checkbox">Support for additional Google Text-to-Speech features.</li>
<li><input type="checkbox">Support for additional Amazon Alexa features.</li>
</ul>

## Licence

[MIT](https://github.com/tsk-murakami/ssml-builder/blob/main/LICENSE)


