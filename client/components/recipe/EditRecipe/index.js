import React from 'react';
import Relay from 'react-relay';
import { css, style } from 'glamor';
import InputField from 'components/utils/InputField';
import SelectField from 'components/utils/SelectField';
import Button from 'components/utils/Button';
import MenuItem from 'material-ui/MenuItem';
import OrientationSelector from './OrientationSelector';
import NutritionSelector from './NutritionSelector';
import * as _ from 'lodash';
import validator from 'validator';
import CreateRecipeMutation from 'mutations/CreateRecipeMutation';
import UpdateRecipeMutation from 'mutations/UpdateRecipeMutation';
import ErrorDetails from 'components/utils/ErrorDetails';
import { isValidationError } from 'helpers/error';

export class EditRecipe extends React.Component {
  getNewRecipe() {
    return {
      name: '',
      difficulity: 1,
      calories: 0,
      preparationTimeMin: 1,
      nutrition: {
        name: '',
      },
      orientation: {
        name: '',
      },
      preparationInstructions: [],
    };
  }

  componentWillMount() {
    this.setState({
      recipe: this.props.recipe || this.getNewRecipe(),
      apiError: null,
      preparationInstruction: '',
    });

    this.validators = {
      name: value => !validator.isEmpty(value),
      difficulity: value => validator.isInt(value.toString()),
      calories: value => validator.isFloat(value.toString()),
      preparationTimeMin: value => validator.isInt(value.toString()),
      nutrition: value => !validator.isEmpty(value),
      orientation: value => !validator.isEmpty(value),
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.recipe !== this.props.recipe) {
      this.setState({
        recipe: nextProps.recipe,
        preparationInstruction: '',
      });
    }
  }

  isValid() {
    return this.validators.name(this.state.recipe.name)
      && this.validators.difficulity(this.state.recipe.difficulity)
      && this.validators.calories(this.state.recipe.calories)
      && this.validators.preparationTimeMin(this.state.recipe.preparationTimeMin)
      && this.validators.nutrition(this.state.recipe.nutrition.name)
      && this.validators.orientation(this.state.recipe.orientation.name);
  }

  onUploadImageSuccess(images) {
    this.onRecipeChange({ coverImage: images[0] });
  }

  onUploadImageError(error) {
    this.setState({ apiError: error })
  }

  createRecipeSuccess({ createRecipe }) {
    this.props.onRecipeCreateSuccess(createRecipe);
    // @TODO hard refresh is not a good idea
    location.reload();
  }

  createRecipeFailure(error) {
    console.log('createRecipeFailure', error);
    this.setState({ apiError: error });
  }

  updateRecipeSuccess({ updateRecipe }) {
    this.props.onRecipeUpdateSuccess(updateRecipe);
  }

  updateRecipeFailure(error) {
    console.log('updateRecipeFailure', error);
    this.setState({ apiError: error });
  }

  submitForm(e) {
    e.preventDefault();
    console.log('going to submit with ', this.state.recipe, this.props.recipe);

    // Recipe already exist then execute the update mutation
    if(this.state.recipe.id) {
      const mutation = new UpdateRecipeMutation({
        ...this.state.recipe,
        recipe: this.props.recipe,
        product: this.props.product,
      });
      this.props.relay.commitUpdate(mutation, {
        onSuccess: this.updateRecipeSuccess.bind(this),
        onFailure: this.updateRecipeFailure.bind(this),
      });
    } else {
      const mutation = new CreateRecipeMutation({
        ...this.state.recipe,
        product: this.props.product,
      });
      this.props.relay.commitUpdate(mutation, {
        onSuccess: this.createRecipeSuccess.bind(this),
        onFailure: this.createRecipeFailure.bind(this),
      });
    }
  }

  onRecipeChange(changes) {
    this.setState({
      recipe: {
        ...this.state.recipe,
        ...changes,
      },
    });
  }

  addPreparationInstruction() {
    this.setState({
      preparationInstruction: "",
      recipe: {
        ...this.state.recipe,
        preparationInstructions: _.uniq([
          ...this.state.recipe.preparationInstructions,
          this.state.preparationInstruction,
        ]),
      },
    });
  }

  render() {
    const { apiError } = this.state;
    return (
      <div style={styles.container}>
        <form onSubmit={this.submitForm.bind(this)}>
          <div style={{ paddingRight: 52 }}>
            <InputField
              name="name"
              validator={this.validators.name}
              validatorMessage={"You must input the title"}
              onChange={e => this.onRecipeChange({ name: e.target.value })}
              value={this.state.recipe.name}
              hintText="Uberschrift"
              floatingLabelText="Name des Rezeptes eingeben"
              style={styles.textField}
            />
          </div>

          <div className={`${formDivisor}`}>
            <SelectField
              name="difficulity"
              validator={this.validators.difficulity}
              validatorMessage={"You must select difficulity"}
              floatingLabelText="REZEPTANZAHL"
              value={this.state.recipe.difficulity}
              onChange={(e, key, value) => this.onRecipeChange({ difficulity: parseInt(value) })}>
              {_.range(5).map(i => (
                <MenuItem key={i} value={i + 1} primaryText={i + 1} />
              ))}
            </SelectField>
            <InputField
              name="calories"
              type="number"
              validator={this.validators.calories}
              validatorMessage={"You must input the calories"}
              onChange={e => this.onRecipeChange({ calories: e.target.value })}
              value={this.state.recipe.calories}
              hintText="Kalorien"
              floatingLabelText="Kalorien"
              style={styles.textField}
            />
            <SelectField
              name="preparationTimeMin"
              validator={this.validators.preparationTimeMin}
              validatorMessage={"You must select preparation time"}
              floatingLabelText="Zubereitungszeit"
              value={this.state.recipe.preparationTimeMin}
              onChange={(e, key, value) => this.onRecipeChange({ preparationTimeMin: parseInt(value) })}>
              {_.range(12).map(i => (
                <MenuItem key={i} value={(i + 1) * 5} primaryText={`${(i + 1) * 5} min`} />
              ))}
            </SelectField>
          </div>

          <div className={`${formDivisor}`}>
            <NutritionSelector
              name="nutrition"
              nutritions={this.props.nutritions}
              selectedNutrition={this.state.recipe.nutrition}
              validator={this.validators.nutrition}
              validatorMessage={"You must select nutrition"}
              onSelect={nutrition => this.onRecipeChange({ nutrition })}
            />

            <OrientationSelector
              name="orientation"
              orientations={this.props.orientations}
              selectedOrientation={this.state.recipe.orientation}
              validator={this.validators.orientation}
              validatorMessage={"You must select orientation"}
              onSelect={orientation => this.onRecipeChange({ orientation })}
            />
          </div>

          <div className={`${formDivisor}`} style={{ paddingRight: 20 }}>
            <InputField
              name="preparationInstruction"
              onChange={e => this.setState({ preparationInstruction: e.target.value })}
              value={this.state.preparationInstruction}
              multiLine={true}
              rows={4}
              floatingLabelText="ZUBEREITUNGSANLEITUNG"
              style={{ ...styles.textField, height: 100 }}
            />
            <Button
              primary={true}
              label="Add"
              onClick={() => this.addPreparationInstruction()}
              style={{ marginTop: 20, height: 48 }}
            />
          </div>

          <div style={styles.instructions}>
            <ol>
              {this.state.recipe.preparationInstructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div style={styles.footer}>
            {this.props.recipe ? null :
              <div style={styles.receiptNumber}>
                Recipe {this.props.product.createdRecipesCount + 1} of {this.props.product.noOfRecipes}
              </div>}

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
                disabled={!this.isValid()}
              />
            </div>
          </div>
          <ErrorDetails
            error={this.state.apiError}
            onDismiss={() => this.setState({ apiError: null })}
          />
        </form>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
  },
  textField: {
    width: '100%',
  },
  textarea: {
    height: 'auto',
  },
  select: {
    //marginLeft: 30,
    width: '100%',
  },
  formActions: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  autocompletes: {
    height: 76,
    margin: 21,
  }
};

const tArea = css({
  width: '100%',
  margin: '20px',
  height: '200px',
  border: '1px solid #eaeaea',
  borderRadius: '3px',
  fontFamily: 'Montserrat',
  fontSize: 16,
});

const small = css({
  color: 'rgba(0, 0, 0, 0.298039)',
  textTransform: 'uppercase',
  marginLeft: 20,
  fontSize: 12,
})

const formDivisor = style({
  display: 'flex',
  justifyContent: 'space-between'
});

const foto = style({
  flex: 1,
  padding: 45,
  alignItems: 'center',
  justifyContent: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
});

export default Relay.createContainer(EditRecipe, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
        isPublisher
        nickName
      }
    `,
    product: () => Relay.QL`
      fragment on Product {
        id
        noOfRecipes
        createdRecipesCount
      }
    `,
    recipe: () => Relay.QL`
      fragment on Recipe {
        id
        name
        difficulity
        calories
        preparationTimeMin
        nutrition {
          name
        }
        orientation {
          name
        }
        preparationInstructions
        ${UpdateRecipeMutation.getFragment('recipe')}
      }
    `,
    orientations: () => Relay.QL`
      fragment on OrientationConnection {
        ${OrientationSelector.getFragment('orientations')}
      }
    `,
    nutritions: () => Relay.QL`
      fragment on NutritionConnection {
        ${NutritionSelector.getFragment('nutritions')}
      }
    `,
  }
})
