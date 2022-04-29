cp3-kaitai-zlib
===============

`zlib` processors for [Kaitai Struct](https://kaitai.io/), with support for streams of unknown size.

## Installation

```sh
# npm
npm install cp3-kaitai-zlib

# or yarn
yarn add cp3-kaitai-zlib
```

## Usage

```yaml
# ./mydata.ksy
meta:
  id: my-data
  # ...etc, etc...
seq:
  - id: example_data
    size: 0
    process: cp3.kaitai.zlib.inflate(_io)
```

## Inflate

<details><summary>Click to expand</summary>

### cp3.kaitai.zlib.inflate

Decompresses the data. This will automatically detect gzip and zlib data (but not raw deflate data).

#### Example

```yaml
seq:
  - id: glib_or_zlib_data_with_known_size
    size: 80
    process: cp3.kaitai.zlib.inflate
```

### cp3.kaitai.zlib.inflate(windowBits)

Decompresses the data using the specified `windowBits`.


#### Parameters

 - `windowBits`
   - `0` To use the windowBits from the zlib header.
   - A number between `8` and `15` for zlib.
   - A number between `-8` and `-15` for raw deflate.
   - A number between `24` and `31` for gzip.
   - A number between `40` and `47` to auto-detect zlib and gzip.
   - See [Notes on windowBits](#notes-on-windowbits).

#### Example

```yaml
seq:
  - id: raw_data_with_known_size
    size: 80
    process: cp3.kaitai.zlib.inflate(-15)
```

### cp3.kaitai.zlib.inflate(stream)

Decompresses the stream until the stream ends or the end of the compressed data is reached. This will automatically detect gzip and zlib data (but not raw deflate data).

#### Parameters

 - `stream` - The kaitai stream to read from.

#### Example

```yaml
seq:
  - id: glib_or_zlib_data_with_unknown_size
    size: 0
    process: cp3.kaitai.zlib.inflate(_io)
```

### cp3.kaitai.zlib.inflate(stream, windowBits)

Decompresses the stream using the specified `windowBits` until the stream ends or the end of the compressed data is reached.

#### Parameters

 - `stream` - The kaitai stream to read from.
 - `windowBits`
   - `0` To use the windowBits from the zlib header.
   - A number between `8` and `15` for zlib.
   - A number between `-8` and `-15` for raw deflate.
   - A number between `24` and `31` for gzip.
   - A number between `40` and `47` to auto-detect zlib and gzip.
   - See [Notes on windowBits](#notes-on-windowbits).

#### Example

```yaml
seq:
  - id: glib_data_with_unknown_size
    size: 0
    process: cp3.kaitai.zlib.inflate(_io, 31)
```

</details>

## InflateRaw

<details><summary>Click to expand</summary>

### cp3.kaitai.zlib.inflate_raw

Decompresses raw deflate data.

#### Example

```yaml
seq:
  - id: raw_data_with_known_size
    size: 80
    process: cp3.kaitai.zlib.inflate_raw
```

### cp3.kaitai.zlib.inflate_raw(windowBits)

Decompresses raw deflate data with the given `windowBits`. Note: this will automatically adjust `windowBits` for raw deflate decompression.

#### Parameters

 - `windowBits` - A number between `8` and `15`. See [Notes on windowBits](#notes-on-windowbits).

#### Example

```yaml
seq:
  - id: raw_data_with_known_size
    size: 80
    process: cp3.kaitai.zlib.inflate(15)
```

</details>

## InflateZlib

<details><summary>Click to expand</summary>

### cp3.kaitai.zlib.inflate_zlib

Decompresses zlib data.

#### Example

```yaml
seq:
  - id: zlib_data_with_known_size
    size: 80
    process: cp3.kaitai.zlib.inflate_zlib
```

### cp3.kaitai.zlib.inflate_zlib(stream)

Decompresses the zlib stream until the stream ends or the end of the compressed data is reached.

#### Parameters

 - `stream` - The kaitai stream to read from.

#### Example

```yaml
seq:
  - id: zlib_data_with_unknown_size
    size: 0
    process: cp3.kaitai.zlib.inflate_zlib(_io)
```

### cp3.kaitai.zlib.inflate_zlib(windowBits)

Decompresses zlib data using the specified `windowBits`. Note: this will automatically adjust `windowBits` for zlib decompression.

#### Parameters

 - `windowBits` - A number between `8` and `15`. See [Notes on windowBits](#notes-on-windowbits).

#### Example

```yaml
seq:
  - id: zlib_data_with_known_size
    size: 80
    process: cp3.kaitai.zlib.inflate_zlib(15)
```

### cp3.kaitai.zlib.inflate_zlib(stream, windowBits)

Decompresses the zlib stream using the specified `windowBits` until the stream ends or the end of the compressed data is reached. Note: this will automatically adjust `windowBits` for zlib decompression.

#### Parameters

 - `stream` - The kaitai stream to read from.
 - `windowBits` - A number between `8` and `15`. See [Notes on windowBits](#notes-on-windowbits).

#### Example

```yaml
seq:
  - id: zlib_data_with_unnown_size
    size: 0
    process: cp3.kaitai.zlib.inflate_zlib(_io, 15)
```

</details>

## InflateGzip

<details><summary>Click to expand</summary>

### cp3.kaitai.zlib.inflate_gzip

Decompresses gzip data.

#### Example

```yaml
seq:
  - id: gzip_data_with_known_size
    size: 80
    process: cp3.kaitai.zlib.inflate_gzip
```

### cp3.kaitai.zlib.inflate_gzip(stream)

Decompresses the gzip stream until the stream ends or the end of the compressed data is reached.

#### Parameters

 - `stream` - The kaitai stream to read from.

#### Example

```yaml
seq:
  - id: gzip_data_with_unknown_size
    size: 0
    process: cp3.kaitai.zlib.inflate_gzip(_io)
```

### cp3.kaitai.zlib.inflate_gzip(windowBits)

Decompresses gzip data using the specified `windowBits`. Note: this will automatically adjust `windowBits` for gzip decompression.

#### Parameters

 - `windowBits` - A number between `8` and `15`. See [Notes on windowBits](#notes-on-windowbits).

#### Example

```yaml
seq:
  - id: gzip_data_with_known_size
    size: 80
    process: cp3.kaitai.gzip.inflate_gzip(15)
```

### cp3.kaitai.zlib.inflate_gzip(stream, windowBits)

Decompresses the gzip stream using the specified `windowBits` until the stream ends or the end of the compressed data is reached. Note: this will automatically adjust `windowBits` for gzip decompression.

#### Parameters

 - `stream` - The kaitai stream to read from.
 - `windowBits` - A number between `8` and `15`. See [Notes on windowBits](#notes-on-windowbits).

#### Example

```yaml
seq:
  - id: gzip_data_with_unnown_size
    size: 0
    process: cp3.kaitai.zlib.inflate_gzip(_io, 15)
```

</details>

## Notes on windowBits

The `windowBits` parameter in zlib is a bit confusing, here's what I know:
- The `windowBits` parameter is the base two logarithm of the window size (the size of the history buffer).
- `windowBits` is a number in the range 8..15
- The window size used for decompressing needs to be greater than or equal to the window size used to compress the data.
- `windowBits` can be adjusted to change the data format:
  - Left alone, data will be compressed/decompressed in zlib format (deflate data wrapped in a zlib header/trailer)
    - Setting `windowBits` to 0 will use the window size from the zlib header.
  - Negating `windowBits` will compress/decompress data as raw deflate data (data with no header or trailer).
  - Adding 16 to `windowBits` will compress/decompress data in gzip format (deflate data wrapped in a gzip header/trailer)
  - Adding 32 to `windowBits` will automatically detect gzip or zlib format when decompressing data

You can also check the `zlib` manual: https://www.zlib.net/manual.html#Advanced

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
