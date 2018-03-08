
import {graphql, createFragmentContainer} from 'react-relay';

import PublicationViewer from './PublicationViewer';

export default createFragmentContainer(
  PublicationViewer,
  grapqhl`
    fragment ProjectViewer_item on Publication {
      registered_by
      date_added
      cuid
      title
      uri
    }
  `
)
