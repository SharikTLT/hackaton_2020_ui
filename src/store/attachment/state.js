import { v4 as uuidv4 } from 'uuid'

export const initialData = {
  id: uuidv4(),
  remoteId: null,
  state: 'init',
  files: []
}

const data = {
  currentPackage: initialData,
  packages: {

  }
}
data.packages[initialData.id] = initialData

export default function () {
  return data
}
