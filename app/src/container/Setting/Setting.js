import React, {useEffect, useState} from 'react';
import Aux from "../../hoc/Auxiliary";
import {Container, Tabs, Tab} from 'react-bootstrap';
import SettingEdit from "./SettingEdit/SettingEdit";
import Calendar from "./Calendar/Calendar";


function Setting() {
    const [key, setKey] = useState('calendar');


    useEffect(() => {
    }, []);

    return (
        <Aux>
            <div className="setting">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title">
                            Tənzimləmə
                        </div>
                    </div>
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)} >
                        <Tab eventKey="calendar" title="Kalendar">
                            <Calendar/>
                        </Tab>
                        <Tab eventKey="edit" title="Redaktə et" >
                            <SettingEdit/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </Aux>

    );
}

export default Setting
