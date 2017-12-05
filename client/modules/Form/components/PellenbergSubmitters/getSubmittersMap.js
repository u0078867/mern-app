
import DirectSubmitter from './DirectSubmitter';
import WfVariablesSubmitter from './WfVariablesSubmitter';


module.exports = function() {

  return {
    "direct": DirectSubmitter,
    "wf-variables": WfVariablesSubmitter,
  };

}
