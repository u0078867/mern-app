
import { createLoader } from './entity';
import { getProjects } from '../dataServices/project.service';


export const projectLoader = createLoader(getProjects);
