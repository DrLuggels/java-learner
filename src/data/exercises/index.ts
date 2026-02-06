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
];

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id);
}

export function getExercisesByTopic(topicId: string): Exercise[] {
  return exercises.filter(e => e.topicId === topicId);
}
