export type AgaveFileType = {
  format: string,
  fullPath: string,
  lastModified: number | Date
  length: number,
  mimeType: string,
  name: string,
  path: string,
  permissions: string,
  provider: string,
  system: string,
  type: string,
}

export type FileType = AgaveFileType