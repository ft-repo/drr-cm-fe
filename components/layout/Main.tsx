import React, { useState } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { SideContent, NavContent } from '../layout'

const { Sider, Content } = Layout;

interface Props {
	children: React.ReactNode;
}

const Main: React.FC<Props> = (props) => {
	const { children } = props
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: {
			colorBgContainer,
			borderRadiusLG
		},
	} = theme.useToken();

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "Noto Sans Thai"
				}
			}}
		>
			<Layout
				style={{
					minHeight: '100dvh',
					width: '100dvw'
				}}
			>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
				>
					<SideContent />
				</Sider>
				<Layout>
					<header>
						<NavContent
							collapsed={collapsed}
							setCollapsed={setCollapsed}
						/>
					</header>
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
		</ConfigProvider>
	)
}

export default React.memo<Props>(Main)
