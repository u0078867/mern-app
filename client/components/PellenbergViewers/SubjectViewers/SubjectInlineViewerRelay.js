
import {graphql, createFragmentContainer} from 'react-relay';

import SubjectInlineViewer from './SubjectInlineViewer';

export default createFragmentContainer(
  SubjectInlineViewer,
  grapqhl`
    fragment SubjectInlineViewer_item on Subject {
      cuid
      hospital_id
    }
  `
)
