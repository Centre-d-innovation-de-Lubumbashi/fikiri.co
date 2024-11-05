import { ISolution } from '@core/types/models.type';

export interface ISolutionResponse {
  solution: ISolution | null;
  prev: number | null;
  next: number | null;
}
