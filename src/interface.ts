
export interface IOption {
    version: string;
    lang: string;
};

export type IPartialOption = Partial<Omit<IOption, 'version'>>;

export type InterpretAs = 'characters' | 'spell-out' | 'cardinal' | 'number' | 'address'
    | 'ordinal' | 'digits' | 'fraction' | 'unit' | 'date' | 'time' | 'telephone' 
    | 'interjection' | 'expletive'
export interface ISayAs {
    interpretAs: InterpretAs;
    word: string;
    format?: string;
    detail?: string;
};

export type BreakStrength = 'none' | 'x-weak' | 'weak' | 'medium' | 'strong' | 'x-strong'

export interface IBreak {
    strength: BreakStrength;
    time: string;
};

export interface ISub {
    alias: string;
    word: string;
};

export interface IAudio {
    src: string;
    [ key: string ] : string;
};
export interface IProsody {
    word: string;
    [ key: string ] : string;
};

export type EmphasisLevel = 'strong' | 'moderate' | 'none' | 'reduced'
export interface IEmphasis {
    level: EmphasisLevel;
};
