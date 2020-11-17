/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import H1 from 'components/H1';
import messages from './messages';
import CardPerso from './CardPerso';

const myheader = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
});
const init = {
  method: 'GET',
  headers: myheader,
  mode: 'cors',
};

export default class PersonnageDetailsPage extends React.Component {
  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    this.state = {
      perso: null,
      searchId: props.match.params.id,
    };
  }

  componentDidMount() {
    this.handleCallAPIPerso(this.state.searchId);
  }

  handleCallAPIPerso = id => {
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=00238f3c1ef4ae72417d4378e2007a28`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        this.setState({ perso: data.data.results[0] });
      });
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        {this.state.perso ? <CardPerso perso={this.state.perso} /> : <div />}
      </div>
    );
  }
}

PersonnageDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
};
