export type { GenData, ModelData, BrandData } from './car-data-eu';

import { europeanBrands } from './car-data-eu';
import { asianBrands } from './car-data-asian';
import { chineseBrands } from './car-data-cn';
import { otherBrands } from './car-data-other';
import { extraBrands } from './car-data-extra';
import { truckBusBrands } from './car-data-trucks-buses';
import { minibusBrands } from './car-data-minibuses';

export const allBrands = [
  ...europeanBrands,
  ...asianBrands,
  ...chineseBrands,
  ...otherBrands,
  ...extraBrands,
  ...truckBusBrands,
  ...minibusBrands,
];
