import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './SubmListItem.css';

function SubmListItem(props) {
  return (
    <div className={styles['single-subm']}>
      <h3 className={styles['subm-title']}>
        <Link to={`/subms/${props.subm.slug}-${props.subm.cuid}`} >
          {`${props.subm.form.title} (created: ${props.subm.date_added})`}
        </Link>
      </h3>
      <p className={styles['subm-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteSubm" /></a></p>
      <p className={styles['subm-action']}><a href="#" onClick={props.onAccept}><FormattedMessage id="acceptSubm" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

SubmListItem.propTypes = {
  subm: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default SubmListItem;
