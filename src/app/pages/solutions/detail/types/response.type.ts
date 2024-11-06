import { ISolution } from 'app/common/types/models.type';

export interface ISolutionResponse {
  solution: ISolution | null;
  prev: number | null;
  next: number | null;
}
