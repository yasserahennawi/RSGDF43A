import React, { Component } from 'react';
import Relay from 'react-relay';
import { css, style } from 'glamor';

import { Step, Stepper, StepLabel, } from 'material-ui/Stepper';
import MenuItem from 'material-ui/MenuItem';

import InputField from 'components/utils/InputField';
import SelectField from 'components/utils/SelectField';
import Button from 'components/utils/Button';
import Chip from 'components/utils/Chip';
import Formsy from 'formsy-react'
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete';
import AutoComplete from 'material-ui/AutoComplete'

import CoverUpload from 'components/image/CoverUpload';

const dataSourceConfig = {
  text: 'name',
  value: 'id'
}

// const maxRecepts = (type) => [...(new Array(type == 'publisher' ? 99 : 11) )].map((e, i) => i + 5)

class EditProduct extends Component {
  state = {
    isSubmitButtonValid: false,
    genres: [],
    disabledGenres: false,
    textGenres: ''
  };

  toggleValidForm = (valid) => {
    return () => {
      this.setState({
        isSubmitButtonValid: valid && this.state.nutrition && this.state.genres,
      });
    };
  };

  submitForm = (data) => {
    console.log('data', data);
    // const { onSubmit } = this.props;
    // data.genres = this.state.genres.map((g) => g.key.id);
    // data.nutrition = this.state.nutrition.key.id;

    // onSubmit(data);
  };

  handleSelectNutrition = (nutrition) => {
    this.setState({
      nutrition: {
        text: nutrition.name,
        key: nutrition,
      }
    })
  }

  handleSelectGenre = (genre) => {
    if (genre.name) {
      const genres = [
        ...this.state.genres,
        {
          text: genre.name,
          key: genre
        },
      ];
      this.setState({
        genres: genres,
        disabledGenres: genres.length >= 2
      })
    }
  };

  handleDeleteGenre = (genre) => {
    const genres = this.state.genres.filter(gen => gen !== genre);

    this.setState({
      genres: genres,
      disabledGenres: genres.length >= 2
    });
  };

  getNutritions() {
    return this.props.nutritions.edges.map(edge => edge.node.name);
  }

  getGenres() {
    return this.props.genres.edges.map(edge => edge.node.name);
  }

  render() {
    const { isSubmitButtonValid, genres, disabledGenres } = this.state;

    return (
      <div style={styles.container}>
        <Formsy.Form
          onValid={this.toggleValidForm(true)}
          onInvalid={this.toggleValidForm(false)}
          onValidSubmit={this.submitForm}>
          <div className={`${formDivisor}`}>
            <div {...style({ flex: 2 })}>
              <small className={small}>UBERSCHRIFT</small>
              <InputField
                name="title"
                hintText="Titel des Specials eingeben"
                formsy={true}
                validations="isExisty"
                validationError={errorMessage}
                required={true}
                style={styles.textField}
              />

              <small className={small}>AUTOR</small>
              <InputField
                name="author"
                hintText="Autor"
                value={ this.props.viewer.nickName }
                disabled
                required={false}
                style={styles.textField}
              />

              <div className={`${formDivisor}`}>
                <FormsyAutoComplete
                  name="nutrition"
                  dataSource={this.getNutritions()}
                  dataSourceConfig={dataSourceConfig}

                  openOnFocus={true}
                  floatingLabelText="Ernährungsart"
                  hintText="Alle Art"
                  filter={AutoComplete.fuzzyFilter}
                  onNewRequest={ this.handleSelectNutrition }
                  required={false}
                  style={styles.autocompletes}
                />

                <FormsyAutoComplete
                  name="genres"
                  dataSource={this.getGenres()}
                  dataSourceConfig={dataSourceConfig}

                  floatingLabelText="Genre hinzufugen"
                  filter={ AutoComplete.fuzzyFilter }
                  required={ false }
                  disabled={ disabledGenres }
                  onNewRequest={ this.handleSelectGenre }
                  style={styles.autocompletes}
                />
              </div>
              <Chip
                chips={ genres }
                onRequestDelete={this.handleDeleteGenre}
              />

              <small className={small}>BESCHREIBUNG</small>
              <InputField
                name="description"
                rows={5}
                multiLine={true}
                formsy={true}
                style={{ ...styles.textField, ...styles.textarea}}
                className={tArea.toString()}
                required={true}
              />

              <div className={`${formDivisor}`}>
                <SelectField
                  floatingLabelText="REZEPTANZAHL"
                  name="recepts_count"
                  formsy={true}
                  validations="isExisty"
                  validationError={errorMessage}
                  required={false}
                  value={5}>
                  <MenuItem key={1} value={1} primaryText={1}/>
                </SelectField>
                <InputField
                  name="price"
                  hintText="Preis in Euro Inkl Mwst."
                  style={styles.textField}
                  formsy={true}
                  validations="isFloat"
                  validationError={errorMessage}
                  required={true}
                />
              </div>
            </div>

            <div className={`${foto}`}>
              <CoverUpload />
            </div>
          </div>
          <div style={styles.formActions}>
            <Button
              primary={true}
              type="submit"
              label="Continue"
              disabled={ !this.state.isSubmitButtonValid }
            />
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

export default Relay.createContainer(EditProduct, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        nickName
      }
    `,
    nutritions: () => Relay.QL`
      fragment on NutritionConnection {
        edges {
          node {
            name
          }
        }
      }
    `,
    genres: () => Relay.QL`
      fragment on GenreConnection {
        edges {
          node {
            name
          }
        }
      }
    `,
  }
});
