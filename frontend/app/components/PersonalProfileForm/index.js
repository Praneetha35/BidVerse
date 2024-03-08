/**
 *
 * PersonalProfileForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Upload, message } from 'antd';
import { filter, isEmpty } from 'lodash';
import Button from '../Button';
import InputBox from '../InputBox';
import './form.css';
import CustomTextArea from '../CustomTextArea';

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 20,
  },
};
/* eslint-disable no-template-curly-in-string */

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
/* eslint-enable no-template-curly-in-string */

function PersonalProfileForm({ form }) {
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
  const onSubmit = () => {
    const errors = form.getFieldsError();
    const error = filter(errors, field => field.errors.length);
    if (isEmpty(error)) {
      form.submit();
    }
  };

  return (
    <div className="d-flex flex-row">
      <div className="d-flex flex-column col-7  ">
        <Form
          name="personalProfile"
          validateMessages={validateMessages}
          form={form}
        >
          <div className="d-flex flex-row">
            <div className="d-flex flex-column col-9">
              <Form.Item
                {...layout}
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputBox placeholder="Name" />
              </Form.Item>
              <Form.Item {...layout} name="dob">
                <DatePicker
                  placeholder="DOB"
                  className="date-picker"
                  size="large"
                  style={{ color: 'white' }}
                />
              </Form.Item>
              <Form.Item
                {...layout}
                name="email"
                rules={[
                  {
                    type: 'email',
                  },
                ]}
              >
                <InputBox placeholder="Email" />
              </Form.Item>
            </div>
            <div className="d-flex">
              <Form.Item name="profileImage">
                <Upload
                  className="upload-img"
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item name="bio">
            <CustomTextArea type="" placeholder="Bio" width="730px" />
          </Form.Item>
          <div>
            <div>
              <Button
                type="primary"
                onClick={onSubmit}
                backgroundColor="#8247E5"
              >
                Proceed
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className="d-flex col-5 ps-5 content" style={{background: "transparent"}}>
        <p style={{color: "transparent", userSelect: "none"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type.
        </p>
      </div>
    </div>
  );
}

PersonalProfileForm.propTypes = {
  form: PropTypes.object.isRequired,
};

export default memo(PersonalProfileForm);
