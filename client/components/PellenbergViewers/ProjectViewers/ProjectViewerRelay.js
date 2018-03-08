
import {graphql, createFragmentContainer} from 'react-relay';

import ProjectViewer from './ProjectViewer';

export default createFragmentContainer(
  ProjectViewer,
  grapqhl`
    fragment ProjectViewer_item on Project {
      registered_by
      date_added
      cuid
      name
      description
      begin_period
      end_period
      uri
    }
  `
)
