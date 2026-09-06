export async function loadArchivedFilm(
  chunks: string[],
  expectedBytes: number,
  signal: AbortSignal,
  onProgress: (bytes: number) => void,
  request: typeof fetch = fetch,
): Promise<Blob> {
  const parts: ArrayBuffer[] = [];
  let bytes = 0;
  for (const path of chunks) {
    signal.throwIfAborted();
    const response = await request(path, { signal });
    if (!response.ok) throw new Error(`Download failed (${response.status})`);
    const part = await response.arrayBuffer();
    signal.throwIfAborted();
    parts.push(part);
    bytes += part.byteLength;
    if (bytes > expectedBytes) throw new Error('Unexpected film size');
    onProgress(bytes);
  }
  signal.throwIfAborted();
  if (bytes !== expectedBytes) throw new Error('Incomplete film');
  return new Blob(parts, { type: 'video/mp4' });
}
