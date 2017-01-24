import React, { Component } from 'react';
import Relay from 'react-relay';
import {css, style} from 'glamor';

import InputField from 'components/utils/InputField';
import Button from 'components/utils/Button';

import IngredientUnitSelectField from 'components/products/IngredientUnitSelectField';
import IngredientSelectField from 'components/products/IngredientSelectField';
import IngredientList from 'components/products/IngredientList';
import { compose, withState, withHandlers } from 'recompose'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const ingredientText = ( ingredient ) => ingredient? ingredient.name : ''

const formIngredientRequirements = [ 'amount', 'unit', 'ingredient']
const formIsValid = ( form ) => formIngredientRequirements.reduce( (v, s) => v && form[ s ], true )
const FormHOC = compose(
  withState('form', 'updateForm', {}),
  withHandlers({
    handleAmount: ({ form, updateForm }) => ( event ) => {
      updateForm({
        ...form,
        amount: event.target.value
      })
    },
    handleUnit: ({ form, updateForm }) => ( evnet, key, payload ) =>
      updateForm({
        ...form,
        unit: key
      }),
    handleIngredient: ({ form, updateForm }) => ( ingredient ) => {
      updateForm({
        ...form,
        ingredient
      })
    },
    handleAddition: ({ form, updateForm }) => ( ingredient ) => {
      updateForm({
        ...form,
        addition: ingredient.name,
      })
    },
    handleAdditionInput: ({ form, updateForm }) => ( searchTerms ) => {
      updateForm({
        ...form,
        addition: searchTerms
      })
    },
    handleAddIngredient: ({ form, handler, data = {} }) => () => {
      let isValid = true
      const theValue = ( state ) => form[state] || data[state]
      const valid = ( state ) => {
        const value = theValue( state )
        isValid = isValid && value
        return value || { }
      }

      const payload = {
        id: data.id,
        amount: valid( 'amount' ),
        unit: valid( 'unit' ),
        ingredient: valid( 'ingredient' ).id,
        addition: theValue( 'addition' ),
      }

      if ( isValid ) {
        handler( payload )
      }
    },
    isAddButtonValid: ({ form, data }) => () => formIsValid( { ...data, ...form }  )
  })
)

const IngredientForm = FormHOC( ({
  viewer,
  handleAmount,
  handleUnit,
  handleIngredient,
  handleAddition,
  handleAdditionInput,
  handleAddIngredient,
  isAddButtonValid,
  data = {}
}) => console.log( 'data ', data ) || (
  <div className={`${formDivisor}`}>
    <InputField
      name="amount"
      formsy
      hintText="Menge"
      floatingLabelText="Menge"
      style={styles.textField}
      onChange={ handleAmount }
      value={ data.amount }
    />

    <IngredientUnitSelectField
      onChange={ handleUnit }
      value={ data.unit }
    />

    <IngredientSelectField
      viewer={ viewer }
      floatingLabelText="Zutat"
      name="auto-zutat"
      onSelect={ handleIngredient }
      value={ ingredientText( data.ingredient ) }
    />

    <IngredientSelectField
      viewer={ viewer }
      floatingLabelText="Zusatz"
      name="auto-zutatz"
      onSelect={ handleAddition }
      onUpdateInput={ handleAdditionInput }
      value={ data.addition || '' }
    />

    <div style={styles.formActions}>
      <Button
        primary={true}
        label="Hinzufugen"
        buttonStyle={styles.button}
        disabled={ !isAddButtonValid() }
        onClick={ handleAddIngredient }
      />
    </div>
  </div> ) )

const wrappHandlerWithRow = ( handler ) => ({ row, updateTable }) => ( data ) => handler( { ...data, id: row.id, row, updateTable } )
const IngredientFormEditor = ({ viewer, handler, otherHandler, row, updateTable }) => (
    <TableRow>
      <TableRowColumn>
        <IngredientForm
          handler={ handler({ row, updateTable }) }
          otherHandler={ otherHandler({ row, updateTable }) }
          viewer={ viewer }
          data={ row.src }
          />
      </TableRowColumn>
    </TableRow>
  )

const AddIngredient = ({ viewer, recipe, onAddIngredient, onUpdateIngredient, onRemoveIngredient }) =>
  <div style={styles.container}>
    <IngredientForm handler={ onAddIngredient } viewer={ viewer } />

    <IngredientList
      viewer={ viewer }
      ingredients={ recipe.ingredients }
      Editor={ IngredientFormEditor }
      editorProps={{
        viewer,
        ingredients: recipe.ingredients.edges,
        handler: wrappHandlerWithRow( onUpdateIngredient ),
        otherHandler: wrappHandlerWithRow( onRemoveIngredient ),
      }}
      />
  </div>

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #EDEDED',
    padding: 30,
    margin: 20,
  },
  textField: {
    width: '100%',
    minWidth: 50,
    margin: '20px 20px 20px 0px',
  },
  button: {
    height: 48,
  },
  select: {
    marginLeft: 30,
  },
  formActions: {
    marginTop: 17,
  },
};

const formDivisor = style({
  display: 'flex',
  justifyContent: 'space-between'
});

export default Relay.createContainer(AddIngredient, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        nickName
      }
    `,
    recipe: () => Relay.QL`
      fragment on Recipe {
        name
        difficulity
        calories
        preparationTimeMin
        orientation
      }
    `
  }
});
