const doLogin = async (username, password) => {
	try {
		const response = await fetch('http://localhost:3002/api/v1/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		// Handle successful login (e.g., store token, redirect user)
		console.log('Login successful', data);
	} catch (error) {
		console.error('Login failed:', error);
	}
};

const doSignup = async (userData) => {
	try {
		const response = await fetch('http://localhost:3002/api/v1/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.reason || `HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		// Handle successful signup (e.g., redirect user, show success message)
		console.log('Signup successful', data);
		return data;
	} catch (error) {
		console.error('Signup failed:', error);
		throw error;
	}
};

export { doLogin, doSignup };
