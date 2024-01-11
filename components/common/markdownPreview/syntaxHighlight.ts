import autohotkey from 'refractor/lang/autohotkey';
import bash from './prismLanguages/bash';
import cpp from 'refractor/lang/cpp';
import csharp from 'refractor/lang/csharp';
import css from 'refractor/lang/css';
import cssExtras from 'refractor/lang/css-extras';
import dart from 'refractor/lang/dart';
import fsharp from 'refractor/lang/fsharp';
import go from 'refractor/lang/go';
import groovy from 'refractor/lang/groovy';
import ini from 'refractor/lang/ini';
import java from 'refractor/lang/java';
import javascript from 'refractor/lang/javascript';
import jsExtras from 'refractor/lang/js-extras';
import json from 'refractor/lang/json';
import jsx from 'refractor/lang/jsx';
import kotlin from 'refractor/lang/kotlin';
import kusto from 'refractor/lang/kusto';
import markdown from 'refractor/lang/markdown';
import objectivec from 'refractor/lang/objectivec';
import perl from 'refractor/lang/perl';
import php from 'refractor/lang/php';
import powershell from 'refractor/lang/powershell';
import python from 'refractor/lang/python';
import r from 'refractor/lang/r';
import { refractor } from 'refractor/lib/core';
import ruby from 'refractor/lang/ruby';
import rust from 'refractor/lang/rust';
import scala from 'refractor/lang/scala';
import sql from 'refractor/lang/sql';
import swift from 'refractor/lang/swift';
import typescript from 'refractor/lang/typescript';

[
  autohotkey,
  bash,
  cpp,
  csharp,
  css,
  cssExtras,
  dart,
  fsharp,
  go,
  groovy,
  ini,
  java,
  javascript,
  jsExtras,
  json,
  jsx,
  kotlin,
  kusto,
  markdown,
  objectivec,
  perl,
  php,
  powershell,
  python,
  r,
  ruby,
  rust,
  scala,
  sql,
  swift,
  typescript,
].forEach(x => refractor.register(x));

refractor.alias({ jsx: ['js'] });
refractor.alias({ autohotkey: ['ahk'] });


export function highlight(value: string, language: string) {
  return refractor.highlight(value, language);
}

export function canHighlight(language: string) {
  return refractor.registered(language);
}
