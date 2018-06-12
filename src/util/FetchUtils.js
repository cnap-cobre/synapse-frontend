export const fetchToJson = (response) => response.json();

export function fetchErrorThrower(response) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function DropboxToAgaveFormat(response) {
  return response.entries.map((item) => {
    return {
      format: item['.tag'] === 'folder' ? 'folder' : 'raw',
      lastModified: item.server_modified,
      length: item.size,
      name: item.name,
      path: item.path_display,
      permissions: '',
      system: 'dropbox',
      type: item['.tag'] === 'folder' ? 'dir' : 'file',
    }
  });
}