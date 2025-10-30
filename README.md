# Desktop Clone 🖥️

A fully interactive MacOS-style desktop interface built with modern web technologies. Experience the sleek MacOS interface right in your browser with smooth animations, functional apps, and an intuitive user interface.



# ✨ Features
🎯 Core Interface
Interactive Dock with smooth hover animations and app labels

Multiple App Windows that can be opened, closed, and managed

Desktop Background with dynamic wallpaper options

Menu Bar with system status and controls

Responsive Design that works across different screen sizes

# 📱 Included Applications
Finder - File browser interface

Launchpad - App launcher with grid layout

Photos - Image gallery viewer

Calculator - Fully functional calculator

Calendar - Interactive calendar app

VS Code - Code editor interface

App Store - App discovery interface

Portfolio - Developer portfolio showcase

Wallpaper - Desktop background customizer

# 🎨 Visual Excellence
Smooth Animations using CSS transitions and transforms

MacOS-Styled UI with authentic colors and typography

Glass Morphism Effects with backdrop blur

Hover Interactions providing visual feedback

Professional Icons matching MacOS design language

# 🛠 Tech Stack
Frontend Framework: SvelteKit

Styling: TailwindCSS

3D Graphics: Three.js

Icons: Custom SVG & PNG assets

Deployment: Vercel

Package Manager: npm

# 🚀 Live Demo
Experience the MacOS clone live:
https://mac-operating-system-ozap.vercel.app

# 📦 Installation
Prerequisites
Node.js 16+ installed

npm or yarn package manager

Local Development

Clone the repository


git clone https://github.com/Shaswatchoudhary/Mac-operating-system.git

cd Mac-operating-system

Install dependencies

npm install

Start development server


npm run dev

Open in browser

http://localhost:5173

Building for Production

npm run build

Preview Production Build

npm run preview


# 🎮 How to Use
Basic Navigation
Click any Dock icon to open the corresponding application

Hover over Dock icons to see app names and enjoy animations

Drag windows by their title bars

Close apps using the red close button (●) in window title bars

Open multiple apps simultaneously - they stack intelligently

App Specific Features
Portfolio App: Interactive 3D character with navigation sections

Calculator: Full mathematical operations with history

Photos: Browse through image galleries

Calendar: Navigate through months and view dates

Launchpad: Grid view of all available applications

# 🔧 Customization
Adding New Apps
Create new component in src/lib/components/Apps/

Add app metadata to the apps array in Dock.svelte

Include appropriate icon in src/lib/assets/static/icons/

Modifying Styles
Global styles are managed through TailwindCSS

Component-specific styles use Svelte's scoped CSS

Color scheme can be modified in tailwind.config.js

Changing Wallpapers
Add new wallpaper images to src/lib/assets/static/wallpapers/ and update the wallpaper component.

# 🌟 Highlights
Performance Optimizations
Lazy loading of app components

Efficient state management with Svelte stores

Optimized animations using CSS transforms

Three.js scene optimization for smooth 3D rendering

User Experience
Intuitive interface mimicking real MacOS

Smooth transitions between states

Responsive feedback for all interactions

Accessibility considerations with proper ARIA labels

# 🤝 Contributing
We welcome contributions! Here's how you can help:

Reporting Issues
Use GitHub Issues to report bugs or suggest features

Include detailed descriptions and steps to reproduce

Add screenshots for visual issues

Submitting Pull Requests
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow existing code style and structure

Add comments for complex logic

Update documentation when needed

Test across different browsers

# 🐛 Known Issues
Mobile responsiveness needs improvement

Some animations may lag on older devices

Limited app functionality in some mock applications

# 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

# 👨‍💻 Author
Shaswat Choudhary

GitHub: @Shaswatchoudhary

LinkedIn: Shaswat Choudhary

Portfolio: Live Demo

# 🙏 Acknowledgments
Design inspired by Apple's MacOS interface

Icons and UI patterns from Apple Human Interface Guidelines

Three.js community for 3D rendering examples

Svelte community for component patterns and best practices

<div align="center">

⭐️ Don't forget to star this repository if you find it interesting!
Built with ❤️ using SvelteKit and modern web technologies

</div>
