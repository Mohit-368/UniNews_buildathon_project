# UniNews

🌐 UniNews – A React web app that verifies the credibility of news articles using text or URL input. Leveraging free AI-powered APIs, UniNews analyzes and scores news for authenticity, bias, and trust, helping users identify reliable information quickly.

# Features

1. Accepts news article URL or pasted text
2. Evaluates news credibility using AI (Free APIs only)
3. Displays trust score and key analysis metrics
4. Responsive design with Tailwind CSS
5. Clean, intuitive UI with error feedback
6. Highlights fact-checked sources and possible red flags
7. Instant link preview and news text analysis
8. Loading spinners and result animations
9. Share screened articles easily
10. Works on all device sizes

# Tech Stack

| Technology               | Purpose                          |
| ------------------------ | -------------------------------- |
| **React.js**             | Frontend framework               |
| **Tailwind CSS**         | Styling                          |
| **Free AI/Verification API** | News authenticity check      |
| **Framer Motion**        | UI animations                    |

# Installation

1. Clone the repository

<pre>
git clone https://github.com/your-username/uninews.git
cd uninews
</pre>

2. Install dependencies

<pre>
npm install
</pre>

3. 🔑 Configure free API
- Register and obtain an API key from a recommended free AI or verification service
- Update the API key in the `.env` file or in `/src/api.js` as instructed

4. Run the app

<pre>
npm run dev
</pre>

5. Open in browser

<pre>
http://localhost:5173
</pre>

# Folder Structure

<pre>
UniNews/
│
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── cred.jsx
│   │   ├── footer.jsx
│   │   ├── home.jsx
│   │   ├── navbar.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js

</pre>



# Preview
![1](https://github.com/user-attachments/assets/9afbc601-5132-4b7d-9c45-8e6ff739b6f8)
![2](https://github.com/user-attachments/assets/89f642e1-5e69-49cd-9f75-c7883799557f)
![3](https://github.com/user-attachments/assets/4b986345-7e0f-4d5d-8100-db6421825156)


# Future Improvements

1. Add browser extension support
2. Multi-language news verification
3. Save credibility history locally
4. Integrate community-driven flagging

# Contributing

Contributions and feature requests welcome!  
Fork, open issues, or submit pull requests.

# License

This project is licensed under MIT License – free to use and modify.

## 💬 Connect with Me

👨‍💻 **Mohit Kumar**  
🔗 [LinkedIn](https://www.linkedin.com/in/mohitkumar368)

