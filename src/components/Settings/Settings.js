import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './Settings.css';
import {InputGroup} from "react-bootstrap";

const Settings = () => {
    const [selectedOption, setSelectedOption] = useState('Option 1');
    const [ipAddress, setIpAddress] = useState('');
    const [macAddress, setMacAddress] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleIpChange = (event) => {
        setIpAddress(event.target.value);
    };

    const handleMacChange = (event) => {
        setMacAddress(event.target.value);
    };

    return (
        <div className="settings settings-text-white d-grid gap-4">

            <Row className="row-first">
                <Col xs={3} className="label-col">
                    <Col >
                        <Form.Label column >
                            TV:
                        </Form.Label>
                    </Col>
                </Col>
                <Col xs={7} className="control-col">
                    <Col>
                        <Form.Select aria-label="Select TV">
                            <option>Select TV</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>                    </Col>
                </Col>
            </Row>

            <Row>
                <Col xs={3} className="label-col">
                        <Col >
                            <Form.Label column >
                                IP:
                            </Form.Label>
                        </Col>
                </Col>
                <Col xs={8} className="control-col">
                        <Col>
                            <Form.Control type="text" placeholder="Enter IP Address" />
                        </Col>
                </Col>
            </Row>
            <Row>
                <Col xs={3} className="label-col">
                    <Col>
                        <Form.Label column >
                            MAC:
                        </Form.Label>
                    </Col>
                </Col>
                <Col xs={8} className="control-col">
                    <Col >
                        <Form.Control type="text" placeholder="Enter MAC Address" />
                    </Col>
                </Col>
            </Row>

        </div>
    );
};

export default Settings;
