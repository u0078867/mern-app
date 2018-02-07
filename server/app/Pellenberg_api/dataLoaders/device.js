
import { createLoader } from './entity';
import { getDevices } from '../dataServices/device.service';


export const deviceLoader = createLoader(getDevices);
