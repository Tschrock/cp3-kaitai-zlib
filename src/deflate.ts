import { KaitaiStream } from 'kaitai-struct';
import pako from 'pako';

const READ_CHUNK_SIZE = 4096;

/**
 * Inflates the given bytes.
 * This is technically the same as the `pako.inflate()` wrapper, except we throw real errors instead of strings.
 * @param bytes The bytes to inflate.
 * @returns The inflated bytes.
 */
 export function decodeBytes(bytes: Uint8Array, windowBits: number) {
    const inflate = new pako.Inflate({ windowBits, raw: windowBits < 0 });

    // Write all the bytes
    inflate.push(bytes, true);

    // Check for errors
    if (inflate.err !== pako.Z_OK)
        throw new Error(`Pako error: ${inflate.err} ${inflate.msg}`);

    // Return the inflated data
    return inflate.result as Uint8Array;
}

/**
 * Inflates the stream.
 * @returns The inflated bytes.
 */
export function decodeStream(stream: KaitaiStream, windowBits: number) {
    const inflate = new pako.Inflate({ windowBits, raw: windowBits < 0 });

    // Read `stream` until one of the stream ends
    while (!inflate.ended && !stream.isEof()) {
        const available = stream.size - stream.pos;
        const readSize = Math.min(available, READ_CHUNK_SIZE);
        inflate.push(stream.readBytes(readSize));
    }

    // Check for errors
    if (inflate.err !== pako.Z_OK)
        throw new Error(`Pako error: ${inflate.err} ${inflate.msg}`);

    // Reset the stream position to the end of the zlib stream
    stream.seek(stream.pos - inflate.strm.avail_in);

    // Return the inflated data
    return inflate.result as Uint8Array;
}
