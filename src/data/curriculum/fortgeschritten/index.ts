import type { Module } from '../../../types';
import { javaApi } from './java-api';
import { wrapperKlassen } from './wrapper-klassen';
import { datumZeit } from './datum-zeit';
import { dateien } from './dateien';
import { enums } from './enums';
import { klassendiagramme } from './klassendiagramme';
import { aktivitaetsdiagramme } from './aktivitaetsdiagramme';
import { komparatoren } from './komparatoren';
import { exceptions } from './exceptions';
import { records } from './records';
import { lombok } from './lombok';
import { slf4j } from './slf4j';
import { lambdas } from './lambdas';
import { generics } from './generics';
import { optionals } from './optionals';
import { streamApi } from './stream-api';
import { ioStreams } from './io-streams';

export const fortgeschrittenModule: Module = {
  id: 'fortgeschritten',
  title: 'Fortgeschrittenes Java',
  description: 'Erweiterte Java-Konzepte: Von der API über Lambdas bis zur Stream API.',
  icon: 'Cpu',
  color: 'text-accent-cyan',
  topics: [javaApi, wrapperKlassen, datumZeit, dateien, enums, klassendiagramme, aktivitaetsdiagramme, komparatoren, exceptions, records, lombok, slf4j, lambdas, generics, optionals, streamApi, ioStreams],
};
