/**
 *
 * CompanyProfile
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Typography, Select, Button } from 'antd';
import './CompanyProfile.css';

const { Text } = Typography;
const { Option } = Select;

const orgType = [
  { key: '0', value: 'Product' },
  { key: '1', value: 'Service' },
];

const CompanyProfile = ({ uploadCompanyProfile }) => {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(orgType[0]);
  const [webSite, setWebsite] = useState('');
  const [experience, setExperience] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [orgLocation, setOrgLocation] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = data => {
    uploadCompanyProfile(data);
  };

  return (
    <div className="main-div">
      <Row justify="space-around" align="middle" className="row1">
        <Col span={16} className="Col ms-3">
          <Text className="title">Name</Text>
          <Input
            className="company"
            value={name}
            onChange={event => setName(event.target.value)}
            bordered={false}
            placeholder="ABC Company"
            style={{
              height: 50,
              color: '#FFF',
              backgroundColor: 'rgba(196,196,196,0.1)',
              fontSize: 22,
              borderRadius: 10,
              marginTop: '5px',
            }}
          />
        </Col>
        <Col span={6} className="Col">
          <Select
            className="drop-down"
            bordered={false}
            value={selectedType.key}
            onChange={val =>
              setSelectedType(orgType.find(type => type.key === val))
            }
          >
            {orgType.map(action => (
              <Option value={action.key} key={action.key}>
                {action.value}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginTop: 20, marginLeft: 10 }}
      >
        <Col span={16} className="Col">
          <Text className="title">Website</Text>
          <Input
            style={{
              height: 50,
              color: '#FFF',
              backgroundColor: 'rgba(196,196,196,0.1)',
              fontSize: 22,
              borderRadius: 10,
              marginTop: '5px',
            }}
            value={webSite}
            onChange={event => setWebsite(event.target.value)}
            bordered={false}
            type="url"
            placeholder="https://abccompany.com"
          />
        </Col>
        <Col span={6} />
      </Row>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginTop: 20, marginLeft: 10 }}
      >
        <Col
          span={8}
          style={{
            borderRadius: 10,
            backgroundColor: 'rgba(196,196,196,0.1)',
            overflow: 'hidden',
            padding: 10,
            height: 108,
          }}
        >
          <Text className="title">Years Completed :</Text>
          <Input
            style={{
              height: 60,
              color: '#FFF',
              lineHeight: 40,
              fontSize: 26,
            }}
            type="number"
            value={experience}
            onChange={event => setExperience(event.target.value)}
            bordered={false}
            placeholder="5"
          />
        </Col>
        <Col
          span={14}
          style={{
            borderRadius: 10,
            backgroundColor: 'rgba(196,196,196,0.1)',
            overflow: 'hidden',
            padding: 10,
            height: 108,
          }}
        >
          <Text className="title">LinkedIn</Text>
          <Input
            style={{
              height: 50,
              color: '#FFF',
              backgroundColor: 'rgba(196,196,196,0.1)',
              fontSize: 22,
              borderRadius: 10,
              marginTop: '5px',
            }}
            value={linkedIn}
            onChange={event => setLinkedIn(event.target.value)}
            bordered={false}
            type="url"
            placeholder="@abccompany"
          />
        </Col>
      </Row>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginTop: 20, marginLeft: 10 }}
      >
        <Col
          span={8}
          style={{
            borderRadius: 10,
            backgroundColor: 'rgba(196,196,196,0.1)',
            overflow: 'hidden',
            padding: 10,
            height: 108,
          }}
        >
          <Text className="title">Location</Text>
          <Input
            style={{
              height: 60,
              color: '#FFF',
              lineHeight: 40,
              fontSize: 26,
            }}
            type="text"
            value={orgLocation}
            onChange={event => setOrgLocation(event.target.value)}
            bordered={false}
            placeholder="Washignton DC"
          />
        </Col>
        <Col
          span={14}
          style={{
            borderRadius: 10,
            backgroundColor: 'rgba(196,196,196,0.1)',
            overflow: 'hidden',
            padding: 10,
            height: 108,
          }}
        >
          <Text className="title">Email</Text>
          <Input
            style={{
              height: 50,
              color: '#FFF',
              backgroundColor: 'rgba(196,196,196,0.1)',
              fontSize: 22,
              borderRadius: 10,
              marginTop: '5px',
            }}
            value={email}
            onChange={event => setEmail(event.target.value)}
            bordered={false}
            type="email"
            placeholder="abccompany@gmail.com"
          />
        </Col>
      </Row>
      <Row
        justify="space-around"
        align="middle"
        style={{ marginTop: 20, marginLeft: 10 }}
      >
        <Col span={12} />
        <Button
          style={{
            width: '96%',
            height: 60,
            borderRadius: 15,
            backgroundColor: '#8247e5',
            border: 'none',
          }}
          type="primary"
          onClick={() =>
            handleRegister({
              name,
              webSite,
              experience,
              orgLocation,
              linkedIn,
              email,
              selectedType,
            })
          }
        >
          Register
        </Button>
      </Row>
    </div>
  );
};

CompanyProfile.propTypes = { uploadCompanyProfile: PropTypes.func.isRequired };

export default CompanyProfile;
