/// <reference path="../types/kaitai-struct.d.ts" />

import type { KaitaiStream } from 'kaitai-struct';
import { decodeBytes, decodeStream } from './deflate';

/**
 * A processor for decompressing raw deflate data.
 */
class InflateRaw {
    private readonly stream?: KaitaiStream
    private readonly windowBits?: number

    /**
     * Creates a new inflate processor for the given Kaitai stream.
     */
    constructor()

    /**
     * Creates a new inflate processor for the given Kaitai stream.
     * @param windowBits The windowBits.
     */
    constructor(windowBits: number)

    /**
     * Creates a new inflate processor for the given Kaitai stream.
     * @param stream The KaitaiStream to inflate.
     */
    constructor(stream: KaitaiStream)

    /**
     * Creates a new inflate processor for the given Kaitai stream.
     * @param stream The KaitaiStream to inflate.
     * @param windowBits The windowBits.
     */
    constructor(stream: KaitaiStream, windowBits: number)

    /**
     * Creates a new inflate processor for the given Kaitai stream.
     */
    constructor(streamOrWindowBits?: KaitaiStream | number, windowBits?: number) {
        if (typeof streamOrWindowBits === 'number') {
            this.windowBits = streamOrWindowBits;
        }
        else {
            this.stream = streamOrWindowBits;
            this.windowBits = windowBits;
        }
    }

    /**
     * Inflates the Kaitai stream.
     * @param data The data to inflate. If there is no data and a stream was provided in the constructor, the stream is used instead.
     * @returns The inflated data.
     */
    public decode(data: Uint8Array): Uint8Array {
        let windowBits = this.windowBits ?? -15;
        if (windowBits == 0) windowBits = -15;
        while (windowBits > 15) windowBits = windowBits - 16;
        if (windowBits > 0) windowBits = -windowBits;

        if (this.stream) return decodeStream(this.stream, windowBits);
        else if (data.length) return decodeBytes(data, windowBits);
        else return new Uint8Array(0);
    }
}

export = InflateRaw;
