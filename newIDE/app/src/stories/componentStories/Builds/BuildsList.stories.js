// @flow

import * as React from 'react';
import { action } from '@storybook/addon-actions';

import muiDecorator from '../../ThemeDecorator';
import paperDecorator from '../../PaperDecorator';

import BuildsList from '../../../Export/Builds/BuildsList';

import {
  erroredCordovaBuild,
  pendingCordovaBuild,
  pendingElectronBuild,
  completeCordovaBuild,
  completeElectronBuild,
  completeWebBuild,
  game1,
  fakeIndieAuthenticatedUser,
} from '../../../fixtures/GDevelopServicesTestData';

export default {
  title: 'Builds/BuildsList',
  component: BuildsList,
  decorators: [paperDecorator, muiDecorator],
};

const buildArray = [
  { ...completeWebBuild, name: 'This is a named build' },
  erroredCordovaBuild,
  pendingCordovaBuild,
  pendingElectronBuild,
  completeCordovaBuild,
  completeElectronBuild,
  completeWebBuild,
];

export const DefaultBuildsList = () => (
  <BuildsList
    builds={buildArray}
    authenticatedUser={fakeIndieAuthenticatedUser}
    error={null}
    loadBuilds={action('loadBuilds')}
    game={game1}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
  />
);

export const ErroredBuildsList = () => (
  <BuildsList
    builds={null}
    authenticatedUser={fakeIndieAuthenticatedUser}
    error={
      new Error(
        'There was an issue getting the game builds, verify your internet connection or try again later.'
      )
    }
    loadBuilds={action('loadBuilds')}
    game={game1}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
  />
);
