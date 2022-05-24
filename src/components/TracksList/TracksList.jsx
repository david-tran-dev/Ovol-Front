import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './tracksList.scss';
import { Grid } from '@mui/material';
import TrackCard from '../TrackCard/TrackCard';
import Filters from '../Filters/Filters';

function TracksList({
  className,
  trackFilterList,
  liftOffList,
  isFiltersActive,
  tracksList,
  onFilterChange,
  onResetFilter,
  onActiveNav,
  ...rest
}) {
  useEffect(() => {
    onActiveNav(true);
  }, []);

  return (
    <>
      {isFiltersActive
        ? (
          <Filters
            tracksList={tracksList}
            onFilterChange={onFilterChange}
            onResetFilter={onResetFilter}
          />
        )
        : null}
      <main
        className={`trackslist ${className}`}
        {...rest}
      >
        <Grid container spacing={2}>

          {trackFilterList.length !== 0 && trackFilterList.map(({
            id,
            difficulty,
            mountain,
            name,
            positive_elevation,
            overall_length,
            img_card,
            liftOff_id,
            duration,
          }) => {
            const liftOffFound = liftOffList.find((liftOff) => liftOff.id === liftOff_id);
            console.log('liftOffFound:', liftOffFound);
            return (
              <Grid item key={id} xs={12} sm={6} md={6} lg={4}>
                <TrackCard
                  difficulty={difficulty}
                  mountain={mountain}
                  name={name}
                  positive_elevation={positive_elevation}
                  overall_length={overall_length}
                  id={id}
                  img_card={img_card}
                  duration={duration}
                  favorableWind={liftOffFound && liftOffFound.favorableWind}
                />
              </Grid>
            );
          })}

        </Grid>
      </main>
    </>
  );
}

TracksList.propTypes = {
  className: PropTypes.string,
  trackFilterList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      difficulty: PropTypes.string.isRequired,
      mountain: PropTypes.string.isRequired,
      positive_elevation: PropTypes.number.isRequired,
      overall_length: PropTypes.number.isRequired,
      img_card: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    }),
  ).isRequired,
  liftOffList: PropTypes.array.isRequired,
  isFiltersActive: PropTypes.bool.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  tracksList: PropTypes.array,
  onResetFilter: PropTypes.func.isRequired,
  onActiveNav: PropTypes.func.isRequired,
};
TracksList.defaultProps = {
  className: '',
  tracksList: [],
};
export default React.memo(TracksList);
