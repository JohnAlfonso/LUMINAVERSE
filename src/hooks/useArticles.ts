import { useState, useEffect } from 'react'
import { Article, FieldType } from '../types'

const STORAGE_KEY = 'luminaverse_articles'
const ARTICLES_JSON_URL = '/articles.json'

// Fallback articles if JSON can't be loaded
const defaultArticles: Article[] = [
  // TECHNOLOGY FIELD (4 articles)
  {
    id: '1',
    title: 'Getting Started with React 18',
    excerpt: 'Learn the fundamentals of React 18 and discover new features that improve performance and developer experience.',
    content: 'React 18 brings concurrent features, automatic batching, and improved suspense handling. In this comprehensive guide, we explore each feature with practical examples and best practices. React has evolved significantly, and understanding these new capabilities will help you build faster, more responsive applications. Topics covered include useTransition, useDeferredValue, and automatic batching behavior.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    field: 'tech' as FieldType,
    category: 'Web Dev',
    readTime: 8,
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    excerpt: 'Exploring emerging trends and technologies that will shape web development in 2024 and beyond.',
    content: 'Web development is constantly evolving. From AI-powered tools to edge computing, the landscape is changing rapidly. We examine the shift towards serverless architecture, the rise of WebAssembly, and how APIs are becoming more intelligent. Let\'s explore what\'s coming next and how to stay ahead of the curve. Understanding these trends will help you prepare for the future.',
    author: 'Mike Chen',
    date: '2024-01-10',
    field: 'tech' as FieldType,
    category: 'AI/ML',
    readTime: 9,
  },
  {
    id: '3',
    title: 'Cybersecurity Best Practices for 2024',
    excerpt: 'Essential security measures every developer and organization should implement.',
    content: 'Cybersecurity threats are evolving faster than ever. In this article, we cover the latest security threats, best practices for authentication, encryption strategies, and how to build secure applications from the ground up. Learn about zero-trust architecture, multi-factor authentication, and common vulnerabilities to avoid. Security is not optional—it\'s a fundamental requirement.',
    author: 'David Lee',
    date: '2024-01-12',
    field: 'tech' as FieldType,
    category: 'Cybersecurity',
    readTime: 11,
  },
  {
    id: '4',
    title: 'Cloud Computing Platforms Compared',
    excerpt: 'AWS, Google Cloud, and Azure: Which platform is right for your business?',
    content: 'Choosing the right cloud platform is critical for modern businesses. We compare AWS, Google Cloud Platform, and Microsoft Azure across pricing, features, scalability, and ease of use. Each platform has unique strengths: AWS offers the broadest service range, Google excels in data analytics, while Azure integrates seamlessly with Windows environments. Learn which is best for your needs.',
    author: 'Jennifer Park',
    date: '2024-01-08',
    field: 'tech' as FieldType,
    category: 'Cloud',
    readTime: 10,
  },

  // SALES & SELLING FIELD (4 articles)
  {
    id: '5',
    title: 'Mastering the Art of Negotiation',
    excerpt: 'Key strategies to win negotiations and close deals successfully with confidence.',
    content: 'Negotiation is a critical skill in sales. Understanding your counterpart\'s needs, maintaining rapport, and knowing when to compromise are essential. We cover the proven techniques used by top sales professionals to achieve win-win outcomes. Learn about anchoring, BATNA (Best Alternative to Negotiated Agreement), and how to read body language to understand real objections versus price objections.',
    author: 'James Wilson',
    date: '2024-01-08',
    field: 'selling' as FieldType,
    category: 'Negotiation',
    readTime: 9,
  },
  {
    id: '6',
    title: 'Building a High-Performance Sales Team',
    excerpt: 'Strategies for recruiting, training, and motivating top sales talent.',
    content: 'Building a successful sales team requires more than hiring experienced salespeople. It requires a strong culture, clear processes, and continuous coaching. We discuss how to create a sales environment where people want to work, how to structure compensation plans that align with company goals, and how to measure and improve individual performance. Discover tools for managing a distributed sales team.',
    author: 'Michelle Brown',
    date: '2024-01-05',
    field: 'selling' as FieldType,
    category: 'Sales Funnel',
    readTime: 8,
  },
  {
    id: '7',
    title: 'Lead Generation: Best Practices',
    excerpt: 'Proven methods to attract and qualify sales leads for your business.',
    content: 'Quality leads are the lifeblood of any sales organization. This guide covers both inbound and outbound lead generation strategies including content marketing, email campaigns, LinkedIn outreach, and cold calling. Learn how to qualify leads using frameworks like BANT (Budget, Authority, Need, Timeline) and MQL/SQL scoring. Explore tools and technologies that can automate and improve your lead generation efforts.',
    author: 'Thomas Anderson',
    date: '2024-01-02',
    field: 'selling' as FieldType,
    category: 'Lead Generation',
    readTime: 10,
  },
  {
    id: '8',
    title: 'Sales Enablement: Empowering Your Team',
    excerpt: 'Tools, resources, and training that help salespeople sell more effectively.',
    content: 'Sales enablement is about giving your team the tools they need to succeed. From CRM systems to battle cards and sales collateral, we explore what modern sales teams need. We discuss how to create effective training programs, maintain updated competitive intelligence, and use data analytics to identify coaching opportunities. See how leading companies are using AI and machine learning to assist their sales teams.',
    author: 'Rachel Martinez',
    date: '2024-01-01',
    field: 'selling' as FieldType,
    category: 'CRM',
    readTime: 9,
  },

  // SHOPPING & RETAIL FIELD (4 articles)
  {
    id: '9',
    title: 'Building Your E-commerce Store in 2024',
    excerpt: 'Complete guide to launching and growing your online retail business successfully.',
    content: 'E-commerce is booming with opportunities! Learn how to select the right platform, optimize product listings, manage inventory, and create a seamless customer experience. We compare Shopify, WooCommerce, BigCommerce, and custom solutions. Discover conversion rate optimization techniques, user experience best practices, and how to reduce cart abandonment. Build a store that sells.',
    author: 'Lisa Anderson',
    date: '2024-01-06',
    field: 'shop' as FieldType,
    category: 'E-commerce',
    readTime: 11,
  },
  {
    id: '10',
    title: 'Inventory Management Strategies',
    excerpt: 'Master inventory control to reduce costs and improve customer satisfaction.',
    content: 'Effective inventory management directly impacts profitability. We cover demand forecasting, safety stock calculations, reorder points, and inventory turnover ratios. Learn the difference between FIFO and LIFO, how to use ABC analysis to prioritize high-value items, and when to implement just-in-time (JIT) inventory. Discover tools and software that can automate inventory tracking across multiple locations.',
    author: 'Kevin Davis',
    date: '2024-01-03',
    field: 'shop' as FieldType,
    category: 'Inventory',
    readTime: 9,
  },
  {
    id: '11',
    title: 'Retail Customer Service Excellence',
    excerpt: 'Creating exceptional customer experiences that build loyalty and repeat business.',
    content: 'In retail, customer service is your competitive advantage. We explore omnichannel service strategies that seamlessly integrate online, phone, email, and in-store support. Learn how to handle difficult customers, empower employees to solve problems, and use customer feedback to drive improvements. Discover best practices from companies like Nordstrom and Apple that excel at customer service.',
    author: 'Jennifer Taylor',
    date: '2024-12-31',
    field: 'shop' as FieldType,
    category: 'Customer Service',
    readTime: 8,
  },
  {
    id: '12',
    title: 'Retail Marketing in the Digital Age',
    excerpt: 'Strategies to drive foot traffic and online sales in the competitive retail environment.',
    content: 'Modern retail marketing combines digital and physical strategies. We cover location-based marketing, social media strategies, email campaigns, and loyalty programs. Learn how to use foot traffic data to optimize store layouts, implement geofencing to attract nearby customers, and create social media content that drives sales. Explore the role of influencer partnerships in modern retail.',
    author: 'Amanda Wilson',
    date: '2024-12-28',
    field: 'shop' as FieldType,
    category: 'Promotions',
    readTime: 7,
  },

  // PRODUCTION & MANUFACTURING FIELD (4 articles)
  {
    id: '13',
    title: 'Lean Manufacturing Principles',
    excerpt: 'Optimize production efficiency by eliminating waste and improving processes continuously.',
    content: 'Lean manufacturing has revolutionized how factories operate worldwide. By focusing on value-added activities and eliminating waste (Muda), companies achieve better quality and lower costs. We explore the five lean principles: define value, map value streams, create flow, establish pull systems, and pursue perfection. Learn implementation strategies with real-world examples from Toyota and other manufacturing leaders.',
    author: 'Robert Martinez',
    date: '2024-01-04',
    field: 'production' as FieldType,
    category: 'Lean',
    readTime: 12,
  },
  {
    id: '14',
    title: 'Six Sigma: Quality and Process Improvement',
    excerpt: 'Data-driven methodology for reducing defects and variation in manufacturing.',
    content: 'Six Sigma is a disciplined approach to improving quality by reducing process variation. We cover DMAIC (Define, Measure, Analyze, Improve, Control) methodology and how to achieve Six Sigma certification levels (Yellow Belt, Green Belt, Black Belt). Learn how to use statistical analysis, hypothesis testing, and root cause analysis to identify and eliminate quality issues. See how companies like General Electric and Motorola achieved significant improvements.',
    author: 'Christopher Brown',
    date: '2024-01-01',
    field: 'production' as FieldType,
    category: 'Six Sigma',
    readTime: 11,
  },
  {
    id: '15',
    title: 'Supply Chain Optimization',
    excerpt: 'Streamline your supply chain to reduce costs and improve delivery performance.',
    content: 'An optimized supply chain is crucial for manufacturing success. We discuss supplier selection and management, inventory optimization, demand forecasting, and logistics planning. Learn how to implement just-in-time (JIT) delivery, collaborate with suppliers using vendor-managed inventory (VMI), and use supply chain visibility tools. Explore how companies are building resilience and flexibility into supply chains post-pandemic.',
    author: 'Patricia Johnson',
    date: '2023-12-29',
    field: 'production' as FieldType,
    category: 'Supply Chain',
    readTime: 10,
  },
  {
    id: '16',
    title: 'Industry 4.0: Smart Manufacturing',
    excerpt: 'Digital transformation and automation technologies for next-generation factories.',
    content: 'Industry 4.0 represents the fourth industrial revolution, combining IoT, AI, and cloud computing with manufacturing. We explore smart sensors, predictive maintenance, robotic process automation, and data analytics. Learn how connected machines communicate in real-time, how AI predicts equipment failures before they occur, and how cloud platforms integrate manufacturing data across facilities. See how digital transformation is increasing productivity and reducing downtime.',
    author: 'Michael Zhang',
    date: '2023-12-26',
    field: 'production' as FieldType,
    category: 'Automation',
    readTime: 10,
  },

  // INDUSTRY & INDUSTRIAL FIELD (4 articles)
  {
    id: '17',
    title: 'Industrial IoT: Connecting Machines',
    excerpt: 'Leveraging IoT technology to improve operational efficiency and asset management.',
    content: 'Industrial IoT (IIoT) is transforming how factories and plants operate. Connected sensors collect real-time data on equipment performance, temperature, pressure, and more. We explore how to implement IIoT systems, manage data collection at scale, and derive actionable insights. Learn about edge computing for processing data locally, security considerations for industrial networks, and ROI calculation for IIoT investments.',
    author: 'David Thompson',
    date: '2023-12-24',
    field: 'industry' as FieldType,
    category: 'Industrial IoT',
    readTime: 9,
  },
  {
    id: '18',
    title: 'Preventive Maintenance Programs',
    excerpt: 'Reduce downtime and extend equipment life with strategic maintenance planning.',
    content: 'Equipment downtime is expensive. Preventive maintenance programs help avoid unexpected failures. We compare reactive maintenance, preventive maintenance, predictive maintenance, and prescriptive maintenance approaches. Learn how to create maintenance schedules based on manufacturer recommendations and historical data, implement condition monitoring, and use predictive analytics. Discover how leading industrial companies achieve 99%+ uptime.',
    author: 'Sandra Lee',
    date: '2023-12-21',
    field: 'industry' as FieldType,
    category: 'Maintenance',
    readTime: 8,
  },
  {
    id: '19',
    title: 'Safety Management in Industrial Settings',
    excerpt: 'Creating a safety culture that protects workers and prevents incidents.',
    content: 'Worker safety is paramount in industrial environments. We cover hazard identification, risk assessment, safety protocols, personal protective equipment (PPE), and incident reporting. Learn how to create a safety culture where employees actively participate in hazard identification, implement near-miss reporting systems, and conduct effective safety training. Explore OSHA regulations and how leading companies go beyond compliance.',
    author: 'James O\'Brien',
    date: '2023-12-18',
    field: 'industry' as FieldType,
    category: 'Safety',
    readTime: 9,
  },
  {
    id: '20',
    title: 'Regulatory Compliance in Manufacturing',
    excerpt: 'Navigate complex regulations while maintaining competitive advantage.',
    content: 'Manufacturing facilities must comply with numerous regulations covering environmental protection, worker safety, product quality, and more. We discuss ISO certifications, OSHA requirements, EPA standards, and industry-specific regulations. Learn how to implement compliance management systems, conduct internal audits, and prepare for external inspections. Discover how companies use compliance as a competitive advantage.',
    author: 'Victoria Martinez',
    date: '2023-12-15',
    field: 'industry' as FieldType,
    category: 'Compliance',
    readTime: 10,
  },

  // MEDICAL & HEALTH FIELD (4 articles)
  {
    id: '21',
    title: 'Preventive Healthcare and Wellness',
    excerpt: 'Why preventive care is crucial for long-term health and quality of life.',
    content: 'Preventive healthcare is the cornerstone of modern medicine. By identifying risk factors early and maintaining healthy habits, we can prevent many chronic diseases. This guide explores screening tests, vaccinations, lifestyle changes, and preventive medications. Learn about age-appropriate screening recommendations, how to manage risk factors like hypertension and cholesterol, and the role of nutrition and exercise.',
    author: 'Dr. Emma Davis',
    date: '2024-01-12',
    field: 'medical' as FieldType,
    category: 'Wellness',
    readTime: 8,
  },
  {
    id: '22',
    title: 'Mental Health: Breaking the Stigma',
    excerpt: 'Understanding mental health conditions and access to quality treatment and support.',
    content: 'Mental health is as important as physical health. We discuss common mental health conditions including depression, anxiety, PTSD, and bipolar disorder. Learn about treatment options: therapy, medication, lifestyle changes, and support networks. Explore how stigma prevents people from seeking help and what organizations are doing to normalize mental health conversations. Discover resources for mental health support and crisis intervention.',
    author: 'Dr. Michael Chen',
    date: '2024-01-10',
    field: 'medical' as FieldType,
    category: 'Mental Health',
    readTime: 10,
  },
  {
    id: '23',
    title: 'Nutrition: Eating for Health',
    excerpt: 'Science-based guidance on nutrition, diet, and healthy eating patterns.',
    content: 'Good nutrition is foundational to good health. We explore different dietary approaches—Mediterranean diet, DASH diet, plant-based nutrition—and what scientific evidence supports. Learn about macronutrients and micronutrients, how to read nutrition labels, and how to build balanced meals. Discuss common nutritional deficiencies, the role of supplements, and how nutrition varies across life stages. Understand the connection between diet and chronic disease prevention.',
    author: 'Dr. Sarah Thompson',
    date: '2024-01-08',
    field: 'medical' as FieldType,
    category: 'Nutrition',
    readTime: 9,
  },
  {
    id: '24',
    title: 'Healthcare Technology Innovation',
    excerpt: 'Emerging medical technologies improving diagnosis, treatment, and patient outcomes.',
    content: 'Healthcare technology is advancing rapidly. We explore AI in medical imaging for better diagnostic accuracy, telemedicine improving access to care, wearable devices monitoring health continuously, and personalized medicine tailoring treatment to individual genetics. Learn about electronic health records (EHR), medical robotics, and regenerative medicine breakthroughs. Discover how technology is making healthcare more accessible and effective.',
    author: 'Dr. Robert Wilson',
    date: '2024-01-05',
    field: 'medical' as FieldType,
    category: 'Research',
    readTime: 11,
  },

  // EDUCATION & LEARNING FIELD (4 articles)
  {
    id: '25',
    title: 'The Future of Online Learning',
    excerpt: 'How digital technology is transforming education and making learning accessible to all.',
    content: 'Online learning has evolved from simple video lectures to immersive, interactive experiences. We discuss learning management systems (LMS), interactive content, virtual classrooms, and adaptive learning algorithms that personalize education. Explore how online learning increases accessibility for students in remote areas and those with disabilities. Learn about microlearning, spaced repetition, and how data analytics can identify struggling students early.',
    author: 'Prof. Elizabeth Brown',
    date: '2024-01-13',
    field: 'education' as FieldType,
    category: 'EdTech',
    readTime: 10,
  },
  {
    id: '26',
    title: 'Effective Teaching Strategies',
    excerpt: 'Evidence-based methods to engage students and improve learning outcomes.',
    content: 'Effective teaching goes beyond knowledge transfer—it\'s about inspiring curiosity and critical thinking. We discuss active learning strategies, collaborative learning, problem-based learning, and project-based learning. Learn how to use formative assessment to identify misconceptions and adjust instruction. Explore the role of feedback, motivation, and classroom culture in student success. Discover how teachers can support diverse learners.',
    author: 'Prof. James Anderson',
    date: '2024-01-10',
    field: 'education' as FieldType,
    category: 'Teaching',
    readTime: 9,
  },
  {
    id: '27',
    title: 'Curriculum Design and Development',
    excerpt: 'Creating meaningful learning experiences that prepare students for the future.',
    content: 'Curriculum design is both art and science. We explore how to define learning objectives using Bloom\'s taxonomy, align assessments with objectives, and sequence content for optimal learning. Learn about backward design—starting with desired outcomes and working backward to plan instruction. Discuss how to incorporate 21st-century skills like critical thinking, creativity, communication, and collaboration. See how schools are updating curriculum for the digital age.',
    author: 'Prof. Margaret Lee',
    date: '2024-01-07',
    field: 'education' as FieldType,
    category: 'Curriculum',
    readTime: 11,
  },
  {
    id: '28',
    title: 'Inclusive Education: Supporting All Learners',
    excerpt: 'Creating classroom environments where every student can succeed and belong.',
    content: 'Inclusive education means all students learn together in general education classrooms with appropriate support. We discuss Universal Design for Learning (UDL) which makes education accessible to students with diverse learning styles and abilities. Explore accommodations for students with disabilities, cultural responsiveness in teaching, and how to create a sense of belonging for all students. Learn about differentiated instruction to meet individual student needs.',
    author: 'Dr. Patricia Davis',
    date: '2024-01-04',
    field: 'education' as FieldType,
    category: 'Student Success',
    readTime: 10,
  },

  // FINANCE & FINANCIAL FIELD (4 articles)
  {
    id: '29',
    title: 'Personal Finance Fundamentals',
    excerpt: 'Build wealth and achieve financial security through smart money management.',
    content: 'Strong personal finance skills are essential for financial wellbeing. We cover budgeting basics, emergency funds, debt management, and building credit. Learn about the power of compound interest and how to start investing early. Discuss asset allocation strategies, risk tolerance, and diversification. Explore retirement planning, insurance needs, and estate planning. Discover how technology tools can simplify personal finance management.',
    author: 'Marcus Johnson',
    date: '2024-01-14',
    field: 'finance' as FieldType,
    category: 'Investment',
    readTime: 10,
  },
  {
    id: '30',
    title: 'Investment Strategies for Beginners',
    excerpt: 'Start building your investment portfolio with confidence and knowledge.',
    content: 'Investing doesn\'t have to be complicated. We discuss stocks, bonds, mutual funds, ETFs, and how to build a diversified portfolio. Learn about dollar-cost averaging, index investing, and value vs. growth investing. Understand risk and return relationships, how to assess your risk tolerance, and when to rebalance your portfolio. Explore how robo-advisors and AI are making investing more accessible.',
    author: 'Diana Lee',
    date: '2024-01-11',
    field: 'finance' as FieldType,
    category: 'Investment',
    readTime: 9,
  },
  {
    id: '31',
    title: 'Business Finance and Accounting',
    excerpt: 'Financial management strategies for business growth and profitability.',
    content: 'Business owners need financial acumen to make good decisions. We cover financial statements—income statement, balance sheet, cash flow statement—and what they tell you about business health. Learn about profitability ratios, liquidity ratios, and efficiency metrics. Discuss cash flow management, budgeting for growth, and pricing strategies. Explore how financial planning supports strategic planning.',
    author: 'Kevin Smith',
    date: '2024-01-09',
    field: 'finance' as FieldType,
    category: 'Accounting',
    readTime: 11,
  },
  {
    id: '32',
    title: 'Cryptocurrency and Digital Assets',
    excerpt: 'Understanding blockchain technology, cryptocurrencies, and their investment potential.',
    content: 'Cryptocurrency is increasingly mainstream. We explain blockchain technology, how cryptocurrencies work, and major coins like Bitcoin and Ethereum. Discuss crypto investing, security considerations, and regulatory landscape. Learn about DeFi (Decentralized Finance), staking, and NFTs. Explore both the opportunities and risks of cryptocurrency investment. Understand how institutions are adopting digital assets.',
    author: 'Alex Rivera',
    date: '2024-01-06',
    field: 'finance' as FieldType,
    category: 'Cryptocurrency',
    readTime: 12,
  },

  // MARKETING FIELD (4 articles)
  {
    id: '33',
    title: 'Content Marketing Strategy',
    excerpt: 'Create valuable content that attracts, engages, and converts your target audience.',
    content: 'Content marketing is about providing value rather than pushing products. We discuss content strategy development, identifying audience pain points, and creating content that addresses them. Learn about different content formats—blogs, videos, podcasts, infographics—and where they perform best. Explore SEO fundamentals for content visibility, how to repurpose content, and measuring content performance. Discover how leading brands use content marketing.',
    author: 'Nicole Harris',
    date: '2024-01-13',
    field: 'marketing' as FieldType,
    category: 'Content',
    readTime: 10,
  },
  {
    id: '34',
    title: 'Social Media Marketing Best Practices',
    excerpt: 'Build authentic connections with your audience through strategic social media.',
    content: 'Social media is essential for modern marketing. We discuss platform selection based on your audience, content strategy for each platform, and community management best practices. Learn about influencer partnerships, paid social advertising, and how to measure social ROI. Explore trending strategies like TikTok marketing, LinkedIn B2B marketing, and Instagram shopping. Discover how to build authentic engagement rather than just vanity metrics.',
    author: 'Brandon Lewis',
    date: '2024-01-10',
    field: 'marketing' as FieldType,
    category: 'Social Media',
    readTime: 9,
  },
  {
    id: '35',
    title: 'SEO and Search Engine Marketing',
    excerpt: 'Get found by your customers through organic search and paid search strategies.',
    content: 'Search is where customers are actively looking for solutions. We discuss on-page SEO optimization, technical SEO, link building, and keyword research. Learn about search intent, featured snippets, and voice search optimization. Explore PPC advertising, bid strategy, and quality score optimization. Understand how to balance organic and paid search strategies. See how SEO changes with algorithm updates.',
    author: 'Rachel Thompson',
    date: '2024-01-07',
    field: 'marketing' as FieldType,
    category: 'SEO',
    readTime: 11,
  },
  {
    id: '36',
    title: 'Email Marketing That Converts',
    excerpt: 'Build engaged email lists and create campaigns that drive action and revenue.',
    content: 'Email remains one of the highest ROI marketing channels. We discuss list building strategies, email segmentation, and personalization techniques. Learn about A/B testing subject lines and content, email design best practices, and deliverability considerations. Explore automation workflows for nurturing leads and customers. Discuss the importance of compliance with email regulations like GDPR and CAN-SPAM.',
    author: 'Emily Garcia',
    date: '2024-01-04',
    field: 'marketing' as FieldType,
    category: 'Email',
    readTime: 8,
  },
]

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>(() => {
    // Try to load from localStorage first (for user's new articles)
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultArticles
  })

  // Load articles from JSON file on mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch(ARTICLES_JSON_URL)
        if (response.ok) {
          const jsonArticles = await response.json()
          // Merge JSON articles with localStorage articles
          const localArticles = localStorage.getItem(STORAGE_KEY)
          const userArticles = localArticles ? JSON.parse(localArticles) : []

          // Combine: JSON articles + any new user articles
          const merged = [...jsonArticles]
          const jsonIds = new Set(jsonArticles.map((a: Article) => a.id))

          // Add user articles that aren't in JSON
          userArticles.forEach((article: Article) => {
            if (!jsonIds.has(article.id)) {
              merged.push(article)
            }
          })

          setArticles(merged)
        }
      } catch (error) {
        console.log('Using cached articles')
      }
    }

    loadArticles()
  }, [])

  useEffect(() => {
    // Save all articles to localStorage (for persistence)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
  }, [articles])

  const addArticle = async (article: Omit<Article, 'id'>) => {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      })
      if (response.ok) {
        const data = await response.json()
        const newArticle = data.article as Article
        setArticles([newArticle, ...articles])
        return newArticle
      }
    } catch (error) {
      console.error('Error adding article:', error)
    }
  }

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (response.ok) {
        setArticles(articles.map(article =>
          article.id === id ? { ...article, ...updates } : article
        ))
      }
    } catch (error) {
      console.error('Error updating article:', error)
    }
  }

  const deleteArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setArticles(articles.filter(article => article.id !== id))
      }
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  const getArticleById = (id: string) => {
    return articles.find(article => article.id === id)
  }

  return {
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
  }
}
