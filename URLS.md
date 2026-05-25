# 📍 LUMINAVERSE URL Guide

Your app now has **unique URLs for every page and article**! You can share and access articles directly.

---

## 🔗 URL Structure

### **Home Page**
```
http://localhost:5173/
http://95.217.116.91:5173/
```

### **Home Page with Specific Field**
```
http://localhost:5173/?field=tech
http://localhost:5173/?field=selling
http://localhost:5173/?field=medical
```

Available fields:
- `tech` - Technology
- `selling` - Sales & Selling
- `shop` - Shopping & Retail
- `production` - Production
- `industry` - Industry
- `medical` - Medical & Health
- `education` - Education
- `finance` - Finance
- `marketing` - Marketing

### **View Article (by ID)**
```
http://localhost:5173/article/1
http://localhost:5173/article/5
http://localhost:5173/article/36
```

### **Create New Article**
```
http://localhost:5173/create
http://localhost:5173/create?field=tech
```

### **Edit Article**
```
http://localhost:5173/edit/1
http://localhost:5173/edit/15
```

---

## 📋 All Article URLs (Sample Data)

### **Technology Articles**
- `/article/1` - Getting Started with React 18
- `/article/2` - The Future of Web Development
- `/article/3` - Cybersecurity Best Practices
- `/article/4` - Cloud Computing Platforms Compared

### **Sales & Selling Articles**
- `/article/5` - Mastering the Art of Negotiation
- `/article/6` - Building a High-Performance Sales Team
- `/article/7` - Lead Generation: Best Practices
- `/article/8` - Sales Enablement: Empowering Your Team

### **Shopping & Retail Articles**
- `/article/9` - Building Your E-commerce Store
- `/article/10` - Inventory Management Strategies
- `/article/11` - Retail Customer Service Excellence
- `/article/12` - Retail Marketing in the Digital Age

### **Production & Manufacturing Articles**
- `/article/13` - Lean Manufacturing Principles
- `/article/14` - Six Sigma: Quality and Process Improvement
- `/article/15` - Supply Chain Optimization
- `/article/16` - Industry 4.0: Smart Manufacturing

### **Industry & Industrial Articles**
- `/article/17` - Industrial IoT: Connecting Machines
- `/article/18` - Preventive Maintenance Programs
- `/article/19` - Safety Management in Industrial Settings
- `/article/20` - Regulatory Compliance in Manufacturing

### **Medical & Health Articles**
- `/article/21` - Preventive Healthcare and Wellness
- `/article/22` - Mental Health: Breaking the Stigma
- `/article/23` - Nutrition: Eating for Health
- `/article/24` - Healthcare Technology Innovation

### **Education & Learning Articles**
- `/article/25` - The Future of Online Learning
- `/article/26` - Effective Teaching Strategies
- `/article/27` - Curriculum Design and Development
- `/article/28` - Inclusive Education: Supporting All Learners

### **Finance & Investment Articles**
- `/article/29` - Personal Finance Fundamentals
- `/article/30` - Investment Strategies for Beginners
- `/article/31` - Business Finance and Accounting
- `/article/32` - Cryptocurrency and Digital Assets

### **Marketing & Branding Articles**
- `/article/33` - Content Marketing Strategy
- `/article/34` - Social Media Marketing Best Practices
- `/article/35` - SEO and Search Engine Marketing
- `/article/36` - Email Marketing That Converts

---

## 🎯 How to Use URLs

### **1. Share an Article**
Each article has a unique URL. To share:

1. Open the article
2. Look for the **Share** button (appears when you hover over the article)
3. Click **Copy** to copy the URL
4. Or manually copy from the URL bar: `/article/1`
5. Share with anyone on your network!

### **2. Access Article Directly**
- On your network: `http://95.217.116.91:5173/article/5`
- Anyone with the URL can view it
- URL contains the article ID, so it loads instantly

### **3. Go to Specific Field**
- Homepage with Tech articles: `/?field=tech`
- Homepage with Medical articles: `/?field=medical`
- Bookmarks remember which field you're in

### **4. Create Article in Specific Field**
- Create in Tech field: `/create?field=tech`
- Create in Sales field: `/create?field=selling`

---

## 💾 Shareable Article Links

**Example sharing links (all on your network):**

```
Tech Article:
http://95.217.116.91:5173/article/1

Medical Article:
http://95.217.116.91:5173/article/21

Marketing Article:
http://95.217.116.91:5173/article/33
```

---

## 🔄 Browser Navigation

✅ Back/Forward buttons work
✅ Bookmarks remember exact page
✅ Copy URL from address bar to share
✅ Direct links open correct article
✅ URL updates when you navigate

---

## 📱 Example: Accessing on Another Device

**On your computer:**
```
http://localhost:5173/article/5
```

**On another device (phone/tablet):**
```
http://95.217.116.91:5173/article/5
```

Both URLs show the **same article**!

---

## ✨ Features

✅ Every page has a unique URL
✅ Copy button to share article URLs
✅ URLs include article IDs for direct access
✅ Field parameter preserves your navigation
✅ Browser history works correctly
✅ Bookmarks save exact location
✅ Share URLs with anyone on your network

---

## 🚀 Going Live?

When you deploy to the internet, update the base URL:

**Local Network:**
```
http://95.217.116.91:5173/article/1
```

**After deploying to Netlify:**
```
https://luminaverse.netlify.app/article/1
```

**After deploying to Vercel:**
```
https://luminaverse.vercel.app/article/1
```

The URLs remain the same structure - just the domain changes!
