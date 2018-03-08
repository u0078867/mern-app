
import {graphql, createFragmentContainer} from 'react-relay';

import SoftwareInlineViewer from './SoftwareInlineViewer';

export default createFragmentContainer(
  SoftwareInlineViewer,
  grapqhl`
    fragment SoftwareViewer_item on SWTool {
      cuid
      name
      version
    }
  `
)
