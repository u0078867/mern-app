
import {graphql, createFragmentContainer} from 'react-relay';

import SubjectViewer from './SubjectViewer';

export default createFragmentContainer(
  SubjectViewer,
  grapqhl`
    fragment SubjectViewer_item on Subject {
      registered_by
      date_added
      cuid
      hospital_id
    }
  `
)
