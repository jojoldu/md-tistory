export function getConfigRootPath() {
  return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
}
