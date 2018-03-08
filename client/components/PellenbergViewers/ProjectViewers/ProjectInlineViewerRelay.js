
import {graphql, createFragmentContainer} from 'react-relay';

import ProjectInlineViewer from './ProjectInlineViewer';

export default createFragmentContainer(
  ProjectInlineViewer,
  grapqhl`
    fragment ProjectInlineViewer_item on Project {
      cuid
      name
      begin_period
      end_period
    }
  `
)
