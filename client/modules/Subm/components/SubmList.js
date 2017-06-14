import React, { PropTypes } from 'react';

// Import Components
import SubmListItem from './SubmListItem/SubmListItem';

function SubmList(props) {
  return (
    <div className="listView">
      {
        props.subms.map(subm => (
          <SubmListItem
            subm={subm}
            key={subm.cuid}
            onDelete={() => props.handleDeleteSubm(subm.cuid)}
            onAccept={() => props.handleAcceptSubm(subm)}
          />
        ))
      }
    </div>
  );
}

SubmList.propTypes = {
  subms: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteSubm: PropTypes.func.isRequired,
  handleAcceptSubm: PropTypes.func.isRequired,
};

export default SubmList;
