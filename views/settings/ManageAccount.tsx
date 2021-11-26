import { Button, Form, Input, Row } from 'antd'
import classes from '@/pages/settings/settings.module.css'
import { useSession } from 'next-auth/client';

export default function ManageAccount() {
    const [session, _] = useSession();
    const user = session?.user as any;
    console.log(user)
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={classes.header}>
            <h3>Update profile</h3>
            <Form
                name="basic"
                // labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
                initialValues={{
                    ["email"]: user.email
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input bordered={false} disabled />
                </Form.Item>

                {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>
        </div>
    )
}
