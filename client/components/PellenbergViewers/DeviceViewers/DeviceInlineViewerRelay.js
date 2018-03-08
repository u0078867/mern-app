
import {graphql, createFragmentContainer} from 'react-relay';

import DeviceInlineViewer from './DeviceInlineViewer';

export default createFragmentContainer(
  DeviceInlineViewer,
  grapqhl`
    fragment DeviceInlineViewer_item on Device {
      cuid
      name
      producer
    }
  `
)
