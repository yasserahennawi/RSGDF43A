import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { style } from 'glamor';

import MenuItem from 'material-ui/MenuItem';

import Table from 'components/utils/Table';
import SelectField from 'components/utils/SelectField';
import PageHeader from 'components/utils/PageHeader';
import Button from 'components/utils/Button';

class Accounting extends Component {
  state = {
    year: '2016',
    month: 'Oktober',
  };

  handleSelectMonth = (e, key, month) => this.setState({ month });

  handleSelectYear = (e, key, year) => this.setState({ year });

  render() {
    const { year, month } = this.state;

    const rows = [
      {
        id: 1,
        memberId: '12094',
        registeredAt: 'details',
        productNumber: 34,
        memberName: 'Lasagner fur Veganer',
        details: '',
      },
      {
        id: 2,
        memberId: '12095',
        registeredAt: 'details',
        productNumber: 23,
        memberName: 'Hackfleisch',
        details: '',
      },
      {
        id: 3,
        memberId: '12134',
        registeredAt: 'details',
        productNumber: 12,
        memberName: 'Fische fur Vegetaria',
        details: '',
      },
      {
        id: 4,
        memberId: '12456',
        registeredAt: 'details',
        productNumber: 3,
        memberName: 'Sojamilch fur Anfanger',
        details: '',
      },
    ];

    const columns = [
      {
        property: 'memberId',
        header: {
          label: 'ID',
        },
      },
      {
        property: 'registeredAt',
        header: {
          label: 'REGISTRIERT AM',
        },
      },
      {
        property: 'productNumber',
        header: {
          label: 'PRODUKTANZAHL',
        },
      },
      {
        property: 'memberName',
        header: {
          label: 'MITGLIEDNAME',
        },
      },
      {
        property: 'details',
        header: {
          icon: 'list'
        },
      },
    ];

    return (
      <div style={styles.container}>

        <div style={styles.header}>
          <PageHeader
            title="ABRECHNUNG"
            add="Hier hast du die Kontrolle deiner Abrechnung"
            addValue=""
            other=""
            otherValue=""
          />

          <div style={styles.select}>
            <SelectField value={year} onChange={this.handleSelectYear}>
              <MenuItem
                value="2016"
                primaryText="2016"
              />
              <MenuItem
                value="2017"
                primaryText="2017"
              />
            </SelectField>

            <SelectField value={month} onChange={this.handleSelectMonth}>
              <MenuItem
                value="Oktober"
                primaryText="Oktober"
              />
              <MenuItem
                value="November"
                primaryText="November"
              />
            </SelectField>
          </div>
        </div>

        <h5 style={styles.text}>ABRECHNUNG 2016 - OKTOBER</h5>

        <Table
          columns={columns}
          rows={rows}
          showCheckbox={false}
        />

        <div style={styles.footer}>
          <div style={styles.footerText}>
            <h1 style={styles.title}>TOTAL: 820,00 EUR</h1>
            <h4 style={styles.subtitle}>Alle Betrage enthalten MwSt.</h4>
          </div>

          <Button
            labelColor="#BABABA"
            backgroundColor="#F4F4F4"
            label="BEZAHLT"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  title: {
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    margin: 3,
    marginTop: 0,
    color: '#515151',
    marginBottom: 30,
  },
  search: {
    width: '100vh',
    marginBottom: 5,
    paddingLeft: 10,
  },
  text: {
    color: '#D2D2D2',
    marginBottom: 5,
  },
  select: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footer: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
};

export default Accounting;
