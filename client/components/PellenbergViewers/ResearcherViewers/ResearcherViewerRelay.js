
import {graphql, createFragmentContainer} from 'react-relay';

import ResearcherViewer from './ResearcherViewer';

export default createFragmentContainer(
  ResearcherViewer,
  grapqhl`
    fragment ResearcherViewer_item on Researcher {
      date_added
      cuid
      name
      surname
      birthdate
      institution_id
    }
  `
)
