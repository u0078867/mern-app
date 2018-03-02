

import DeviceViewers from './DeviceViewers';
import ResearcherViewers from './ResearcherViewers';
import SoftwareViewers from './SoftwareViewers';
import SubjectViewers from './SubjectViewers';
import ProjectViewers from './ProjectViewers';
import PublicationViewers from './PublicationViewers';
import ActivityViewers from './ActivityViewers';


module.exports = function() {

  return {
    "devices": DeviceViewers,
    "researchers": ResearcherViewers,
    "swtools": SoftwareViewers,
    "subjects": SubjectViewers,
    "projects": ProjectViewers,
    "publications": PublicationViewers,
    "activities": ActivityViewers,
  };

}
