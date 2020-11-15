/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import messages from './messages';
import TablePerso from './TablePerso';
import CardPerso from './CardPerso';

const myheader = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
});

const init = {
  method: 'GET',
  headers: myheader,
  mode: 'cors',
};

export default class PersonnagesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
      persos: [],
    };
  }

  handleChange = event => {
    const name = event.target.value;
    this.setState({
      searchName: name,
    });
    console.log('name', name);
  };

  handleCallAPIPerso = name => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=00238f3c1ef4ae72417d4378e2007a28`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        console.log('data', data.data.results);
        this.setState({ persos: data.data.results });
      });
  };

  componentDidMount() {
    this.handleCallAPIPerso(this.state.searchName);
  }

  handleSearch = () => {
    this.handleCallAPIPerso(this.state.searchName);
  };

  handleCheck = event => {
    const c = event.target.checked;
    this.setState({
      checked: c,
    });
    console.log('name', c);
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
        <TextField
          id="standard-name"
          label="Name"
          value={this.state.searchName}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={this.handleSearch}>
          Primary
        </Button>
        <Checkbox onChange={this.handleCheck} />
        <CardPerso perso={this.state.persos[0]} />
        <TablePerso persos={this.state.persos} />
      </div>
    );
  }
}
