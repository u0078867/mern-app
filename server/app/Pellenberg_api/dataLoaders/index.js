
import { activityLoader } from './activity';
import { deviceLoader } from './device';
import { outputLoader } from './output';
import { projectLoader } from './project';
import { publicationLoader } from './publication';
import { researcherLoader } from './researcher';
import { softwareLoader } from './software';
import { subjectLoader } from './subject';

export function createLoaders() {
  return {
    activity: activityLoader,
    device: deviceLoader,
    output: outputLoader,
    project: projectLoader,
    publication: publicationLoader,
    researcher: researcherLoader,
    software: softwareLoader,
    subject: subjectLoader,
  }
}
