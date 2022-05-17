import { GeneralApiProblem } from './api-problem';
import { Character } from '@stores/character/types';

export type GetCharactersResult =
  | { kind: 'ok'; data: Character[] }
  | GeneralApiProblem;
