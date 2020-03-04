import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Badge } from 'reactstrap';
import BibRestaurantData from './data/allRestaurantsJoin.json';

export const BibRestaurantList = () => (
    <div>
        {
            BibRestaurantData.map((Bibres, name) => {
            return (
                <div className="gradient-border">
                    <ListGroup>
                        <ListGroupItem>
                            <ListGroupItemHeading>{Bibres.name} <Badge pill>X etoiles</Badge></ListGroupItemHeading>
                            <ListGroupItemText>
                                {Bibres.city}
        </ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            );
        })}
    </div>

);

export default BibRestaurantList;

//return (
//    <ListGroup>
//        <ListGroupItem>
//            <ListGroupItemHeading>List group item heading <Badge pill>3 etoiles</Badge></ListGroupItemHeading>
//            <ListGroupItemText>
//                Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
//        </ListGroupItemText>
//        </ListGroupItem>
//    </ListGroup>
//);