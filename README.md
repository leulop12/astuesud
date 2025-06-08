# FileHub Student Portal

A complete file sharing platform designed for students to upload, share, and collaborate on academic resources securely.

## 🌟 Features

- **Secure Authentication** - .edu email verification required
- **Profile Management** - Complete student profiles with academic information
- **File Upload Center** - Support for PDF, DOC, DOCX, PPT, PPTX, and images
- **Advanced Search** - Filter by course, resource type, and student
- **Access Controls** - Public, Class Only, and Private visibility settings
- **Course Integration** - Organized by academic courses and departments
- **Download Tracking** - Monitor file usage and popularity

## 🚀 Live Demo

Visit the live application: [FileHub Student Portal](https://your-username.github.io/filehub-student-portal)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📋 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/filehub-student-portal.git
cd filehub-student-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: john.doe@university.edu
- **Password**: password123

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Fork or clone this repository**

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **Push to main branch**:
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at `https://your-username.github.io/repository-name`

### Manual Deployment:

If you prefer manual deployment:

```bash
npm run build
# Deploy the dist folder to your hosting provider
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard components
│   ├── Files/          # File browser components
│   ├── Profile/        # Profile management
│   ├── Upload/         # File upload components
│   └── Layout.tsx      # Main layout component
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## 🔧 Configuration

### Environment Variables

For production deployment, you may want to configure:

- API endpoints
- Authentication providers
- File storage services

### Customization

- **Styling**: Modify Tailwind classes in components
- **Branding**: Update colors and logos in the Layout component
- **Features**: Add new components in the respective directories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/filehub-student-portal/issues) page
2. Create a new issue with detailed information
3. Contact support at support@filehub.edu

## 🎯 Roadmap

- [ ] Real backend integration
- [ ] File storage with cloud providers
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with LMS platforms

---

**Built with ❤️ for the student community**