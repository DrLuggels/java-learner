import type { Module, Topic } from '../../types';
import { grundlagenModule } from './grundlagen';
import { kontrollstrukturenModule } from './kontrollstrukturen';
import { datenstrukturenModule } from './datenstrukturen';
import { oopModule } from './oop';
import { fortgeschrittenModule } from './fortgeschritten';
import { frameworksModule } from './frameworks';

export const modules: Module[] = [
  grundlagenModule,
  kontrollstrukturenModule,
  datenstrukturenModule,
  oopModule,
  fortgeschrittenModule,
  frameworksModule,
];

export function getAllTopics(): Topic[] {
  return modules.flatMap(m => m.topics);
}

export function getTopicById(id: string): Topic | undefined {
  return getAllTopics().find(t => t.id === id);
}

export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

export function getTopicsByModule(moduleId: string): Topic[] {
  return modules.find(m => m.id === moduleId)?.topics ?? [];
}
