import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Spin, theme } from 'antd';
import { SideContent, NavContent } from '../layout'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFullscreenLoading } from '@/store/features/layoutSlice';
import { Credential, setCredential } from '@/store/features/authSlice';

const { Sider, Content } = Layout;

interface Props {
	children: React.ReactNode;
	credential: Credential;
}

const Main: React.FC<Props> = (props) => {
	const { children, credential } = props
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: {
			colorBgContainer,
			borderRadiusLG
		},
	} = theme.useToken();
	const { fullscreen_loading } = useAppSelector(state => state.layout)
	const dispatch = useAppDispatch()
	const updateRef = useRef<boolean>(false)

	const updateUser = useCallback(() => {
		dispatch(setFullscreenLoading(true))
		try {
			dispatch(setCredential({
				credential: { ...credential }
			}))
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message)
			} else {
				console.error(error)
			}
		} finally {
			dispatch(setFullscreenLoading(false))
		}
	}, [credential, dispatch])

	useEffect(() => {
		if (credential) {
			// IF TRUE
			if (updateRef.current) return
			// IF FALSE
			updateRef.current = true
			// UPDATE USER
			updateUser()
		}
	}, [credential, updateUser])

	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "Noto Sans Thai"
				}
			}}
		>
			<Spin spinning={fullscreen_loading}>
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
			</Spin>
		</ConfigProvider>
	)
}

export default React.memo<Props>(Main)
