
import * as interfaces from "./interface";
import { DEFAULT_OPTION } from "./constans";

import * as utils from './utils';

interface ISsmlBuilder {
    ssml(): string;
    raw( value: string, useEscape?: boolean ): Builder;
    sayAs(option: interfaces.ISayAs ): Builder;
    break(option?: Partial<interfaces.IBreak> ): Builder;
    sub(option: interfaces.ISub): Builder;
    audio(option: interfaces.IAudio ): Builder;
    sentence(): Builder;
    paragraph(): Builder;
    prosody(option: interfaces.IProsody): Builder;
    emphasis(option?: interfaces.IEmphasis): Builder;
    up(): Builder;
};

export class Builder implements ISsmlBuilder {
    private _option: interfaces.IOption;
    protected _elements: string[] = [];
    constructor( /*option?: interfaces.IPartialOption*/ ){
        this._option = {
            ...DEFAULT_OPTION,
            //...option
        }
    };

    public ssml(){
        return "<speak>" + this._elements.join("") + "</speak>"
    };
    public raw( value: string, useEscape=true ): Builder{
        this._elements.push( useEscape ? utils.escape(value) : value )
        return this;
    };
    public sayAs( option: interfaces.ISayAs ): Builder{
        this._elements.push(`<say-as ${utils.attribute(option, true)}>${utils.escape(option.word)}</say-as>`)
        return this;
    };
    public break( option?: Partial<interfaces.IBreak> ): Builder{
        if( !option ) this._elements.push("<break />")
        else this._elements.push( `<break ${utils.attribute(option)} />` )
        return this;
    };
    public sub(option: interfaces.ISub): Builder{
        this._elements.push(`<sub ${utils.attribute(option)}>${utils.escape(option.word)}</sub>`)
        return this;
    };
    public audio(option: interfaces.IAudio ): Builder{
        const wrap = new WrapBuilder(this._option, { tag: 'audio', attribute: option })
        wrap.callback = this.__wrapUpCallback(this._elements.length)
        return wrap
    };
    public sentence(): Builder{
        const wrap = new WrapBuilder(this._option, { tag: 's' })
        wrap.callback = this.__wrapUpCallback(this._elements.length)
        return wrap
    };
    public paragraph(): Builder{
        const wrap = new WrapBuilder(this._option, { tag: 'p' })
        wrap.callback = this.__wrapUpCallback(this._elements.length)
        return wrap
    }
    public prosody( option: interfaces.IProsody ): Builder {
        this._elements.push(`<prosody ${utils.attribute(option)}>${utils.escape(option.word)}</prosody>`)
        return this
    }
    public emphasis(option?: interfaces.IEmphasis){
        const wrap = new WrapBuilder(this._option, { tag: 'emphasis', attribute: option })
        wrap.callback = this.__wrapUpCallback(this._elements.length)
        return wrap
    };
    public up(): Builder {
        return this
    }

    private __wrapUpCallback( elementIndex: number ): WrapCallback {
        return ( tag: string ) => {
            this._elements[elementIndex] = tag;
            return this
        };
    };
};

type WrapCallback = ( element: string ) => Builder

class WrapBuilder extends Builder {
    _tag: string;
    _attribute: any;
    constructor(_: interfaces.IPartialOption, option: { tag: string, attribute?: any } ){
        super()
        this._tag = option.tag;
        this._attribute = option.attribute || {}
    };

    public up(){
        return this.callback(`<${this._tag} ${utils.attribute(this._attribute)}>` + this._elements.join("") + `</${this._tag}>`)
    };
    public callback: WrapCallback = () => this
};
