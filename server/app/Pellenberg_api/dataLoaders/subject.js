
import { createLoader } from './entity';
import { getSubjects } from '../dataServices/subject.service';


export const subjectLoader = createLoader(getSubjects);
