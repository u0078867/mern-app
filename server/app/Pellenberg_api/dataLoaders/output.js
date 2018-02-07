
import { createLoader } from './entity';
import { getOutputs } from '../dataServices/output.service';


export const outputLoader = createLoader(getOutputs);
