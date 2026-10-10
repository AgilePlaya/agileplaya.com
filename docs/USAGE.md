# Usage Guide

This guide explains how to use and manage the developer portfolio website on a day-to-day basis.

## Updating Content

The core tenet of this project is that you should not need to write React code to update your portfolio. All content is driven by structured data files.

1. **Locate Data Files**: Navigate to the `src/data/` directory.
2. **Modify Content**: Open the corresponding `.json` file for the section you wish to update.
    - `projects.json`: Add, edit, or remove objects from the array to update your portfolio items.
    - `about.json`: Update your bio, taglines, and social links.
    - `skills.json`: Manage the list of your technical skills.
3. **Save and Deploy**: Simply commit and push your changes. If hosted on Vercel, the site will automatically rebuild and deploy the new content.

## Adding Images

If you add a new project and need to include an image:
1. Place the image file inside the `public/images/` directory (e.g., `public/images/my-project.jpg`).
2. Reference the image in your `projects.json` file using an absolute path relative to the public folder (e.g., `"/images/my-project.jpg"`).

## Theme Toggling

The site features a Light/Dark mode toggle located at the top right corner. The state is saved to the user's local storage and respects their system preferences by default.
