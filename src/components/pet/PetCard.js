import React, {Component} from 'react';
import {Item, Image, Icon} from "semantic-ui-react";
import './PetCard.css';

class PetCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pet: props.pet
    };
  }

  render() {
      return (
            <Item className="pet-card">
              <Item.Image size='tiny'>
               {!this.state.pet.photo ? (<Image className="image-empty" />) : (<Image src={this.state.pet.photo} />)}
              </Item.Image>
              <Item.Content>
                <div className="pet-card-content">
                  <div className="pet-card-content-left">
                    <Item.Description>{this.state.pet.type}</Item.Description>
                  </div>
                  <div className="pet-card-content-right">
                    <Item.Header>{this.state.pet.name}</Item.Header>
                    <Item.Meta>{this.state.pet.breed}</Item.Meta>
                    <Item.Description>
                      <Icon className="birthday cake"/> {this.state.pet.age}
                    </Item.Description>
                  </div>
                </div>
              </Item.Content>
            </Item>
      );
  }
}

export default PetCard;
