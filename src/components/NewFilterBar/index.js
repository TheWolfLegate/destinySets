import React from 'react';

import {
  HUNTER,
  TITAN,
  WARLOCK,
  FILTER_SHOW_COLLECTED,
  FILTER_SHOW_PS4_EXCLUSIVES
} from 'app/lib/destinyEnums';

import styles from './styles.styl';

const FILTER_NAMES = {
  [HUNTER]: 'Hunter',
  [TITAN]: 'Titan',
  [WARLOCK]: 'Warlock',
  [FILTER_SHOW_COLLECTED]: 'Collected items',
  [FILTER_SHOW_PS4_EXCLUSIVES]: 'PS4 Exclusives'
};

export default function FilterBar({ filters, toggleFilter }) {
  return (
    <div className={styles.root}>
      {Object.keys(filters).map(key => (
        <label key={key} className={styles.filterItem}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={filters[key]}
            onChange={() => toggleFilter(key)}
          />{' '}
          {FILTER_NAMES[key]}
        </label>
      ))}
    </div>
  );
}
