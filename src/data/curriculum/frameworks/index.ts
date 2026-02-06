import type { Module } from '../../../types';
import { collectionsFramework } from './collections-framework';
import { hashing } from './hashing';
import { algorithmen } from './algorithmen';
import { gui } from './gui';
import { javafx } from './javafx';
import { softwaretests } from './softwaretests';
import { unitTests } from './unit-tests';
import { mockito } from './mockito';

export const frameworksModule: Module = {
  id: 'frameworks',
  title: 'Frameworks & Testing',
  description: 'Collections Framework, Algorithmen, GUI-Entwicklung mit JavaFX und professionelles Testen mit JUnit 5 und Mockito.',
  icon: 'TestTube',
  color: 'text-accent-red',
  topics: [
    collectionsFramework,
    hashing,
    algorithmen,
    gui,
    javafx,
    softwaretests,
    unitTests,
    mockito
  ]
};
