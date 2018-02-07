
import { createLoader } from './entity';
import { getActivities } from '../dataServices/activity.service';


export const activityLoader = createLoader(getActivities);
