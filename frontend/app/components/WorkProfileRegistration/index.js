/**
 * WorkProfileRegistration
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Form,
  List,
  Button as AntdBUtton,
  message,
  Upload,
  Select,
} from 'antd';
import CheckOutline from 'images/checkOutline.svg';
import UploadIcon from 'images/upload.svg';
import { filter, isEmpty } from 'lodash';
import Button from '../Button';
import SelectBox from '../SelectBox';
import OptionBox from '../OptionBox';
import InputBox from '../InputBox';
// import styled from 'styled-components';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const { Option } = Select;
function WorkProfileRegistration({ form }) {
  const [skill, setSkill] = useState('');
  const [score, setScore] = useState(1);
  const [skillSets, setSkillSets] = useState([]);
  const onSubmit = () => {
    const errors = form.getFieldsError();
    const error = filter(errors, field => field.errors.length);
    if (isEmpty(error)) {
      const { publicProfiles } = form.getFieldValue();
      form.setFieldsValue({
        skillSets,
        publicProfiles: [
          { name: 'linkedIn', url: publicProfiles[0].url },
          { name: 'github', url: publicProfiles[1].url },
        ],
      });
      form.submit();
    }
  };

  const removeSkill = index => {
    setSkillSets(skillSets.filter((_, i) => index !== i));
  };
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M && false;
  }
  return (
    <Form
      validateMessages={validateMessages}
      name="workProfile"
      form={form}
      defaultValue={{
        publicProfiles: [
          { name: 'linkedIn', url: '' },
          { name: 'github', url: '' },
        ],
      }}
    >
      <div className="d-flex flex-row">
        <div className="d-flex flex-column col-4 me-3">
          <Form.Item name="currentCTC" rules={[{ required: true }]}>
            <InputBox type="number" placeholder="Current CTC" size="large" />
          </Form.Item>

          <Form.Item
            className="mt-2"
            name="currentDesignation"
            rules={[{ required: true }]}
          >
            <InputBox placeholder="Current Designation" size="large" />
          </Form.Item>

          <Form.Item
            className="mt-2"
            name="domain"
            rules={[{ required: true }]}
          >
            <InputBox placeholder="Domain" size="large" />
          </Form.Item>

          <Form.Item
            className="mt-2"
            name="objective"
            rules={[{ required: true }]}
          >
            <InputBox type="textarea" placeholder="Objective" size="large" />
          </Form.Item>
          <Form.Item name="status" defaultValue={0}>
            <Select placeholder="Current job status">
              <Option value={0}>Open to work</Option>
              <Option value={1}>Not interested</Option>
              <Option value={2}>Hired</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="d-flex flex-column col-4 me-3">
          <Form.Item
            name="resume"
            placeholder="Upload Resume"
            rules={[{ required: true }]}
            className="bg-dark d-flex flex-row justify-around align-around"
          >
            <Upload
              showUploadList={false}
              size="large"
              style={{ width: '100%' }}
              beforeUpload={beforeUpload}
            >
              <div className="d-flex justify-content-between text-secondary">
                Click to Upload
                <img src={UploadIcon} height={15} alt="" />
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            className="ms-3 mt-2"
            name="workLocation"
            rules={[{ required: true }]}
          >
            <InputBox placeholder="Current Location of Work" size="large" />
          </Form.Item>

          <Form.Item
            className="ms-3 mt-2"
            name="experience"
            rules={[{ required: true }, { min: 0 }]}
          >
            <InputBox
              type="number"
              placeholder="Experience in yrs"
              size="large"
            />
          </Form.Item>

          <Form.Item
            className="ms-3 mt-2"
            name={['publicProfiles', '0', 'url']}
            rules={[{ required: true }]}
          >
            <InputBox placeholder="LinkedIn Profile" size="large" />
          </Form.Item>

          <Form.Item
            className="ms-3 mt-2"
            name={['publicProfiles', '1', 'url']}
            rules={[{ required: true }]}
          >
            <InputBox placeholder="Github Profile" size="large" />
          </Form.Item>
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex me-2 justify-content-center align-items-center">
            <InputBox
              width="250px"
              className="ms-5"
              placeholder="Add Skill"
              size="large"
              onChange={e => setSkill(e.target.value)}
            />
            <SelectBox
              labelInValue
              width="80px"
              placeholder="Rate out of 5"
              size="large"
              className="ms-3"
              onChange={option => setScore(option.value)}
            >
              <OptionBox value="1">1</OptionBox>
              <OptionBox value="2">2</OptionBox>
              <OptionBox value="3">3</OptionBox>
              <OptionBox value="4">4</OptionBox>
              <OptionBox value="5">5</OptionBox>
            </SelectBox>
            <AntdBUtton
              icon={<img src={CheckOutline} height={15} alt="" />}
              size="large"
              className="ms-3"
              onClick={async () => {
                if (!skill || !score) {
                  return;
                }
                const updatedSkillSets = [
                  ...skillSets,
                  {
                    skill,
                    score,
                  },
                ];
                form.setFieldsValue({ skillSets: updatedSkillSets });
                setSkillSets(updatedSkillSets);
              }}
            />
          </div>
          {isEmpty(skillSets) ? (
            ''
          ) : (
            <List
              itemLayout="horizontal"
              className="mt-3 list ms-5"
              dataSource={skillSets}
              style={{ height: 348, overflowY: 'auto' }}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a onClick={() => removeSkill(index)} href="#">
                      Delete
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    style={{ color: 'white' }}
                    avatar={<Avatar Avatar>{item.skill[0]}</Avatar>}
                    title={item.skill}
                    description={
                      <>
                        {Array(Number(item.score))
                          .fill('.')
                          .join(' ')}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
      <Button onClick={onSubmit} size="large" backgroundColor="#8247E5">
        proceed
      </Button>
    </Form>
  );
}

WorkProfileRegistration.propTypes = {
  form: PropTypes.object.isRequired,
};

export default memo(WorkProfileRegistration);
