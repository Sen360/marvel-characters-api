/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import messages from './messages';
import TablePerso from './TablePerso';
import GridPerso from './GridPerso';
const myheader = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
});
const init = {
  method: 'GET',
  headers: myheader,
  mode: 'cors',
};

export default class PersonnagesPage extends React.Component {
  // Since state and props are static,
  // there's no need to re-render this component
  constructor(props) {
    super(props);
    this.state = {
      searchName: 'a',
      persos: [],
      checked: false,
    };
  }

  componentDidMount() {
    this.handleCallAPIPerso(this.state.searchName);
  }

  handleChange = event => {
    const name = event.target.checked;
    this.setState({
      searchName: name,
    });
  };

  handleSearch = () => {
    this.handleCallAPIPerso(this.state.searchName);
  };

  handleCheck = (event) => {
    const c = event.target.checked;
    this.setState({
      checked : c,
    });
  }
  
  handleCallAPIPerso = name => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=00238f3c1ef4ae72417d4378e2007a28`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        this.setState({ persos: data.data.results });
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

        <TextField
          id="standard-name"
          label="Name"
          value={this.state.searchName}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={this.handleSearch}>
          Rechercher
        </Button>
        <Checkbox checked={this.state.checked} onChange={this.handleCheck} />
        {this.state.checked ? <GridPerso persos={this.state.persos} /> :  <TablePerso persos={this.state.persos} />}
      </div>
    );
  }
}
