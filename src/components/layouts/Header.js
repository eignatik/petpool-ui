import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Menu} from "semantic-ui-react";
import {MAIN_TYPES, AUTH_TYPES} from "../../constants/RouterTypes";

class Header extends Component {

  constructor() {
    super();

    this.state = {
      leftTabs: MAIN_TYPES,
      rightTabs: AUTH_TYPES,
      activeTab: MAIN_TYPES[0].name
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, { name }) {
    this.setState({ activeTab: name });
  }

  displayMenuItem(tab, key) {
    return <Menu.Item as={Link} to={tab.path}
      name={tab.name} key={key}
      active={this.state.activeTab === tab.name}
      onClick={this.handleClick} />
  }

  render() {
    return (
      <Menu inverted>
        {this.state.leftTabs.map((tab, key) => this.displayMenuItem(tab, key))}

        <Menu.Menu position='right'>
          {this.state.rightTabs.map((tab, key) => this.displayMenuItem(tab, key))}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
