import lookup from './mimeMapper';

export const fetchToJson = response => response.json();

export function fetchErrorThrower(response) {
  if (!response.ok) {
    throw response;
  }
  return response;
}

export function DropboxToAgaveFormat(response) {
  return response.entries.map(item => ({
    format: item['.tag'] === 'folder' ? 'folder' : 'raw',
    lastModified: item.server_modified,
    length: item.size,
    mimeType: item['.tag'] === 'folder' ? 'text/directory' : lookup(item.path_display),
    name: item.name,
    path: item.path_display,
    permissions: '',
    system: 'home',
    type: item['.tag'] === 'folder' ? 'dir' : 'file',
    _links: {
      self: {
        href: `/dropbox/content/2/files/download${item.path_display}`,
      },
    },
  }));
}
