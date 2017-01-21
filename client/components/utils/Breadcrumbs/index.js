import React from 'react';
import { Link, withRouter } from 'react-router';
import RouterBreadcrumbs from 'react-breadcrumbs';

import Icon from 'components/utils/Icon';
import ICONS from 'components/utils/Icons';

import { css } from 'glamor';

const Breadcrumbs = ({ routes, params, isAdmin }) => {
  const depth = routes.length;

  return (
    <div className={ breadcrumbsStr }>
      <Icon
        icon={ICONS.HOME}
        color="#4ba3e1"
      />

      <span className={ itemListStr }>/</span>

      <span className={ breadcrumbsStr }>
        {isAdmin ? 'Admin-Bereich' : 'Blogger-Bereich' }
      </span>

      <span className={ itemListStr }>/</span>

      <RouterBreadcrumbs
        routes={routes}
        params={params}
        excludes={['App']}
        separator=" / "
        itemClass={ itemListStr }
        displayMissing={false}
      />
    </div>
  );
};

const breadcrumbs = css({
  listStyle: 'none',
  padding: 0,
  margin: '0 15px 0 0',
  display: 'flex',
  alignItems: 'center',
});

const breadcrumbsStr = breadcrumbs.toString()

const itemList = css({
  margin: '0 10px',
  color: '#D9D8D8',
  textDecoration: 'none',
});

const itemListStr = itemList.toString()

const breadcrumb = css({
  margin: '0 10px',
  color: '#4ba3e1',
});

export default Breadcrumbs;
