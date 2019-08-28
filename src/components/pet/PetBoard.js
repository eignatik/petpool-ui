import React, {Component} from 'react';
import {Segment, Item} from "semantic-ui-react";
import PetCard from "../pet/PetCard";

class PetBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [
        {
          name: "Fluffy",
          type: "cat",
          breed: "Stripped kind",
          photo: "https://wagznwhiskerz.com/wp-content/uploads/2017/10/home-cat.jpg",
          age: 1
        },
        {
          name: "Archie",
          type: "dog",
          breed: "Red dog",
          photo: "https://i.kinja-img.com/gawker-media/image/upload/s--HqfzgkTd--/c_scale,f_auto,fl_progressive,q_80,w_800/wp2qinp6fu0d8guhex9v.jpg",
          age: 2
        },
        {
          name: "Kesha",
          type: "parrot",
          breed: "Some kind",
          photo: "https://www.parakeethome.com/wp-content/uploads/2018/05/Parrot.jpg",
          age: 1
        },
        {
          name: "Toby",
          type: "cat",
          breed: "Tabby cat",
          photo: "",
          age: 3
        },
        {
          name: "Gunner",
          type: "dog",
          breed: "Newfoundland",
          photo: "https://cdn2-www.dogtime.com/assets/uploads/gallery/newfoundland-dogs-and-puppies/newfoundland-dogs-puppies-1.jpg",
          age: 2
        },
      ]
    };
  }

  render() {
      return (
            <Segment>
              <h1>Animals</h1>
              <Item.Group>{this.state.pets.map((pet, index) => { return <PetCard pet={pet} key={index}></PetCard>})}</Item.Group>
            </Segment>
      );
  }
}

export default PetBoard;
