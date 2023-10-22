import path from 'path';

export function getFileNameWithoutExtension(fileName: string): string {
  const extensionDelimiterIndex = fileName.lastIndexOf('.');
  return extensionDelimiterIndex === -1 ? fileName : fileName.substring(0, extensionDelimiterIndex);
}

export function getDirectoryName(filePath: string) {
  return path.basename(path.dirname(filePath));
}

export function fileNameToUrlSlug(fileName: string): string {
  return fileName
  .toLowerCase()
  .replace(/ /g, '-')
  .replace(/[\.]/g, '')
  .replace(/[\-]+/g, '-');
}
