import React from 'react';

import {
  Table as MaterialTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { withState } from 'recompose';

const renderColumnContent = (column) => {
  if (!column.header) {
    return null;
  }

  if (column.header.label) {
    return (
      <span>{column.header.label}</span>
    );
  }

  if (column.header.icon) {
    return (
      <IconButton>
        <FontIcon
          className="material-icons"
          children={column.header.icon}
          color={column.header.color ? column.header.color : '#000'}
        />
      </IconButton>
    );
  }
}

const renderRowContent = (row, column, updateTable ) => {
  const value = row[column.property];

  if (column.type === 'icon') {
    const onClick = column.onClick || row.onClick || null
    return (
      <IconButton onTouchTap={(e) => onClick ? onClick( e, row.id, row, updateTable ) : ''}>
        <FontIcon
          className="material-icons"
          children={value}
          color={column.color ? column.color : '#000'}
        />
      </IconButton>
    );
  }

  if (column.type === 'image') {
    return (
      <img src={value} style={styles.rowImage} />
    );
  }

  if (column.type === 'link') {
    return (
      <a href={value} style={styles.link}>{value}</a>
    );
  }

  return (
    <span>{value}</span>
  );
};

const Column = ({ columns, row, updateTable }) =>
  <TableRow
    key={row.id}
    style={styles.tableRow}
  >
    { columns.map( ( column ) => (
      <TableRowColumn
        key={`${column.property}-${row.id}`}
        style={column.type === 'icon' ? styles.tableRowColumnIcon : styles.tableRowColumn}
      >
        {renderRowContent(row, column, updateTable )}
      </TableRowColumn>) ) }
  </TableRow>

const TableHOC = withState('mode', 'updateTable', {})
const Table = TableHOC( ({ columns, rows, mode, displaySelectAll = true, adjustForCheckbox = true, showCheckbox = true, style, wrapperStyle, Editor, editorProps, updateTable, ...props }) => (
  <MaterialTable
    selectable={showCheckbox}
    style={{ ...styles.table, ...style }}
    wrapperStyle={{ ...styles.tableWrapper, ...wrapperStyle }}
  >
    <TableHeader
      style={styles.tableHeader}
      adjustForCheckbox={false}
      displaySelectAll={displaySelectAll && showCheckbox}
    >
      <TableRow style={styles.tableHeaderRow}>
        {showCheckbox ?
          <TableHeaderColumn style={styles.tableHeaderColumnCheckbox} /> : null
        }

        { columns.map( (column) => (
          <TableHeaderColumn
            key={ column }
            style={ column.type === 'icon' ? styles.tableHeaderColumnIcon : styles.tableHeaderColumn }
          >
            {renderColumnContent(column)}
          </TableHeaderColumn>
        ) ) }
      </TableRow>
    </TableHeader>
    <TableBody
      style={styles.tableBody}
      displayRowCheckbox={showCheckbox}
      stripedRows={true}
    >
      { rows.map((row, key) => (
        mode.editing && (mode.row.id==row.id) ?
          <Editor key={key} columns={ columns }
                  row={ row }
                  {...editorProps}
                  udpateTable={ updateTable }
                  /> :
          <Column key={key} columns={ columns } row={ row } updateTable={ updateTable } />
      ) ) }
    </TableBody>
  </MaterialTable>
) )

const styles = {
  table: {
    width: '100%',
  },
  tableWrapper: {
    border: '1px solid #EDEDED',
    borderRadius: 5,
  },
  tableHeader: {
    backgroundColor: '#F9F9F9',
    //border: '1px solid #EEEEEE',
    padding: 0,
    textAlign: 'left',
    //fontFamily: 'Montserrat',
  },
  tableHeaderRow: {
    height: 38,
  },
  tableHeaderColumn: {
    border: '1px solid #ECECEC',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    textTransform: 'uppercase',
    height: 'initial',
  },
  tableHeaderColumnIcon: {
    border: '1px solid #ECECEC',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    textTransform: 'uppercase',
    height: 'initial',
    width: 40,
  },
  tableHeaderColumnCheckbox: {
    border: '1px solid #ECECEC',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 'initial',
    width: 23,
  },
  tableBody: {
    //border: '1px solid #EEEEEE',
    borderWidthTop: 0,
    //fontFamily: 'Montserrat',
  },
  tableRow: {
  },
  tableRowColumn: {
    border: '1px solid #ECECEC',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  tableRowColumnIcon: {
    border: '1px solid #ECECEC',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 40,
  },
  rowImage: {
    height: 45,
    width: 130,
  },
  link: {
    textDecoration: 'none',
    color: '#37A2E6',
  },
};

export default Table;
