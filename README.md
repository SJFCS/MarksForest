> This project is forked from [Pintree/pintree-old-dev](https://github.com/Pintree-io/pintree/tree/pintree-old-dev), with new features and improvements

Pintree is an open-source project that aims to convert browser bookmarks into a navigation website. With just a few simple steps, you can transform your bookmarks into a beautiful and user-friendly navigation page.

![](./assets/preview.png)

# New Features

- **Added support for both Google Bookmarks and Pintree bookmarks**
- Upgraded Tailwind and enhanced development experience
- Improved icon fetching with Service Worker caching for offline support
- Enhanced sidebar with manual size adjustment and folder layout fixes
- Implemented URL path support
- Added animated search bar positioning
- Introduced mobile sidebar support with dark mode and search functionality
- Optimized bookmark card layout with responsive design and animations
- Implemented new breadcrumb navigation

# Development

To set up the development environment:

1. Fork the project
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/MarksForest.git`
3. Navigate to the project directory: `cd MarksForest`
4. Install dependencies: `npm install`
5. Start the development server: `npm run dev`

# Usage

## Option 1: Using Google Chrome Bookmarks

1. Locate your Chrome bookmarks file:

   - Linux: `~/.config/google-chrome/Default/Bookmarks`
   - Windows: `C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default\Bookmarks`
   - macOS: `~/Library/Application Support/Google/Chrome/Default/Bookmarks`

2. Copy this file to `json/marksforest.json` in the project directory.

## Option 2: Using Pintree Bookmarks Exporter

1. Install the [Pintree Bookmarks Exporter](https://chromewebstore.google.com/detail/pintree-bookmarks-exporte/mjcglnkikjidokobpfdcdmcnfdicojce) Chrome extension.
2. Export your bookmarks and save the JSON file.
3. Replace `json/marksforest.json` in the project directory with this exported file.

## Running the Application

To start the application using Docker:

1. Navigate to the docker directory: `cd docker`
2. Run: `docker-compose up -d`
3. visit http://localhost:8080

The application should now be accessible through your web browser.
