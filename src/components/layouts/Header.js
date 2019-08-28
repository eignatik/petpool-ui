import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Menu} from "semantic-ui-react";
import {MAIN_TYPES, AUTH_TYPES, LOGOUT} from "../../constants/RouterTypes";
import {RestUtil} from "../../util/RestUtil";

class Header extends Component {

  constructor() {
    super();

    let currentPath = window.location.pathname;
    let tab = MAIN_TYPES.find(tab => tab.path === currentPath);
    let tabName = !!tab ? tab.name : MAIN_TYPES[0].name;

    this.state = {
      leftTabs: MAIN_TYPES,
      rightTabs: AUTH_TYPES,
      activeTab: tabName
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, { name }) {
    if(name === LOGOUT.name) {
      localStorage.removeItem("accessToken");
      RestUtil.redirect("/");
    }
    else {
      this.setState({ activeTab: name });
    }
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
        {this.state.leftTabs
          .filter(tab => localStorage.getItem("accessToken") ? !!tab.requiresAuth : !tab.requiresAuth)
          .map((tab, key) => this.displayMenuItem(tab, key))}

        <Menu.Menu position='right'>
          {this.state.rightTabs
            .filter(tab => localStorage.getItem("accessToken") ? !!tab.requiresAuth : !tab.requiresAuth)
            .map((tab, key) => this.displayMenuItem(tab, key))}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
