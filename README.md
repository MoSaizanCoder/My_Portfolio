# Mohammad Saizan Ansari | Portfolio

A responsive, single-page portfolio presenting projects and experience in data analytics, machine learning, AI, and database design.

**Live site:** [mosaizancoder.github.io/My_Portfolio](https://mosaizancoder.github.io/My_Portfolio/)

## Features

- Responsive Home, About, Projects, Experience, Education, Skills, and Contact sections
- Direct links to project applications, notebooks, and documentation
- Four downloadable resume versions
- Contact form connected to the existing Google Apps Script endpoint
- Deferred particle background and offscreen section rendering to prioritize the initial view
- Reduced-motion support

## Built With

- HTML5
- CSS3
- JavaScript
- Font Awesome
- tsParticles, loaded after the initial page render

This is a static site; no package installation or build step is required.

## Run Locally

From the repository root in PowerShell:

```powershell
py -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Project Structure

```text
My_Portfolio/
├── index.html
├── style.css
├── script.js
└── assets/
    └── resumes/
        ├── Saizan_Resume.pdf
        ├── Saizan_Resume_ML.pdf
        ├── Saizan_Resume_NLP.pdf
        └── Saizan_Resume_Python.pdf
```

## Contact Form

The form posts to the existing Google Apps Script endpoint configured in the `action` attribute of the form in `index.html`. Its field names are `Name`, `Email`, and `Message`. If the Apps Script deployment changes, update that action URL.

## GitHub Pages

The site is configured for deployment from the `main` branch at the repository root. In the repository settings, select **Pages**, then choose **Deploy from a branch**, `main`, and `/(root)`.
