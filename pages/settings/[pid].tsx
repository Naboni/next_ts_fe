// types
import { GetServerSideProps } from "next";
import Link from "next/link"
import { useRouter } from "next/router";
import { BiUser, BiLock, BiBell } from 'react-icons/bi'

import { getSession, useSession } from "next-auth/client";

// components
import CenterContent from "../../components/CenterContent";
import styles from './settings.module.css'
import SideMenu from "@/components/sideMenu/SideMenu";
// view
import ManageAccount from "@/views/settings/ManageAccount";
//antd
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Privacy from "@/views/settings/Privacy";
import { Roles } from "@/constants/roles";

const routes = [
    {
        name: 'Manage account',
        path: '/settings/manage-account',
        query: 'manage-account'
    },
    {
        name: 'Privacy',
        path: '/settings/privacy',
        query: 'privacy'
    }
]

export default function Shortlist() {
    const router = useRouter();

    return (
        <div className="marginTop">
            <CenterContent>
                <div className={styles.settings}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6} >
                            <SideMenu routes={routes} />
                        </Col>
                        <Col className="gutter-row" span={18}>
                            {router.query["pid"] === "manage-account" && <ManageAccount />}
                            {router.query["pid"] === "privacy" && <Privacy />}
                        </Col>
                    </Row>

                </div>
            </CenterContent>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        // ! redirecting back to home b/c if a logged in user redirected to sign in, it will again redirect to home
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
};
