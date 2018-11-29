type SFTPCredentialsType = {
  username: string,
  publicKey: string,
  privateKey: string,
  type: 'SSHKEYS'
}

type AgaveStorageType = {
  host: string,
  port: number,
  protocol: 'SFTP' | 'IRODS' | 'IRODS4' | 'GRIDFTP' | 'S3' | 'LOCAL',
  auth: SFTPCredentialsType
}

export type AgaveSystemCreateConfigType = {
  id: string,
  name: string,
  status: 'UP' | 'DOWN',
  type: 'STORAGE' | 'EXECUTION',
  description: string,
  site: string,
  storage: AgaveStorageType
}
