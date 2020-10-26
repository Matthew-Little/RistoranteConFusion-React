import React,{ Component } from 'react';
import { 
    Card, CardImg, CardText, CardBody, CardTitle, ListGroup,
    ListGroupItem, Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalHeader, ModalBody, Row, Label, Col 
} from 'reactstrap'; 
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is:" + JSON.stringify(values));
        alert("Current state is:" + JSON.stringify(values));
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg" />Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" sm={12}>Rating</Label>
                                <Col>
                                    <Control.select model=".rating" name="rating" className="form-control custom-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" sm={12}>Your Name</Label>
                                <Col>
                                    <Control.text model=".author" name="author" id="author" className="form-control" placeholder="Your Name" 
                                        validators={{minLength: minLength(3), maxLength: maxLength(15)}} 
                                    />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{ 
                                            minLength: 'Must be greater than 2 characters', 
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" sm={12}>Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" name="comment" id="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
};

function RenderDish({ dish }) {
    if(dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return ( <div></div> );
    }
}

function RenderComments({ comments }) {
    if(comments != null) {

        const commentList = comments.map((comment) => {
            return (
                <ListGroupItem key={comment.id} className="border-0">
                    {comment.comment}<br></br>
                    --{comment.author}, {new Intl.DateTimeFormat('en-CA', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </ListGroupItem>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ListGroup>
                    {commentList}
                </ListGroup>
                <CommentForm />
            </div>
        );
        
    } else {
        return ( <div></div> );
    }
}

function DishDetail(props) {
    if(props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={'/menu'}>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content"> 
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div> 
        );
    } else {
        return ( <div></div> );
    }
        
}


export default DishDetail;