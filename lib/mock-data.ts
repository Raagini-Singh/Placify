export type ApplicationStatus = "applied" | "interview" | "selected" | "rejected"

export interface Opportunity {
  id: string
  company: string
  role: string
  cohort: string
  location: string
  salary: string
  matchPercentage: number
  deadline: Date
  status: ApplicationStatus
  description: string
  requirements: string[]
  companyType?: string
  industry?: string
  logoUrl?: string
}

export interface Company {
  id: string
  name: string
  logoUrl: string
  type: string
  industry: string
  locations: string[]
  hiringRoles: string[]
  fresherFriendly: boolean
  avgPackage: string
  description: string
}

// Generate deadlines relative to now for demo
const now = new Date()
const hoursFromNow = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000)

export const companies: Company[] = [
  {
    id: "c1",
    name: "Google",
    logoUrl: "https://www.google.com/favicon.ico",
    type: "MNC",
    industry: "Technology",
    locations: ["Bangalore", "Hyderabad", "Gurgaon"],
    hiringRoles: ["SDE", "Data Analyst", "ML Engineer"],
    fresherFriendly: true,
    avgPackage: "25 LPA",
    description: "World's leading search and cloud company.",
  },
  {
    id: "c2",
    name: "Microsoft",
    logoUrl: "https://www.microsoft.com/favicon.ico",
    type: "MNC",
    industry: "Technology",
    locations: ["Hyderabad", "Bangalore", "Noida"],
    hiringRoles: ["SDE", "Cloud Engineer", "PM"],
    fresherFriendly: true,
    avgPackage: "22 LPA",
    description: "Global leader in software, cloud, and AI solutions.",
  },
  {
    id: "c3",
    name: "Amazon",
    logoUrl: "https://www.amazon.com/favicon.ico",
    type: "MNC",
    industry: "Technology",
    locations: ["Chennai", "Bangalore", "Hyderabad"],
    hiringRoles: ["SDE", "Cloud Engineer", "Data Analyst"],
    fresherFriendly: true,
    avgPackage: "28 LPA",
    description: "World's largest e-commerce and cloud computing company.",
  },
  {
    id: "c4",
    name: "Goldman Sachs",
    logoUrl: "https://www.goldmansachs.com/favicon.ico",
    type: "MNC",
    industry: "Finance",
    locations: ["Bangalore", "Mumbai"],
    hiringRoles: ["Analyst", "SDE", "Quant"],
    fresherFriendly: true,
    avgPackage: "30 LPA",
    description: "Leading global investment banking and securities firm.",
  },
  {
    id: "c5",
    name: "Deloitte",
    logoUrl: "https://www2.deloitte.com/favicon.ico",
    type: "MNC",
    industry: "Consulting",
    locations: ["Mumbai", "Bangalore", "Hyderabad", "Delhi"],
    hiringRoles: ["Cybersecurity", "Consultant", "Analyst"],
    fresherFriendly: true,
    avgPackage: "12 LPA",
    description: "Global leader in consulting and professional services.",
  },
  {
    id: "c6",
    name: "CrowdStrike",
    logoUrl: "https://www.crowdstrike.com/favicon.ico",
    type: "MNC",
    industry: "Cybersecurity",
    locations: ["Pune", "Remote"],
    hiringRoles: ["Cybersecurity", "SDE", "Threat Analyst"],
    fresherFriendly: true,
    avgPackage: "18 LPA",
    description: "Leading cybersecurity platform for endpoint protection.",
  },
  {
    id: "c7",
    name: "Flipkart",
    logoUrl: "https://www.flipkart.com/favicon.ico",
    type: "Indian Unicorn",
    industry: "E-commerce",
    locations: ["Bangalore"],
    hiringRoles: ["SDE", "Data Analyst", "Product Manager"],
    fresherFriendly: true,
    avgPackage: "20 LPA",
    description: "India's leading e-commerce marketplace.",
  },
  {
    id: "c8",
    name: "Zomato",
    logoUrl: "https://www.zomato.com/favicon.ico",
    type: "Indian Unicorn",
    industry: "Food Tech",
    locations: ["Gurgaon", "Bangalore"],
    hiringRoles: ["SDE", "Full Stack Developer", "Data Scientist"],
    fresherFriendly: true,
    avgPackage: "16 LPA",
    description: "India's leading food delivery and restaurant platform.",
  },
  {
    id: "c9",
    name: "TCS",
    logoUrl: "https://www.tcs.com/favicon.ico",
    type: "Service Based",
    industry: "IT Services",
    locations: ["Mumbai", "Chennai", "Bangalore", "Hyderabad", "Pune", "Delhi", "Kolkata"],
    hiringRoles: ["SDE", "Analyst", "Consultant"],
    fresherFriendly: true,
    avgPackage: "7 LPA",
    description: "India's largest IT services company by market cap.",
  },
  {
    id: "c10",
    name: "Infosys",
    logoUrl: "https://www.infosys.com/favicon.ico",
    type: "Service Based",
    industry: "IT Services",
    locations: ["Bangalore", "Mysuru", "Pune", "Hyderabad", "Chennai"],
    hiringRoles: ["SDE", "Analyst", "Consultant"],
    fresherFriendly: true,
    avgPackage: "6.5 LPA",
    description: "Global leader in IT consulting and digital services.",
  },
  {
    id: "c11",
    name: "Razorpay",
    logoUrl: "https://razorpay.com/favicon.png",
    type: "Startup",
    industry: "Fintech",
    locations: ["Bangalore"],
    hiringRoles: ["SDE", "Full Stack Developer", "DevOps"],
    fresherFriendly: true,
    avgPackage: "18 LPA",
    description: "India's leading payment gateway for businesses.",
  },
  {
    id: "c12",
    name: "CRED",
    logoUrl: "https://web-images.credcdn.in/v2/_next/assets/images/home-page/cred-logo.png",
    type: "Startup",
    industry: "Fintech",
    locations: ["Bangalore"],
    hiringRoles: ["SDE", "Frontend Developer", "Backend Developer"],
    fresherFriendly: false,
    avgPackage: "25 LPA",
    description: "Premium fintech platform for creditworthy individuals.",
  },
]

export const companyTypes = ["All", "MNC", "Indian Unicorn", "Service Based", "Startup"]
export const industries = ["All", "Technology", "Finance", "Consulting", "Cybersecurity", "E-commerce", "Food Tech", "IT Services", "Fintech"]
export const indianStates = [
  "All",
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Remote"
]

// Map cities to states for filtering
export const cityToState: Record<string, string> = {
  "Bangalore": "Karnataka",
  "Hyderabad": "Telangana",
  "Mumbai": "Maharashtra",
  "Pune": "Maharashtra",
  "Chennai": "Tamil Nadu",
  "Gurgaon": "Haryana",
  "Noida": "Uttar Pradesh",
  "Delhi": "Delhi",
  "Kolkata": "West Bengal",
  "Mysuru": "Karnataka",
  "Remote": "Remote",
}

export const opportunities: Opportunity[] = [
  {
    id: "1",
    company: "Google",
    role: "Software Engineer Intern",
    cohort: "SDE",
    location: "Bangalore",
    salary: "1.2L/month",
    matchPercentage: 92,
    deadline: hoursFromNow(1.5),
    status: "applied",
    description: "Join Google's engineering team and work on products used by billions.",
    requirements: ["DSA", "System Design", "Python/Java", "CGPA > 8.0"],
    companyType: "MNC",
    industry: "Technology",
    logoUrl: "https://www.google.com/favicon.ico",
  },
  {
    id: "2",
    company: "Microsoft",
    role: "SDE Intern",
    cohort: "SDE",
    location: "Hyderabad",
    salary: "1.0L/month",
    matchPercentage: 85,
    deadline: hoursFromNow(6),
    status: "interview",
    description: "Build next-gen cloud solutions at Microsoft Azure team.",
    requirements: ["C++", "Cloud Computing", "CGPA > 7.5"],
    companyType: "MNC",
    industry: "Technology",
    logoUrl: "https://www.microsoft.com/favicon.ico",
  },
  {
    id: "3",
    company: "Deloitte",
    role: "Cyber Analyst",
    cohort: "Cybersecurity",
    location: "Mumbai",
    salary: "80K/month",
    matchPercentage: 78,
    deadline: hoursFromNow(20),
    status: "applied",
    description: "Protect enterprise systems as a cybersecurity analyst at Deloitte.",
    requirements: ["Network Security", "SIEM", "Ethical Hacking"],
    companyType: "MNC",
    industry: "Consulting",
    logoUrl: "https://www2.deloitte.com/favicon.ico",
  },
  {
    id: "4",
    company: "Goldman Sachs",
    role: "Quantitative Analyst",
    cohort: "Analyst",
    location: "Bangalore",
    salary: "1.5L/month",
    matchPercentage: 65,
    deadline: hoursFromNow(48),
    status: "applied",
    description: "Apply mathematical models to financial markets.",
    requirements: ["Statistics", "Python", "Machine Learning", "CGPA > 8.5"],
    companyType: "MNC",
    industry: "Finance",
    logoUrl: "https://www.goldmansachs.com/favicon.ico",
  },
  {
    id: "5",
    company: "Amazon",
    role: "Cloud Engineer",
    cohort: "SDE",
    location: "Chennai",
    salary: "1.1L/month",
    matchPercentage: 88,
    deadline: hoursFromNow(3),
    status: "applied",
    description: "Work on AWS infrastructure serving millions of customers.",
    requirements: ["AWS", "Distributed Systems", "Java"],
    companyType: "MNC",
    industry: "Technology",
    logoUrl: "https://www.amazon.com/favicon.ico",
  },
  {
    id: "6",
    company: "CrowdStrike",
    role: "Security Intern",
    cohort: "Cybersecurity",
    location: "Remote",
    salary: "70K/month",
    matchPercentage: 90,
    deadline: hoursFromNow(30),
    status: "selected",
    description: "Join a leading cybersecurity firm and defend against advanced threats.",
    requirements: ["Cybersecurity", "Incident Response", "Python"],
    companyType: "MNC",
    industry: "Cybersecurity",
    logoUrl: "https://www.crowdstrike.com/favicon.ico",
  },
  {
    id: "7",
    company: "Flipkart",
    role: "Data Analyst",
    cohort: "Analyst",
    location: "Bangalore",
    salary: "90K/month",
    matchPercentage: 72,
    deadline: hoursFromNow(10),
    status: "rejected",
    description: "Analyze user behavior data to drive product decisions.",
    requirements: ["SQL", "Python", "Tableau", "Statistics"],
    companyType: "Indian Unicorn",
    industry: "E-commerce",
    logoUrl: "https://www.flipkart.com/favicon.ico",
  },
  {
    id: "8",
    company: "Zomato",
    role: "Full Stack Developer",
    cohort: "SDE",
    location: "Gurgaon",
    salary: "95K/month",
    matchPercentage: 81,
    deadline: hoursFromNow(15),
    status: "applied",
    description: "Build features for India's leading food delivery platform.",
    requirements: ["React", "Node.js", "MongoDB", "TypeScript"],
    companyType: "Indian Unicorn",
    industry: "Food Tech",
    logoUrl: "https://www.zomato.com/favicon.ico",
  },
  {
    id: "9",
    company: "Razorpay",
    role: "Backend Developer",
    cohort: "SDE",
    location: "Bangalore",
    salary: "1.0L/month",
    matchPercentage: 84,
    deadline: hoursFromNow(36),
    status: "applied",
    description: "Build scalable payment infrastructure for millions of businesses.",
    requirements: ["Go/Java", "Microservices", "Databases", "API Design"],
    companyType: "Startup",
    industry: "Fintech",
    logoUrl: "https://razorpay.com/favicon.png",
  },
  {
    id: "10",
    company: "TCS",
    role: "Systems Engineer",
    cohort: "SDE",
    location: "Mumbai",
    salary: "58K/month",
    matchPercentage: 95,
    deadline: hoursFromNow(72),
    status: "applied",
    description: "Join TCS digital transformation projects across industries.",
    requirements: ["Java/Python", "SQL", "Problem Solving"],
    companyType: "Service Based",
    industry: "IT Services",
    logoUrl: "https://www.tcs.com/favicon.ico",
  },
]

export const cohorts = ["All", "SDE", "Cybersecurity", "Analyst"]
export const roles = ["All", "SDE", "Data Analyst", "Full Stack Developer", "Cloud Engineer", "Cyber Analyst", "Backend Developer", "Systems Engineer", "Quantitative Analyst", "Security Intern"]
export const statuses: ApplicationStatus[] = ["applied", "interview", "selected", "rejected"]

export const user = {
  name: "Arjun",
  email: "arjun@college.edu",
  avatar: "A",
  profileCompletion: 65,
  skills: ["React", "Python", "Java", "SQL"],
  resumeUploaded: false,
  cgpa: "8.2",
  college: "IIT Delhi",
  degree: "B.Tech CSE",
}
