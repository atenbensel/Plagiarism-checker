# Plagiarism-checker

https://sites.google.com/view/plagiarism-checker-extension/

The Plagiarism Checker Chrome Extension allows users to check a highlighted piece of text for plagiarism. It provides a convenient way to perform plagiarism checks directly from your browser.

## Features

Right-click on any selected text and choose "Check for Plagiarism" from the context menu.
Opens a new tab with the plagiarism check results.
Customizable plagiarism detection algorithm.
Displays a small banner ad at the top to support the extension's availability for educators.

## Installation

Clone or download this repository to your local machine.
Open Google Chrome and type chrome://extensions in the address bar.
Toggle on the "Developer mode" option at the top right corner of the page.
Click on the "Load unpacked" button.
Select the cloned/downloaded folder of the extension to install it.

Before using the extension, you need to set up a Google API key to access the Google Custom Search API. Follow the steps below to obtain an API key:

1. Go to the [Google Developers Console](https://console.developers.google.com/).

2. Create a new project or select an existing one.

3. Enable the **Custom Search API** for your project.

4. Go to the **Credentials** page and create a new API key.

5. Copy the generated API key.

6. Open the `background.js` file in the extension folder.

7. Replace the placeholder value `'YOUR_GOOGLE_API_KEY'` with your actual API key.

8. Save the file.


## Usage

Highlight a piece of text on any webpage.
Right-click on the selected text.
From the context menu, choose "Check for Plagiarism."
A new tab will open with the plagiarism check results.


## Customization

To customize the plagiarism detection algorithm or implement your own logic:

Open the background.js file.
Locate the detectPlagiarism function.
Implement your custom plagiarism detection algorithm within the function.
Modify the return statement to indicate the plagiarism result.

## Advertising
To keep this extension free for educators, we utilize ads. The ads are displayed as a small banner at the top of the extension's popup window.

## Credits
This Chrome extension was created by Anna ten Bensel.
