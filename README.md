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
    sub(option: interfaces.ISub): Builder;
    audio(option: interfaces.IAudio ): Builder; // Wrap tag
    sentence(): Builder; // Wrap tag
    paragraph(): Builder; // Wrap tag
    up(): Builder;
};

export class Builder implements ISsmlBuilder { /** */}
```
Wrap tag( sentence, paragraph... ) needs to explicitly call `up()` when closing a tag.

| Name | Wrap tag? |Description |
| ---- | ---- | ---- |
| raw | No | You can add text and insert custom tags.　|
| sayAs | No |Insert the `say-as` tag. |
| break | No |Insert the `break` tag. |
| sub | No |Insert the `sub` tag. |
| audio | Yes | Insert the `audio` tag. |
| sentence | Yes | Insert the `s` tag. |
| paragraph | Yes | Insert the `p` tag. |

### API Params
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
```

## Feature
- [ ] Corresponding to commonly used tag.
- [ ] Support for additional Google Text-to-Speech features
- [ ] Support for additional Amazon Alexa features

## Licence

[MIT](https://github.com/tsk-murakami/ssml-builder/blob/master/LICENCE)


