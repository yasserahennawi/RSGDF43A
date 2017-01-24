import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';

import InputField from 'components/utils/InputField';
import SelectField from 'components/utils/SelectField';
import Button from 'components/utils/Button';
import Table from 'components/utils/Table';

import IngredientUnitSelectField from 'components/products/IngredientUnitSelectField';
import IngredientSelectField from 'components/products/IngredientSelectField';

const icon = 'edit'
const flatIngredient = ({ ingredient, ...rest }) => ({ ingredient: ingredient.name, icon, ...rest, src: { ingredient, ...rest } })
const toggleRowEdition = (row) => Object.assign( row, { editing: !row.editing } )

const ingredientsRows = ({ rows, ingredients }) => ingredients.edges.map( ( edge ) => flatIngredient( edge.node ) )
const columns = [
  {
    property: 'amount',
    header: {
      label: 'Amount',
    },
  },
  {
    property: 'unit',
    header: {
      label: 'Unit',
    },
  },
  {
    property: 'ingredient',
    header: {
      label: 'Ingredient',
    },
  },
  {
    property: 'addition',
    header: {
      label: 'Addition',
    },
  },
  {
    property: 'icon',
    type: 'icon',
    header: {
      label: 'Actions',
    },
    onClick: (e, rowId, row, updateTable ) => updateTable({
      editing: toggleRowEdition( row ).editing,
      row,
    }),
  },
]

const IngredientList = ({ rows, Editor, editorProps, ingredients }) => (
  <div style={styles.container}>
    <Table
      displaySelectAll={ false }
      columns={ columns }
      Editor={ Editor }
      editorProps={ editorProps }
      rows={ ingredientsRows({ rows, ingredients }) } />
  </div>
)

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  textField: {
    width: '100%',
  },
  select: {
    marginLeft: 30,
  },
  formActions: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default IngredientList;
