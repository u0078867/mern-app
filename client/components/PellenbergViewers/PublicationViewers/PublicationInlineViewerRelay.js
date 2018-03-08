
import {graphql, createFragmentContainer} from 'react-relay';

import PublicationInlineViewer from './PublicationInlineViewer';

export default createFragmentContainer(
  PublicationInlineViewer,
  grapqhl`
    fragment PublicationInlineViewer_item on Publication {
      cuid
      title
    }
  `
)
