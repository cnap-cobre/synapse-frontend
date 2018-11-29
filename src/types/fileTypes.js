// @flow
export type AgaveFileType = {
  format: string,
  fullPath: string,
  lastModified: number | Date,
  length: number,
  mimeType: string,
  name: string,
  path: string,
  permissions: string,
  provider: string,
  system: string,
  type: string,
  _links: {
    self: {
      href: string
    }
  }
}

export type FileType = AgaveFileType
