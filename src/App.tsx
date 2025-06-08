import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import UploadCenter from './components/Upload/UploadCenter';
import FileBrowser from './components/Files/FileBrowser';
import ProfilePage from './components/Profile/ProfilePage';
import { User, AuthState, FileItem } from './types';
import { getCurrentUser, setCurrentUser } from './utils/auth';
import { mockFiles } from './data/mockData';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [files, setFiles] = useState<FileItem[]>(mockFiles);

  useEffect(() => {
    // Check for existing session
    const user = getCurrentUser();
    setAuthState({
      isAuthenticated: !!user,
      user,
      loading: false,
    });
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false,
    });
  };

  const handleRegister = (user: User) => {
    setCurrentUser(user);
    setAuthState({
      isAuthenticated: true,
      user,
      loading: false,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    setActiveTab('dashboard');
  };

  const handleFileUpload = (fileData: Omit<FileItem, 'id' | 'uploadedAt' | 'downloadCount'>) => {
    const newFile: FileItem = {
      ...fileData,
      id: Date.now().toString(),
      uploadedAt: new Date(),
      downloadCount: 0,
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setAuthState(prev => ({
      ...prev,
      user: updatedUser,
    }));
  };

  if (authState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FileHub...</p>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        {authMode === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    );
  }

  const renderActiveTab = () => {
    if (!authState.user) return null;

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard currentUser={authState.user} />;
      case 'upload':
        return <UploadCenter currentUser={authState.user} onFileUpload={handleFileUpload} />;
      case 'files':
        return <FileBrowser currentUser={authState.user} />;
      case 'profile':
        return <ProfilePage currentUser={authState.user} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <Dashboard currentUser={authState.user} />;
    }
  };

  return (
    <Layout
      currentUser={authState.user}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {renderActiveTab()}
    </Layout>
  );
}

export default App;