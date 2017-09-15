
import Researcher from './Researcher';
import ResearcherSearch from './ResearcherSearch';
import SampleSearch from './SampleSearch';
import CamCapture from './CamCapture';
import FormDataFiller from './FormDataFiller';
import SelectCreatable from './SelectCreatable';
import CuidGenerator from './CuidGenerator';

module.exports = function() {

  return {
    "researcher": Researcher,
    "researcher-search": ResearcherSearch,
    "sample-search": SampleSearch,
    "cam-capture": CamCapture,
    "form-filler": FormDataFiller,
    "select-creatable": SelectCreatable,
    "cuid": CuidGenerator,
  };

}
