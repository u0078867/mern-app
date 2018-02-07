

import DeviceViewer from './DeviceViewer';
import ResearcherViewer from './ResearcherViewer';
import SoftwareViewer from './SoftwareViewer';
import SubjectViewer from './SubjectViewer';
import ProjectViewer from './ProjectViewer';
import PublicationViewer from './PublicationViewer';
import ActivityViewer from './ActivityViewer';


module.exports = function() {

  return {
    "devices": DeviceViewer,
    "researchers": ResearcherViewer,
    "swtools": SoftwareViewer,
    "subjects": SubjectViewer,
    "projects": ProjectViewer,
    "publications": PublicationViewer,
    "activities": ActivityViewer,
  };

}
