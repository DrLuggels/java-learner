import type { Module } from '../../../types';
import { oopKonzepte } from './oop-konzepte';
import { klassen } from './klassen';
import { referenzenObjekte } from './referenzen-objekte';
import { vererbung } from './vererbung';
import { polymorphie } from './polymorphie';
import { objectKlasse } from './object-klasse';
import { abstraktFinal } from './abstrakt-final';
import { interfaces } from './interfaces';
import { innereKlassen } from './innere-klassen';

export const oopModule: Module = {
  id: 'oop',
  title: 'Objektorientierte Programmierung',
  description: 'Meistere die vier Säulen der OOP: Kapselung, Abstraktion, Vererbung und Polymorphie.',
  icon: 'GraduationCap',
  color: 'text-accent-purple',
  topics: [oopKonzepte, klassen, referenzenObjekte, vererbung, polymorphie, objectKlasse, abstraktFinal, interfaces, innereKlassen],
};
