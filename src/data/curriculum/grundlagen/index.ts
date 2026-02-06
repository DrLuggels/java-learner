import type { Module } from '../../../types';
import { programmieren } from './programmieren';
import { javaSprache } from './java-sprache';
import { klassenaufbau } from './klassenaufbau';
import { binaerzahlen } from './binaerzahlen';
import { datentypen } from './datentypen';
import { datenobjekte } from './datenobjekte';
import { zeichenketten } from './zeichenketten';
import { operatoren } from './operatoren';
import { mathBerechnungen } from './math-berechnungen';
import { pseudozufallszahlen } from './pseudozufallszahlen';
import { konsolenanwendungen } from './konsolenanwendungen';

export const grundlagenModule: Module = {
  id: 'grundlagen',
  title: 'Grundlagen',
  description: 'Die Basis der Java-Programmierung: Von der ersten Klasse bis zur Konsolenanwendung.',
  icon: 'BookOpen',
  color: 'text-accent-blue',
  topics: [programmieren, javaSprache, klassenaufbau, binaerzahlen, datentypen, datenobjekte, zeichenketten, operatoren, mathBerechnungen, pseudozufallszahlen, konsolenanwendungen],
};
