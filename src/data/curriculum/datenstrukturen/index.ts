import type { Module } from '../../../types';
import { arrays } from './arrays';
import { arraylists } from './arraylists';
import { listen } from './listen';
import { maps } from './maps';
import { baeume } from './baeume';

export const datenstrukturenModule: Module = {
  id: 'datenstrukturen',
  title: 'Datenstrukturen',
  description: 'Lerne verschiedene Arten Daten zu organisieren und effizient zu verwalten.',
  icon: 'Boxes',
  color: 'text-accent-orange',
  topics: [arrays, arraylists, listen, maps, baeume],
};
