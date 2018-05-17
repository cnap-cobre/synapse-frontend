export function fileIconResolver(item) {
  console.log(item.permissions);
  if (item.permissions === "READ_WRITE" || item.permissions === "READ") {
    if (item.name.match(/^\./)) {
      return 'ti-settings';
    } else if (item.name.match(/\.(txt|tsv|csv)$/i)) {
      return 'ti-text';
    } else if (item.name.match(/\.(gz|tar|zip)$/i)) {
      return 'ti-archive';
    } else if (item.name.match(/\.(jpe?g|gif|tiff|png|svg|eps|ai)$/i)) {
      return 'ti-gallery';
    } else if (item.name.match(/\.(wav|mp3|m4a|aac|oga)$/i)) {
      return 'ti-music-alt';
    } else if (item.name.match(/\.(mp4|mov|wmv|flv|avi|ogg|vob|m4v|mpeg|mp2|3g([p2]))$/i)) {
      return 'ti-video-camera';
    } else {
      return 'ti-file';
    }
  } else {
    if (item.type === 'dir') {
      return 'ti-folder';
    } else {
      return 'ti-file';
    }
  }
}

// Executable files under 8kb may in fact be symlinks to directories
// The Agave API does not clarify whether a raw file is a symlink,
// let alone whether it is a symlink pointing to a directory.