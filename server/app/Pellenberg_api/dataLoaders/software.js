
import { createLoader } from './entity';
import { getSWTools } from '../dataServices/swtool.service';


export const softwareLoader = createLoader(getSWTools);
