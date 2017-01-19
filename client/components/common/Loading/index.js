import React, { Component } from 'react';
import { css, placeholder, style } from 'glamor';

import ProgressBar from 'components/utils/ProgressBar';
import Logo from 'components/layout/Logo';

import styles from './styles';

class Loading extends Component {
  render() {
    const { loadingProgress } = this.props;

    return (
      <div>
        <div className={css(styles.container)}>
          <div className={css(styles.logo)}>
            <Logo
              width={220}
              height={160}
              fontSize={11}
            />
          </div>

          <ProgressBar
            value={loadingProgress}
            style={styles.progressBar}
          />
        </div>
      </div>
    );
  }
}

export default Loading;
