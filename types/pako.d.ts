import 'pako';

declare module 'pako' {
    const Z_OK: number;
    interface Inflate {
        ended: boolean;
        strm: {
            avail_in: number;
            msg: string;
        };
    }
}
