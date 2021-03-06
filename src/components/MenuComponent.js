import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//One way to declare Functional Components
//Renders Menu Items 
function RenderMenuItem({ dish }) {
    return (
        <Card key={dish.id}>
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

//Another way to declare Functional Components
//Menu Component
const Menu = (props) => {
    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    //Loading animation
    if(props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    //handles Errors
    else if(props.dishes.errorMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errorMessage}</h4>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={'/home'}>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    {menu}
                </div>
            </div>
        );
    }
} 
        
    
//always export the component
export default Menu;