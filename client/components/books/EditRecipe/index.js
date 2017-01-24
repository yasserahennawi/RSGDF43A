import React, { Component } from 'react';
import Relay from 'react-relay';
import {css, style} from 'glamor';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import MenuItem from 'material-ui/MenuItem';

import InputField from 'components/utils/InputField';
import SelectField from 'components/utils/SelectField';
import Button from 'components/utils/Button';

import AddIngredient from 'components/products/AddIngredient';
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete'
import AutoComplete from 'material-ui/AutoComplete'

const dataSourceConfig = {
  text: 'name',
  value: 'id'
}

class EditRecipe extends Component {
  state = {
    isSubmitButtonValid: false,
    genres: [],
  };

  toggleValidForm = (valid) => {
    return () => {
      this.setState({
        isSubmitButtonValid: valid,
      });
    };
  };

  handleSelectOrientation = (orientation) => {
    this.setState({
      orientation: {
        text: orientation.name,
        key: orientation
      }
    })
  }

  submitForm = (data) => {
    const { onSubmit } = this.props;

    onSubmit( data );
  };

  renderDifficultyLevels = () => {
    let options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(
        <MenuItem
          value={i}
          key={i}
          primaryText={i}
        />
      );
    }

    return options;
  };

  getOrientations() {
    return this.props.nutritions.edges.map(edge => edge.node);
  }

  renderOrientation() {
    return this.getOrientations().map(orientation =>
      <MenuItem
        value={ orientation.id }
        key={ orientation.id }
        primaryText={ orientation.name }
      />
    );
  }

  renderPreparationTime = () => {
    let times = [];
    for (let i = 1; i <= 12; i++) {
      const value = i * 5;

      times.push(
        <MenuItem
          value={value}
          key={value}
          primaryText={`${value} min`}
        />
      );
    }

    return times;
  };

  render() {
    const {
      genres,
    } = this.state;

    const { handleChangeStep } = this.props;
    return (
      <div style={styles.container}>
        <Formsy.Form
          onValid={this.toggleValidForm(true)}
          onInvalid={this.toggleValidForm(false)}
          onValidSubmit={this.submitForm}
          ref="formEditRecept"
        >
          <div style={{paddingRight: 52}}>
            <InputField
              name="name"
              hintText="Uberschrift"
              floatingLabelText="Name des Rezeptes eingeben"
              formsy
              validations="isExisty"
              validationError={errorMessage}
              required={true}
              style={{ ...styles.textField }}
              value={ this.props.recipe.name }
            />
          </div>

          <div className={`${formDivisor}`}>
            <SelectField
              name="difficulity"
              floatingLabelText="Schwierigkeit"
              formsy
              validations="isExisty"
              validationError={errorMessage}
              required={true}
              value={ this.props.recipe.difficulity }
            >
              {this.renderDifficultyLevels()}
            </SelectField>

            <InputField
              name="calories"
              formsy
              hintText="Kalorien"
              floatingLabelText="Kalorien"
              style={styles.textField}
              validations="isNumeric"
              validationError={errorMessage}
              required={true}
              value={ this.props.recipe.calories }
            />

            <SelectField
              name="preparationTimeMin"
              floatingLabelText="Zubereitungszeit"
              formsy
              validations="isNumeric"
              validationError={errorMessage}
              required={true}
              style={styles.select}
              value={ this.props.recipe.preparationTimeMin }
            >
              {this.renderPreparationTime()}
            </SelectField>
          </div>

          <div className={`${formDivisor}`}>
            <InputField
              name="nutrition_name"
              disabled
              floatingLabelText="Ernährungsart"
              formsy
              value={ this.props.product.nutrition.name }
              required={false}
              style={styles.textField}
            />

            <SelectField
              name="orientation"
              floatingLabelText="Hauptrichtung"
              hintText="Hauptrichtung"
              formsy
              validations="isExisty"
              validationError={errorMessage}
              required={true}
              value={ this.props.recipe.orientation }
            >
              {this.renderOrientation()}
            </SelectField>

          </div>

          {/*<TypeSelectField
            name="type"
            formsy
            validations="isExisty"
            validationError={errorMessage}
            required={true}
          />*/}

          <AddIngredient
            viewer={ this.props.viewer }
            recipe={ this.props.recipe }
            onAddIngredient={ this.props.onAddIngredient }
            onUpdateIngredient={ this.props.onUpdateIngredient }
            onRemoveIngredient={ this.props.onRemoveIngredient } />

          <div className={`${formDivisor}`} style={{ paddingRight: 20 }}>
            <InputField
              name="text"
              floatingLabelText="ZUBEREITUNGSANLEITUNG"
              required={true}
              multiLine={true}
              rows={4}
              style={{ ...styles.textField, height: 100 }}
            />

            <Button
              primary={true}
              label="Add"
              style={{ marginTop: 20, height: 48 }}
            />
          </div>

          <div style={styles.instructions}>
            <ol>
              <li>Den Knoblauch schalen und in kleine Wurfel schneiden.</li>
              <li>Olivenol in der Pfanne erhitzen und die Scampi hinzugeben, diese lasst man nun 3 Minuten auf jeder Seite braten und wurzt sie etwas mit Salz und Pfeffer.</li>
            </ol>
          </div>

          <div style={styles.footer}>
            <div style={styles.receiptNumber}>
              Recipe 1 of 15
            </div>

            <div style={styles.formActions}>
              <Button
                label="Back"
                style={{ marginRight: 10 }}
                onTouchTap={ this.props.handleBack }
              />

              <Button
                primary={true}
                type="submit"
                label="Continue"
              />
            </div>
          </div>
        </Formsy.Form>
      </div>
    );
  }
}

const errorMessage = 'This field should be filled';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    width: '100%',
  },
  select: {
    marginLeft: 30,
  },
  footer: {
    marginTop: 10,
  },
  receiptNumber: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  formActions: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    height: 48,
  },
  instructions: {
    fontSize: 14,
  },
};

const formDivisor = style({
  display: 'flex',
  justifyContent: 'space-between'
});


export default Relay.createContainer(EditRecipe, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        nickName
        ${AddIngredient.getFragment('viewer')}
      }
    `,
    orientations: () => Relay.QL`
      fragment on OrientationConnection {
        edges {
          node {
            id
            name
          }
        }
      }
    `,
    recipe: () => Relay.QL`
      fragment on Recipe {
        name
        difficulity
        calories
        preparationTimeMin
        orientation
        ${AddIngredient.getFragment('recipe')}
      }
    `
  }
});
