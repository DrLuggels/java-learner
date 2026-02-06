import type { Module } from '../../../types';
import { verzweigungen } from './verzweigungen';
import { schleifen } from './schleifen';

export const kontrollstrukturenModule: Module = {
  id: 'kontrollstrukturen',
  title: 'Kontrollstrukturen',
  description: 'Steuere den Programmablauf mit Verzweigungen und Schleifen.',
  icon: 'GitBranch',
  color: 'text-accent-green',
  topics: [verzweigungen, schleifen],
};
