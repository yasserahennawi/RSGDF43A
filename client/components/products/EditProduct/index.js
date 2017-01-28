import React from 'react';
import Relay from 'react-relay';
import { css, style } from 'glamor';
import InputField from 'components/utils/InputField';
import PriceInputField from './PriceInputField';
import SelectField from 'components/utils/SelectField';
import Button from 'components/utils/Button';
import Chip from 'components/utils/Chip';
import PriceFormatter from 'components/utils/PriceFormatter';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete'
import GenreSelector from './GenreSelector';
import NutritionSelector from './NutritionSelector';
import CoverUpload from 'components/image/CoverUpload';
import Snackbar from 'material-ui/Snackbar';
import * as _ from 'lodash';
import validator from 'validator';
import CreateProductMutation from 'mutations/CreateProductMutation';
import UpdateProductMutation from 'mutations/UpdateProductMutation';
import ErrorDetails from 'components/utils/ErrorDetails';
import { isValidationError } from 'helpers/error';

export class EditProduct extends React.Component {
  getNewProduct() {
    return {
      name: '',
      orderDescription: '',
      noOfRecipes: 5,
      createdRecipesCount: 1,
      author: this.props.viewer,
      nutrition: {
        name: '',
      },
      coverImage: {
        versions: [],
      },
      genres: {
        edges: []
      },
      price: { value: 0, currency: 'EUR' },
    };
  }

  componentWillMount() {
    this.setState({
      product: this.props.product || this.getNewProduct(),
      apiError: null,
    });

    this.validators = {
      name: value => !validator.isEmpty(value),
      author: value => !validator.isEmpty(value),
      nutrition: value => !validator.isEmpty(String(value)),
      orderDescription: value => !validator.isEmpty(value),
      noOfRecipes: value => !validator.isEmpty(value.toString()),
      price: value => validator.isFloat(value.toString()),
    };
  }

  isValid() {
    return this.validators.name(this.state.product.name)
      && this.validators.author(this.state.product.author.nickName)
      && this.validators.nutrition(this.state.product.nutrition.name)
      && this.validators.orderDescription(this.state.product.orderDescription)
      && this.validators.noOfRecipes(this.state.product.noOfRecipes)
      && this.validators.price(this.state.product.price.value)
      && this.state.product.genres.edges.length > 0;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.product !== this.props.product) {
      this.setState({
        product: nextProps.product || this.getNewProduct(),
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // Submit form if cover image has changed
    if(nextState.imageUploadSuccess && !this.state.imageUploadSuccess) {
      this.submitForm(null, nextState, nextProps);
    }
  }

  onUploadStart(images) {
    this.setState({ imageIsUploading: true });
  }

  onUploadImageSuccess(images) {
    this.onProductChange({ coverImage: images[0] }, { imageIsUploading: false, imageUploadSuccess: true });
  }

  onUploadImageError(error) {
    this.setState({ apiError: error, imageIsUploading: false })
  }

  createProductSuccess({ createProduct }) {
    this.props.onProductCreateSuccess(createProduct);
    this.setState({ isUpdating: false });
  }

  createProductFailure(error) {
    console.log('createProductFailure', error);
    this.setState({ isDirty: true, isUpdating: false, apiError: error });
  }

  updateProductSuccess({ updateProduct }) {
    this.props.onProductUpdateSuccess(updateProduct);
    this.setState({ infoMessage: "Book has been updated successfully", isUpdating: false });
  }

  updateProductFailure(error) {
    console.log('updateProductFailure', error);
    this.setState({ apiError: error, isUpdating: false });
  }

  submitForm(e, state, props) {
    e && e.preventDefault();
    console.log('going to submit with ', state.product, props.product);

    if(state.imageIsUploading) {
      this.setState({ infoMessage: "Please wait... image is uploading" });
    }

    // Product already exist then execute the update mutation
    else if(state.product.id) {
      const mutation = new UpdateProductMutation({
        ...state.product,
        product: props.product,
      });
      props.relay.commitUpdate(mutation, {
        onSuccess: this.updateProductSuccess.bind(this),
        onFailure: this.updateProductFailure.bind(this),
      });
      this.setState({ isDirty: false, isUpdating: true, infoMessage: "Please wait... book is updating" });
    } else {
      const mutation = new CreateProductMutation(state.product);
      props.relay.commitUpdate(mutation, {
        onSuccess: this.createProductSuccess.bind(this),
        onFailure: this.createProductFailure.bind(this),
      });
      this.setState({ isDirty: false, isUpdating: true, infoMessage: "Please wait... book is updating" });
    }
  }

  onProductChange(changes, otherState = {}) {
    this.setState({
      ...otherState,
      product: {
        ...this.state.product,
        ...changes,
      },
    });
  }

  changePriceValue(value) {
    this.setState({
      product: {
        ...this.state.product,
        price: {
          ...this.state.product.price,
          value: value,
        },
      },
    });
  }

  addGenre(genre) {
    if(! genre || !genre.id) return;
    this.setState({
      product: {
        ...this.state.product,
        genres: {
          edges: _.uniqBy(this.state.product.genres.edges.concat({ node: genre }), 'node.name'),
        },
      },
    });
  }

  deleteGenre(node) {
    this.setState({
      product: {
        ...this.state.product,
        genres: {
          edges: this.state.product.genres.edges.filter(edge => edge.node !== node),
        },
      },
    });
  }

  getMinimumNoOfRecipes() {
    return this.state.product.createdRecipesCount < 5 ? 5 : this.state.product.createdRecipesCount;
  }

  render() {
    const { apiError } = this.state;
    return (
      <div style={styles.container}>
        <form onSubmit={(e) => this.submitForm(e, this.state, this.props)}>
          <div className={`${upperFormContainer}`}>
            <div className={upperFormInputs}>
              <div style={{ paddingRight: 52 }}>
                <InputField
                  name="name"
                  validator={this.validators.name}
                  validatorMessage={"You must input the title"}
                  onChange={e => this.onProductChange({ name: e.target.value })}
                  value={this.state.product.name}
                  floatingLabelText="ÜBERSCHRIFT"
                  hintText={"Titel des Specials eingeben"}
                  style={styles.textField}
                />
              </div>

              <div style={{ paddingRight: 52 }}>
                <InputField
                  name="author"
                  validator={this.validators.author}
                  validatorMessage={"You must select the author"}
                  floatingLabelText="AUTOR"
                  hintText="Autor"
                  value={this.state.product.author.nickName}
                  disabled
                  style={styles.textField}
                />
              </div>

              <div className={`${formDivisor}`}>
                <NutritionSelector
                  name="nutrition"
                  nutritions={this.props.nutritions}
                  selectedNutrition={this.state.product.nutrition}

                  validator={this.validators.nutrition}
                  validatorMessage={"You must select nutrition"}

                  onSelect={nutrition => this.onProductChange({ nutrition })}
                />

                <GenreSelector
                  name="genres"
                  genres={this.props.genres}
                  selectedGenre={null}
                  onSelect={this.addGenre.bind(this)}
                  disabled={this.state.product.genres.edges.length >= 2}
                />
              </div>
              <Chip
                chips={this.state.product.genres.edges.map(({ node }) => node)}
                onRequestDelete={this.deleteGenre.bind(this)}
              />
            </div>

            <div className={`${foto}`}>
              <CoverUpload
                image={this.state.product.coverImage}
                onUploadStart={this.onUploadStart.bind(this)}
                onUploadSuccess={this.onUploadImageSuccess.bind(this)}
                onUploadError={this.onUploadImageError.bind(this)}
              />
            </div>
          </div>
          <div>
            <div style={{ paddingRight: 52 }}>
              <InputField
                name="orderDescription"
                floatingLabelText="BESCHREIBUNG"
                validator={this.validators.orderDescription}
                validatorMessage={"Bitte füge eine Beschreibung ein"}
                onChange={e => this.onProductChange({ orderDescription: e.target.value })}
                value={this.state.product.orderDescription}
                rows={5}
                multiLine={true}
                style={{ ...styles.textField, ...styles.textarea}}
                className={tArea.toString()}
              />
            </div>

            <div className={`${formDivisor}`} style={{ maxWidth: 450 }}>
              <SelectField
                name="noOfRecipes"
                validator={this.validators.noOfRecipes}
                validatorMessage={"You must select no of recipes"}
                floatingLabelText="REZEPTANZAHL"
                name="noOfRecipes"
                value={this.state.product.noOfRecipes}
                onChange={(e, key, value) => this.onProductChange({ noOfRecipes: parseInt(value) })}>
                {_.range(this.getMinimumNoOfRecipes() - 1, 40).map(i => (
                  <MenuItem key={i} value={i+1} primaryText={i+1} />
                ))}
              </SelectField>
              <PriceInputField
                validator={this.validators.price}
                validatorMessage={"Bitte füge einen gültigen Preis ein"}
                value={this.state.product.price.value}
                onChange={value => this.changePriceValue(value)}
                hintText="Preis in Euro inkl. MwSt."
                style={styles.textField}
              />
            </div>
          </div>
          <div style={styles.formActions}>
            <Button
              primary={true}
              type="submit"
              label="WEITER"
              disabled={ !this.isValid() }
            />
          </div>
          <Snackbar
            open={!!this.state.infoMessage}
            message={this.state.infoMessage}
            onRequestClose={() => this.setState({ infoMessage: '' })}/>
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

const upperFormContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

const upperFormInputs = style({
  flex: 1,
  flexShrink: 0,
});

const foto = style({
  marginRight: 20,
});

export default Relay.createContainer(EditProduct, {
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
        name
        orderDescription
        createdRecipesCount
        noOfRecipes
        author {
          id
          fullName
          nickName
        }
        nutrition {
          id
          name
        }
        genres(first: 2) {
          edges {
            node {
              id
              name
            }
          }
        }
        price {
          value
          currency
        }
        coverImage {
          src
          versions {
            src
            width
            height
          }
        }
        ${UpdateProductMutation.getFragment('product')}
      }
    `,
    genres: () => Relay.QL`
      fragment on GenreConnection {
        ${GenreSelector.getFragment('genres')}
      }
    `,
    nutritions: () => Relay.QL`
      fragment on NutritionConnection {
        ${NutritionSelector.getFragment('nutritions')}
      }
    `,
  }
})
