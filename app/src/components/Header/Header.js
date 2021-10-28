import React from 'react';
import Aux from "../../hoc/Auxiliary";
import {Container, Row, Col, Badge, Image, Dropdown} from 'react-bootstrap';


function Header() {

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = '/'
    }

    return (
        <Aux>
            <div className="header">
                <Container fluid>
                    <Row className="flex-center">
                        <Col xs={6}>
                            <div className="flex-vertical-start">
                                <div className="logo flex">
                                    <Image src={require('../../assets/img/Port-of-Baku.png').default}/>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="flex-end">
                                <div className="notification relative">
                                    <Dropdown>
                                        <Dropdown.Toggle className="btn-transparent" id="dropdown-basic">
                                            <div className="badge-content">
                                                <Badge className="flex-vertical-center">2</Badge>
                                                <div className="btn-transparent">
                                                    <svg width="24" height="24" viewBox="0 0 30 30" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0)">
                                                            <path
                                                                d="M16.875 5.225C16.53 5.225 16.25 4.945 16.25 4.6V2.5C16.25 1.81125 15.6887 1.25 15 1.25C14.3112 1.25 13.75 1.81125 13.75 2.5V4.6C13.75 4.945 13.47 5.225 13.125 5.225C12.78 5.225 12.5 4.94625 12.5 4.6V2.5C12.5 1.12125 13.6212 0 15 0C16.3787 0 17.5 1.12125 17.5 2.5V4.6C17.5 4.94625 17.22 5.225 16.875 5.225Z"
                                                                fill="#040647"/>
                                                            <path
                                                                d="M15 30C12.5875 30 10.625 28.0375 10.625 25.625C10.625 25.28 10.905 25 11.25 25C11.595 25 11.875 25.28 11.875 25.625C11.875 27.3475 13.2775 28.75 15 28.75C16.7225 28.75 18.125 27.3475 18.125 25.625C18.125 25.28 18.405 25 18.75 25C19.095 25 19.375 25.28 19.375 25.625C19.375 28.0375 17.4125 30 15 30Z"
                                                                fill="#040647" stroke="#040647" strokeWidth="0.2"/>
                                                            <path
                                                                d="M25.625 26.25H4.375C3.34125 26.25 2.5 25.4088 2.5 24.375C2.5 23.8263 2.73875 23.3075 3.15625 22.95C5.12625 21.285 6.25 18.8625 6.25 16.2975V12.5C6.25 7.675 10.175 3.75 15 3.75C19.825 3.75 23.75 7.675 23.75 12.5V16.2975C23.75 18.8638 24.8738 21.285 26.8338 22.9412C27.2613 23.3075 27.5 23.8263 27.5 24.375C27.5 25.4088 26.66 26.25 25.625 26.25ZM15 5C10.8638 5 7.5 8.36375 7.5 12.5V16.2975C7.5 19.2325 6.215 22.0013 3.97375 23.8963C3.83 24.0188 3.75 24.1925 3.75 24.375C3.75 24.72 4.03 25 4.375 25H25.625C25.97 25 26.25 24.72 26.25 24.375C26.25 24.1925 26.17 24.0188 26.0313 23.9C23.7863 22.0013 22.5 19.2312 22.5 16.2975V12.5C22.5 8.36375 19.1363 5 15 5Z"
                                                                fill="#040647" stroke="#040647" strokeWidth="0.3"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="30" height="30" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">
                                                <div className="img-block">
                                                    <Image src={require('../../assets/img/back-img.jpg').default}/>
                                                </div>
                                                <div className="notify-content">
                                                    <p className="notify-title">Asa Butterfield</p>
                                                    <p className="notify-text">Lorem ipsum dolor sitam consetetur
                                                        sadipscing elitr, sedim atysaj</p>
                                                    <span className="date">Jun 02, 2020</span>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className="user-logout">
                                    <Dropdown>
                                        <Dropdown.Toggle className="btn-transparent" id="dropdown-basic">
                                            <div className="img-block">
                                                <Image src={require('../../assets/img/back-img.jpg').default}/>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>logOut()}>
                                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.3391 2.24601L15.5556 2.24601C16.9179 2.24601 18.0235 3.35563 18.0235 4.71392L18.0235 17.2861C18.0235 18.6484 16.9139 19.754 15.5556 19.754L10.2543 19.754C9.88069 19.754 9.58125 20.0534 9.58125 20.427C9.58125 20.8006 9.88069 21.1 10.2543 21.1L15.5556 21.1C17.661 21.1 19.3695 19.3871 19.3695 17.2861L19.3695 4.71392C19.3695 2.60853 17.6566 0.899999 15.5556 0.899999L10.3391 0.899999C9.96558 0.899999 9.66614 1.19944 9.66614 1.573C9.66614 1.94705 9.97031 2.24601 10.3391 2.24601Z" fill="#193651" stroke="#193651" strokeWidth="0.2"/>
                                                    <path d="M0.899201 11.4034L4.54097 15.0451C4.76592 15.2701 5.1267 15.2701 5.35166 15.0451C5.57662 14.8202 5.57662 14.4594 5.35166 14.2345L2.68613 11.5689L14.3118 11.5689C14.6301 11.5689 14.8848 11.3142 14.8848 10.9959C14.8848 10.6776 14.6301 10.4229 14.3118 10.4229L2.68613 10.4229L5.35166 7.75737C5.57662 7.53241 5.57662 7.17163 5.35166 6.94668C5.24131 6.83632 5.09275 6.7769 4.94844 6.7769C4.80412 6.7769 4.65557 6.83208 4.54521 6.94668L0.903445 10.5884C0.674242 10.8176 0.674243 11.1827 0.899201 11.4034Z" fill="#193651"/>
                                                </svg>

                                                Çıxış et
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Aux>

    );
}

export default Header
