
import { createLoader } from './entity';
import { getResearchers } from '../dataServices/researcher.service';


export const researcherLoader = createLoader(getResearchers);
