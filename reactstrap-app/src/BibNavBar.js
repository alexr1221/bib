import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

export const BibNavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="p-3">
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Bib x Maitres Restaurateurs</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink>Restaurants</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>Nous contacter</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText><i>Trouvez un restaurant proche de chez vous</i></NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default BibNavBar;