import { v4 as uuidv4 } from 'uuid'

const saved = {
  id: uuidv4(),
  remoteId: null,
  state: 'init',
  files: []
}

const data = {
  currentPackage: saved,
  packages: {

  }
}
data.packages[saved.id] = saved

export default function () {
  return data
}
