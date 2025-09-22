import React, { useCallback, useMemo, useState } from 'react';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import menu from '@/menu';
import Image from 'next/image';
import DPT_LOGO from '@/public/image/dpt-logo.png'
import {
	FaGrip,
	FaVideo,
	FaExplosion,
	FaChartSimple,
	FaTrafficLight,
	FaPersonWalking,
	FaBolt,
	FaTv,
	FaCarTunnel,
	FaTruckFast
} from "react-icons/fa6";
import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

interface Props {
	children: React.ReactNode;
}

const ICON_LIST: any = {
	FaGrip,
	FaVideo,
	FaExplosion,
	FaChartSimple,
	FaTrafficLight,
	FaPersonWalking,
	FaBolt,
	FaTv,
	FaCarTunnel,
	FaTruckFast
}

const PATH_LIST: string[] = [
	'/admin/dashboard',
	'/admin/cctv',
	'/admin/analytic',
	'/admin/counting',
	'/admin/traffic',
	'/admin/crosswalk',
	'/admin/lightning',
	'/admin/vms',
	'/admin/tunnel',
	'/admin/wim',
]

const Main: React.FC<Props> = (props) => {
	const { children } = props
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const router = useRouter()

	const Icon = useCallback((iconName: any, { ...props }) => {
		const IconResult = ICON_LIST[iconName]
		if (typeof IconResult !== 'undefined') {
			return <IconResult {...props} />
		}
		return
	}, [])

	const renderMenu = useMemo(() => {
		return menu['ADMIN'].map((item) => {
			return {
				...item,
				icon: Icon(item.icon, {})
			}
		})
	}, [Icon])

	return (
		<Layout
			style={{
				minHeight: '100dvh',
				width: '100dvw'
			}}
		>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<header className='flex items-center justify-center py-3'>
					<Image
						src={DPT_LOGO}
						alt='dpt-logo'
						width={50}
						height={50}
					/>
				</header>
				<main>
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['1']}
						items={renderMenu}
						onClick={(e) => router.push(PATH_LIST[e.key as any])}
					/>
				</main>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer
					}}
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}

export default React.memo<Props>(Main)
