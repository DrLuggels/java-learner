import { theory as t01 } from './theory/theory01-grundlagen'
import { theory as t02 } from './theory/theory02-operatoren'
import { theory as t03 } from './theory/theory03-verzweigungen'
import { theory as t04 } from './theory/theory04-schleifen'
import { theory as t05 } from './theory/theory05-arrays'
import { theory as t06 } from './theory/theory06-klassen'
import { theory as t07 } from './theory/theory07-enums'
import { theory as t08 } from './theory/theory08-vererbung'
import { theory as t09 } from './theory/theory09-abstrakt-interfaces'
import { theory as t10 } from './theory/theory10-arraylist'
import { theory as t11 } from './theory/theory11-exceptions'
import { theory as t12 } from './theory/theory12-comparator'

import { questions as q01 } from './module01-grundlagen'
import { questions as q02 } from './module02-operatoren'
import { questions as q03 } from './module03-verzweigungen'
import { questions as q04 } from './module04-schleifen'
import { questions as q05 } from './module05-arrays'
import { questions as q06 } from './module06-klassen'
import { questions as q07 } from './module07-enums'
import { questions as q08 } from './module08-vererbung'
import { questions as q09 } from './module09-abstrakt-interfaces'
import { questions as q10 } from './module10-arraylist'
import { questions as q11 } from './module11-exceptions'
import { questions as q12 } from './module12-comparator'

const data = {
  1:  { theory: t01, questions: q01 },
  2:  { theory: t02, questions: q02 },
  3:  { theory: t03, questions: q03 },
  4:  { theory: t04, questions: q04 },
  5:  { theory: t05, questions: q05 },
  6:  { theory: t06, questions: q06 },
  7:  { theory: t07, questions: q07 },
  8:  { theory: t08, questions: q08 },
  9:  { theory: t09, questions: q09 },
  10: { theory: t10, questions: q10 },
  11: { theory: t11, questions: q11 },
  12: { theory: t12, questions: q12 },
}

export function getModuleData(id) {
  return data[id] || { theory: [], questions: [] }
}
