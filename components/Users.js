import React, { useState, useCallback, Component } from 'react';
import { Page, Link, Card, DataTable } from '@shopify/polaris';

export default function Users(props) {

  const [sortedRows, setSortedRows] = useState(null);

  var formatted = {
    rows: []
  };

  var newRows = props.jsonResponse.data.map((row) => {
    formatted.rows.push([
      row.firstname,
      row.lastname
    ])
  })

  const rows = sortedRows ? sortedRows : formatted.rows;
  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
    [rows],
  );

  return (
    <Page title="Users List">
      <h1>{props.greeting}</h1>

      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'text'
          ]}
          headings={[
            'First Name',
            'Last Name'
          ]}
          rows={rows}
          totals={['', '', '']}
          sortable={[false, false, true ]}
          defaultSortDirection="descending"
          initialSortColumnIndex={4}
          onSort={handleSort}
          footerContent={`Showing ${rows.length} of ${rows.length} results`}
        />
      </Card>

    </Page>
  );

  function sortCurrency(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index].substring(1));
      const amountB = parseFloat(rowB[index].substring(1));
      return direction === 'descending' ? amountB - amountA : amountA - amountB;
    });
  }


}