
import { createLoader } from './entity';
import { getPublications } from '../dataServices/publication.service';


export const publicationLoader = createLoader(getPublications);
