
import {graphql, createFragmentContainer} from 'react-relay';

import ResearcherInlineViewer from './ResearcherInlineViewer';

export default createFragmentContainer(
  ResearcherInlineViewer,
  grapqhl`
    fragment ResearcherInlineViewer_item on Researcher {
      cuid
      name
      surname
    }
  `
)
