import * as m01 from './module01-grundlagen'
import * as m02 from './module02-operatoren'
import * as m03 from './module03-verzweigungen'
import * as m04 from './module04-schleifen'
import * as m05 from './module05-arrays'
import * as m06 from './module06-klassen'
import * as m07 from './module07-enums'
import * as m08 from './module08-vererbung'
import * as m09 from './module09-abstrakt-interfaces'
import * as m10 from './module10-arraylist'
import * as m11 from './module11-exceptions'
import * as m12 from './module12-comparator'

const data = {
  1: m01, 2: m02, 3: m03, 4: m04, 5: m05, 6: m06,
  7: m07, 8: m08, 9: m09, 10: m10, 11: m11, 12: m12,
}

export function getModuleData(id) {
  return data[id] || { theory: [], questions: [] }
}
