
import ResearcherSearch from './ResearcherSearch';
import SubjectSearch from './SubjectSearch';
import DeviceSearch from './DeviceSearch';
import SWToolSearch from './SWToolSearch';
import RawFileWidget from './RawFileWidget';
import OutputSearch from './OutputSearch';
import CamCapture from './CamCapture';
import FormDataFiller from './FormDataFiller';

module.exports = function() {

  return {
    "researcher": ResearcherSearch,
    "subject": SubjectSearch,
    "device": DeviceSearch,
    "software": SWToolSearch,
    "file": RawFileWidget,
    "output": OutputSearch,
    "cam-capture": CamCapture,
    "form-filler": FormDataFiller,
  };

}
