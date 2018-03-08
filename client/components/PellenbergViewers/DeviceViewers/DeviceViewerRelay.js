
import {graphql, createFragmentContainer} from 'react-relay';

import DeviceViewer from './DeviceViewer';

export default createFragmentContainer(
  DeviceViewer,
  grapqhl`
    fragment DeviceViewer_item on Device {
      registered_by
      date_added
      cuid
      name
      functions
      producer
      uri
      attributes {
        ... on NumericAttribute {
          name
          numeric_value: value
          uom
        }
        ... on StringAttribute {
          name
          string_value: value
        }
        ... on BooleanAttribute {
          name
          boolean_value: value
        }
        ... on NoValueAttribute {
          name
          uom
        }
      }
    }
  `
)
