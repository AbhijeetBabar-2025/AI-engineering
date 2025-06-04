function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    window.handleCredentialResponse = (response) => {
      const token = response.credential;
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Logged in as:', payload.email);
      setLoggedIn(true);
    };

    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_CLIENT_ID',
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin'),
        { theme: 'outline', size: 'large' },
      );
    }
  }, []);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return loggedIn ? <LandingPage /> : <LoginPage onLogin={handleLogin} />;
}

function LoginPage({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <div id="google-signin" style={{ marginTop: '1em' }}></div>
    </div>
  );
}

function LandingPage() {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
