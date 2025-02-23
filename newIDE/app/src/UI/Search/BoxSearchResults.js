// @flow
import { Trans } from '@lingui/macro';
import * as React from 'react';
import PlaceholderLoader from '../PlaceholderLoader';
import PlaceholderError from '../PlaceholderError';
import ErrorBoundary from '../ErrorBoundary';
import { AutoSizer, Grid } from 'react-virtualized';
import EmptyMessage from '../EmptyMessage';

type Props<SearchItem> = {|
  searchItems: ?Array<SearchItem>,
  renderSearchItem: (item: SearchItem, size: number) => React.Node,
  error: ?Error,
  onRetry: () => void,
  baseSize: number,
  // If true, the grid will take the whole height of the container without scroll,
  // so make sure to limit the number of items to a reasonable number for performance.
  noScroll?: boolean,
  noResultPlaceholder?: React.Node,
|};

const styles = {
  container: { flex: 1 },
  grid: { overflowX: 'hidden' },
};

export const BoxSearchResults = <SearchItem>({
  searchItems,
  renderSearchItem,
  error,
  onRetry,
  baseSize,
  noResultPlaceholder,
  noScroll,
}: Props<SearchItem>) => {
  if (!searchItems) {
    if (!error) return <PlaceholderLoader />;
    else {
      return (
        <PlaceholderError onRetry={onRetry}>
          <Trans>
            Can't load the results. Verify your internet connection or retry
            later.
          </Trans>
        </PlaceholderError>
      );
    }
  } else if (searchItems.length === 0) {
    return (
      noResultPlaceholder || (
        <EmptyMessage>
          <Trans>
            No results returned for your search. Try something else, browse the
            categories or create your object from scratch!
          </Trans>
        </EmptyMessage>
      )
    );
  }

  return (
    <ErrorBoundary>
      <div style={styles.container}>
        <AutoSizer>
          {({ width, height }) => {
            const columnCount = Math.max(Math.floor((width - 5) / baseSize), 1);
            const columnWidth = Math.max(Math.floor(width / columnCount), 30);
            const rowCount = Math.max(
              1,
              Math.ceil(searchItems.length / columnCount)
            );
            const rowHeight = columnWidth; // Square items.
            const gridHeight = noScroll ? rowHeight * rowCount : height;
            const gridWidth = width;

            function cellRenderer({ columnIndex, key, rowIndex, style }) {
              const indexInList = rowIndex * columnCount + columnIndex;
              const searchItem =
                indexInList < searchItems.length
                  ? searchItems[indexInList]
                  : null;

              return (
                <div key={key} style={style}>
                  {searchItem
                    ? renderSearchItem(searchItem, columnWidth)
                    : null}
                </div>
              );
            }

            return (
              <Grid
                width={gridWidth}
                height={gridHeight}
                columnCount={columnCount}
                columnWidth={columnWidth}
                rowHeight={rowHeight}
                rowCount={rowCount}
                cellRenderer={cellRenderer}
                style={styles.grid}
              />
            );
          }}
        </AutoSizer>
      </div>
    </ErrorBoundary>
  );
};
