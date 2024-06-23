import { Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login({ setData }) {
	const navigate = useNavigate();

	const login = useGoogleLogin({
		onSuccess: async (response) => {
			try {
				const { access_token } = response;
				const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: {
						Authorization: `Bearer ${access_token}`
					}
				});
				setData(data);
				toast.success(`Welcome ${data.given_name}`);
				navigate('/');
			} catch (error) {
				console.log(error);
			}
		}
	});

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '80vh'
			}}
		>
			<div>
				<GoogleButton onClick={login} />
			</div>
		</div>
	);
}
