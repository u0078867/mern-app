
import {graphql, createFragmentContainer} from 'react-relay';

import SoftwareViewer from './SoftwareViewer';

export default createFragmentContainer(
  SoftwareViewer,
  grapqhl`
    fragment SoftwareViewer_item on SWTool {
      registered_by
      date_added
      cuid
      name
      version
      producer
      uri
    }
  `
)
