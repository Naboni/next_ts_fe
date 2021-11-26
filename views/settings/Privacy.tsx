import React, { useState } from "react";

import { Button, Form, Input, message } from 'antd'
import classes from '@/pages/settings/settings.module.css'
import { changePassword } from 'backend-utils/user-utils';

export default function Privacy() {
    const [loggingIn, setLoggingIn] = useState(false);

    const onFinish = (values: any) => {
        setLoggingIn(true);
        changePassword(values.newPassword, values.oldPassword)
            .then(
                res => res.json()
            ).then(
                data => {
                    if (!data.success) {
                        message.error("Wrong credential.");
                    } else {
                        message.success("Changed password successfully.")
                    }
                }
            )
            .catch(error => {
                message.error("Sonthing went wrong.");
            }).finally(() => setLoggingIn(false))
    };

    const onFinishFailed = (errorInfo: any) => {
    };
    return (
        <div className={classes.header}>
            <h3>Change Password</h3>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    name="oldPassword"
                    label="Old Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 16 }}>
                    <Button
                        loading={loggingIn}
                        type="primary"
                        danger
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
