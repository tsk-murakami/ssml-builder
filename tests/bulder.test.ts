
import { Builder } from '../src/ssml-builder';

function makeSSML( val: string ){
    return "<speak>"+ val + "</speak>"
};

describe( 'simple', () => {
    it( 'raw(useEscape)', () => {
        const bulder = new Builder();
        const ssml = bulder.raw('<aaa').ssml()
        expect( ssml ).toEqual(makeSSML("&lt;aaa"))
    })
    it( 'raw(not useEscape)', () => {
        const bulder = new Builder();
        const ssml = bulder.raw('<aaa>', false).ssml()
        expect( ssml ).toEqual(makeSSML("<aaa>"))
    })
    it( 'say-as', () => {
        const bulder = new Builder();
        const ssml = bulder.sayAs({interpretAs: 'digits', word: "12345" }).ssml()
        expect( ssml ).toEqual(makeSSML('<say-as interpret-as=\"digits\">12345</say-as>'))
    })
    it( 'break', () => {
        const bulder = new Builder();
        const ssml = bulder.break({ strength: 'x-strong' , time: "10s" }).ssml()
        expect( ssml ).toEqual(makeSSML('<break strength=\"x-strong\" time=\"10s\" />'))
    })
    it( 'sub', () => {
        const bulder = new Builder();
        const ssml = bulder.sub({ word: 'fuga', alias: 'hoge' }).ssml()
        expect( ssml ).toEqual(makeSSML('<sub alias=\"hoge\">fuga</sub>'))
    })
    it( 'prosody', () => {
        const bulder = new Builder();
        const ssml = bulder.prosody({ word: 'fuga', rate:'slow', pitch: '-2st' }).ssml()
        expect( ssml ).toEqual(makeSSML('<prosody rate="slow" pitch="-2st">fuga</prosody>'))
    } )
} )

describe( 'wrap', () => {
    it( 'audio', () => {
        const bulder = new Builder();
        const ssml = bulder.audio({ src: 'https://hoge.com' })
            .raw("<desc>a cat purring</desc>", false)
            .raw("PURR (sound didn't load)", true)
            .up()
            .ssml()
        expect( ssml ).toEqual(makeSSML(
            `<audio src=\"https://hoge.com\"><desc>a cat purring</desc>PURR (sound didn't load)</audio>`
        ))
    } )
    it( 'sentence', () => {
        const bulder = new Builder();
        const ssml = bulder.sentence()
            .sayAs( { interpretAs: 'digits', word: '12345' } )
            .raw("sentence", true)
            .up()
            .ssml()
        expect( ssml ).toEqual(makeSSML(
            `<s ><say-as interpret-as=\"digits\">12345</say-as>sentence</s>`
        ))
    } )
    it( 'paragraph', () => {
        const bulder = new Builder();
        const ssml = bulder.paragraph()
            .sayAs( { interpretAs: 'digits', word: '12345' } )
            .raw("paragraph", true)
            .up()
            .ssml()
        expect( ssml ).toEqual(makeSSML(
            `<p ><say-as interpret-as=\"digits\">12345</say-as>paragraph</p>`
        ))
    } )
} )

describe( 'multi wrap', () => {
    it( '3 levels', () => {
        const bulder = new Builder();
        const ssml = bulder.raw('multi')
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
} )