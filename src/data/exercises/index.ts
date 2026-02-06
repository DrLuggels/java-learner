import type { Exercise } from '../../types';
import { classStructureExercises } from './class-structure';
import { binaryNumbersExercises } from './binary-numbers';
import { dataObjectsExercises } from './data-objects';
import { operatorsExercises } from './operators';
import { consoleAppsExercises } from './console-applications';
import { casesExercises } from './cases';
import { loopsExercises } from './loops';
import { arraysExercises } from './arrays';
import { ooExercises } from './oo';
import { javaApiExercises } from './java-api';
import { polymorphismExercises } from './polymorphism';
import { exceptionsExercises } from './exceptions';
import { lambdasExercises } from './lambdas';
import { genericsExercises } from './generics';
import { mapsExercises } from './maps';
import { optionalsExercises } from './optionals';
import { streamApiExercises } from './stream-api';
import { unitTestsExercises } from './unit-tests';
import { enumsExercises } from './enums';
import { interfacesExercises } from './interfaces';
import { abstraktFinalExercises } from './abstrakt-final';
import { innereKlassenExercises } from './innere-klassen';
import { komparatorenExercises } from './komparatoren';
import { ioStreamsExercises } from './io-streams';
import { hashingExercises } from './hashing';
import { baeumeExercises } from './baeume';
import { algorithmenExercises } from './algorithmen';
import { klassendiagrammeExercises } from './klassendiagramme';
import { aktivitaetsdiagrammeExercises } from './aktivitaetsdiagramme';
import { javafxExercises } from './javafx';

export const exercises: Exercise[] = [
  ...classStructureExercises,
  ...binaryNumbersExercises,
  ...dataObjectsExercises,
  ...operatorsExercises,
  ...consoleAppsExercises,
  ...casesExercises,
  ...loopsExercises,
  ...arraysExercises,
  ...ooExercises,
  ...javaApiExercises,
  ...polymorphismExercises,
  ...exceptionsExercises,
  ...lambdasExercises,
  ...genericsExercises,
  ...mapsExercises,
  ...optionalsExercises,
  ...streamApiExercises,
  ...unitTestsExercises,
  ...enumsExercises,
  ...interfacesExercises,
  ...abstraktFinalExercises,
  ...innereKlassenExercises,
  ...komparatorenExercises,
  ...ioStreamsExercises,
  ...hashingExercises,
  ...baeumeExercises,
  ...algorithmenExercises,
  ...klassendiagrammeExercises,
  ...aktivitaetsdiagrammeExercises,
  ...javafxExercises,
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id);
}

export function getExercisesByTopic(topicId: string): Exercise[] {
  return exercises.filter(e => e.topicId === topicId);
}
