
import { Builder } from '../src/ssml-builder';

import { SSMLBuilder } from '../dist/index';

function makeSSML( val: string ){
    return "<speak>"+ val + "</speak>"
};

describe( 'simple', () => {
    const hoge = new SSMLBuilder()
    it( 'raw(useEscape)', () => {
        const builder = new Builder();
        const ssml = builder.raw('<aaa').ssml()
        expect( ssml ).toEqual(makeSSML("&lt;aaa"))
    })
    it( 'raw(not useEscape)', () => {
        const builder = new Builder();
        const ssml = builder.raw('<aaa>', false).ssml()
        expect( ssml ).toEqual(makeSSML("<aaa>"))
    })
    it( 'say-as', () => {
        const builder = new Builder();
        const ssml = builder.sayAs({interpretAs: 'digits', word: "12345" }).ssml()
        expect( ssml ).toEqual(makeSSML('<say-as interpret-as=\"digits\">12345</say-as>'))
    })
    it( 'break', () => {
        const builder = new Builder();
        const ssml = builder.break({ strength: 'x-strong' , time: "10s" }).ssml()
        expect( ssml ).toEqual(makeSSML('<break strength=\"x-strong\" time=\"10s\" />'))
    })
    it( 'sub', () => {
        const builder = new Builder();
        const ssml = builder.sub({ word: 'fuga', alias: 'hoge' }).ssml()
        expect( ssml ).toEqual(makeSSML('<sub alias=\"hoge\">fuga</sub>'))
    })
    it( 'prosody', () => {
        const builder = new Builder();
        const ssml = builder.prosody({ word: 'fuga', rate:'slow', pitch: '-2st' }).ssml()
        expect( ssml ).toEqual(makeSSML('<prosody rate="slow" pitch="-2st">fuga</prosody>'))
    } )
} )

describe( 'wrap', () => {
    it( 'audio', () => {
        const builder = new Builder();
        const ssml = builder.audio({ src: 'https://hoge.com' })
            .raw("<desc>a cat purring</desc>", false)
            .raw("PURR (sound didn't load)", true)
            .up()
            .ssml()
        expect( ssml ).toEqual(makeSSML(
            `<audio src=\"https://hoge.com\"><desc>a cat purring</desc>PURR (sound didn't load)</audio>`
        ))
    } )
    it( 'sentence', () => {
        const builder = new Builder();
        const ssml = builder.sentence()
            .sayAs( { interpretAs: 'digits', word: '12345' } )
            .raw("sentence", true)
            .up()
            .ssml()
        expect( ssml ).toEqual(makeSSML(
            `<s ><say-as interpret-as=\"digits\">12345</say-as>sentence</s>`
        ))
    } )
    it( 'paragraph', () => {
        const builder = new Builder();
        const ssml = builder.paragraph()
            .sayAs( { interpretAs: 'digits', word: '12345' } )
            .raw("paragraph", true)
            .up()
            .ssml()
        expect( ssml ).toEqual(makeSSML(
            `<p ><say-as interpret-as=\"digits\">12345</say-as>paragraph</p>`
        ))
    } )
    it( 'emphasis', () => {
        const builder = new Builder();
        const ssml = builder.emphasis({ level: 'moderate' })
            .sayAs( { interpretAs: 'digits', word: '12345' } )
            .raw("emphasis", true)
            .up()
            .ssml()
        expect( ssml ).toEqual(makeSSML(
            `<emphasis level="moderate"><say-as interpret-as=\"digits\">12345</say-as>emphasis</emphasis>`
        ))
    } )
} )

describe( 'multi wrap', () => {
    it( '3 levels', () => {
        const builder = new Builder();
        const ssml = builder.raw('multi')
            .paragraph()
                .audio( { src: 'audio' } )
                .up()
                .sayAs( { interpretAs: 'digits', word: '12345' } )
                .sentence()
                    .raw( 'sentence' )
                    .audio( { src: 'audio' })
                    .up()
                .up()
            .up()
            .ssml();
        expect( ssml ).toEqual(makeSSML(
            `multi<p ><audio src=\"audio\"></audio><say-as interpret-as=\"digits\">12345</say-as><s >sentence<audio src=\"audio\"></audio></s></p>`
        ))
    } )
    it( 'Sample usage', () => {
        const builder = new Builder();
        const ssml = builder.paragraph()
            .raw('This is sample')
            .break({ time: '10s' })
            .audio( {src: 'audio.mp4' } )
                .up()
            .up()
            .ssml();
        console.log( ssml )
    } )
} )