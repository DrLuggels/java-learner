# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Java Mastery is a German-language interactive Java learning platform (React SPA) for university exam preparation ("Klausurvorbereitung Programmierung I"). All UI text is in German. It runs entirely client-side with no backend.

## Commands

- `npm run dev` — Start Vite dev server (localhost:5173)
- `npm run build` — Production build to `/dist`
- `npm run lint` — ESLint
- `npm run preview` — Preview production build locally

There are no tests configured in this project.

## Architecture

**Stack:** React 19 + Vite 7 + Tailwind CSS 4 + React Router 7 (HashRouter) + Prism.js

**Routing** uses `HashRouter` (hash-based URLs). Routes defined in `src/App.jsx`:
- `/` — Dashboard (module overview + progress)
- `/modul/:id` — Module detail (theory + quiz)
- `/klausur` — Exam simulation (30 weighted random questions)
- `/schwaechen` — Weakness training (retry incorrectly answered questions)
- `/playground` — Free-form Java code editor with in-browser execution

**Data layer** (`src/data/`): All content is static JS — 12 modules of questions and theory, no API calls. Modules have relevance levels (KRITISCH 4x, HOCH 2x, MITTEL 1x) used for exam question weighting.

**State persistence** is localStorage-based via two custom hooks:
- `useProgress` — Per-module quiz scores and per-question results
- `useWeakness` — Tracks failed questions; removes them after 2 consecutive correct answers (correctStreak)

**Java transpiler** (`src/utils/javaRunner.js`): A regex-based Java-to-JavaScript transpiler that enables in-browser execution of a Java subset. It handles type declarations, `System.out.println`, array syntax, casts, integer division, char arithmetic, and basic String methods. The transpiled code runs via `new Function()`. This is the most complex utility in the project — changes here require careful testing against the playground and quiz code questions.

**Question types:** Multiple choice (`mc`) with 4 options, and text input (`text`) with case-insensitive matching. Questions can include `code` blocks and interactive mini-playgrounds.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on push to `main`. The Vite base path is `/java-learner/` (configured in `vite.config.js`).
