declare module 'kaitai-struct' {
    interface KaitaiStream {
        readonly pos: number;
        readonly size: number;
        isEof(): boolean;
        seek(pos: number): void;
        readBytes(len: number): Uint8Array;
    }
}
