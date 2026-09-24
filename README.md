# Before You Throw It

A basic, working **frontend-only prototype** for a college project about reducing waste.

## Main idea

**Identify → Understand Condition → Get Recommendations → Choose an Action → Track Impact**

The prototype helps a user think about whether an unwanted item can be:

- Reused
- Repaired
- Donated
- Sold
- Upcycled
- Recycled

Disposal is shown as the last option.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons
- Chart.js (small doughnut chart on the Impact page)

There is no backend, database, AI, image recognition, real API, or Google Maps.

## Folder structure

```text
before-you-throw-it/
├── index.html
├── check-item.html
├── recommendations.html
├── diy.html
├── sorting-guide.html
├── impact.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── items.js
│   ├── recommendations.js
│   ├── diy.js
│   ├── sorting.js
│   ├── impact.js
│   └── storage.js
└── README.md
```

## How to run in VS Code or Cursor

The HTML files live in the inner `before-you-throw-it` folder. Cursor often opens the parent folder, so use one of these methods instead of the built-in HTML preview (that preview does not load local CSS/JS the same way Live Server does).

### Option A — Live Server (same as VS Code)

1. Install the **Live Server** extension in Cursor (`ritwickdey.LiveServer`). Cursor does not reuse VS Code extensions automatically.
2. Open this project folder in Cursor.
3. Click **Go Live** in the status bar, or right-click `before-you-throw-it/index.html` and choose **Open with Live Server**.
4. The site should open in Chrome at `http://127.0.0.1:5500`.

### Option B — Run and Debug (no extension)

1. Press **F5** or choose **Run Before You Throw It**.
2. That starts a local server from the inner folder and opens Chrome.

### Option C — Terminal

From the inner `before-you-throw-it` folder:

```text
python -m http.server 5500 --bind 127.0.0.1
```

Then open `http://127.0.0.1:5500` in a browser.

Test the main flow:

- Check an Item
- Select item and condition
- Get Recommendations
- Choose an Action
- Open My Impact

The Bootstrap, Bootstrap Icons, and Chart.js files are loaded from CDN links, so an internet connection is needed for those libraries.

## Local storage

The prototype stores:

- Selected item and condition
- Preferred action
- Saved DIY ideas
- Completed actions

Data stays in the browser using `localStorage`.

## Demo rule-based data

The recommendation system is intentionally simple. It uses the item data in `js/items.js` and does not use AI.

## Future backend

This version is intentionally frontend-only.

```js
// FUTURE BACKEND:
// This demo data can later be replaced with data received
// from a Java Spring Boot REST API and MySQL database.
```

A future version could connect the frontend to a backend, but no backend is included in this prototype.

## Accessibility

The prototype uses semantic HTML, form labels, readable contrast, keyboard-friendly controls, clear button names, and responsive Bootstrap layouts.
