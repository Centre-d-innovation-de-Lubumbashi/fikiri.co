import { ISolution } from 'app/common/types/models.type';

export default interface ISolutionsReponse {
  solutions: ISolution[];
  count: number;
}
