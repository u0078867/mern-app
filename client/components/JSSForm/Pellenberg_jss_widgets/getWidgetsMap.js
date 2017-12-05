
import ResearcherSearch from './ResearcherSearch';
import SubjectSearch from './SubjectSearch';
import DeviceSearch from './DeviceSearch';
import ProjectSearch from './ProjectSearch';
import PublicationSearch from './PublicationSearch';
import SWToolSearch from './SWToolSearch';
import OutputSearch from './OutputSearch';
import CamCapture from './CamCapture';
import FormDataFiller from './FormDataFiller';
import TextCache from './TextCache';
import CuidGenerator from './CuidGenerator';
import CurrentDateTimeWidget from './CurrentDateTimeWidget';

module.exports = function() {

  return {
    "researcher": ResearcherSearch,
    "subject": SubjectSearch,
    "device": DeviceSearch,
    "project": ProjectSearch,
    "publication": PublicationSearch,
    "software": SWToolSearch,
    "output": OutputSearch,
    "cam-capture": CamCapture,
    "form-filler": FormDataFiller,
    "text-cache": TextCache,
    "cuid": CuidGenerator,
    "curr-datetime": CurrentDateTimeWidget,
  };

}
