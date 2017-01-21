import React, { Component } from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router';

import Table from 'components/utils/Table';
import PageHeader from 'components/utils/PageHeader';
import InputField from 'components/utils/InputField';
import SearchBar from 'components/utils/SearchBar';

const columns = ( props ) => [
  {
    property: 'createdAt',
    header: {
      label: 'REGISTRIERT AM',
    },
  },
  {
    property: 'totalProducts',
    header: {
      label: 'PRODUKTANZAHL',
    },
  },
  {
    property: 'userType',
    header: {
      label: 'Art',
    },
  },
  {
    property: 'fullName',
    header: {
      label: 'MITGLIEDER',
    },
  },
  {
    property: 'icon',
    type: 'icon',
    header: {
      label: 'DETAILS',
    },
    onClick: (e, rowId) => props.router.push(`/members/edit/${rowId}`),
  },
];

export class ListUser extends Component {
  componentWillMount() {
    this.setState({ searchName: '' });
  }

  getUsers() {
    return this.props.users.edges
      .map(({ node }) => node);
  }

  getFilteredUsers() {
    return this.getUsers()
      .filter(user => {
        return user.fullName.toLowerCase().indexOf(this.state.searchName.toLowerCase()) > -1;
      });
  }

  getNumberOfPublishers() {
    return this.getUsers().filter(({ userType }) => userType === 'publisher').length || '0';
  }

  getNumberOfBloggers() {
    return this.getUsers().filter(({ userType }) => userType === 'blogger').length || '0';
  }


  getUsersRows() {
    return this.getFilteredUsers().map(user => ({
      id: user.id,
      createdAt: user.createdAt,
      totalProducts: 0,
      userType: user.userType,
      fullName: user.fullName,
      icon: 'list',
    }));
  }

  render() {

    return (
      <div style={styles.container}>
        <PageHeader
          title="MITGLIEDER"
          add="Anzahl von Verlager"
          addValue={ this.getNumberOfPublishers() }
          other="Anzahl von Blogger"
          otherValue={ this.getNumberOfBloggers() }
        />

        <SearchBar
          onPerform={(searchName) => { this.setState({ searchName }); }}
        />

        <Table
          columns={columns(this.props)}
          rows={this.getUsersRows()}
          showCheckbox={false}
        />
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
    marginBottom: 30,
  },
  search: {
    margin: 0,
  },
  text: {
    color: '#D2D2D2',
    marginBottom: 5,
  },
};

export default Relay.createContainer(withRouter(ListUser), {
  fragments: {
    users: () => Relay.QL`
      fragment on UserConnection {
        edges {
          node {
            id
            totalProducts
            createdAt
            fullName
            userType
          }
        }
      }
    `
  }
});
