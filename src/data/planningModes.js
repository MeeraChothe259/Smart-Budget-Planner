export const PRIORITIES = [
  {
    id: 'SAVE_MORE',
    name: 'Save More',
    icon: '💰',
    description: 'Boost emergency reserve and savings first, heavily trimming flexible spending.',
    reserveBoost: 1.8,
    wantMultiplier: 0.6,
    needMultiplier: 1.0,
  },
  {
    id: 'COMFORT',
    name: 'Comfort',
    icon: '🛋️',
    description: 'Balanced approach ensuring baseline comfort with standard reserve protection.',
    reserveBoost: 1.0,
    wantMultiplier: 1.2,
    needMultiplier: 1.0,
  },
  {
    id: 'EDUCATION',
    name: 'Education & Growth',
    icon: '🎓',
    description: 'Directs extra capital towards courses, learning, and skill upgradation.',
    reserveBoost: 0.9,
    wantMultiplier: 0.8,
    needMultiplier: 1.1,
    priorityCategoryType: 'learning',
  },
  {
    id: 'EXPERIENCE',
    name: 'Experience & Leisure',
    icon: '✈️',
    description: 'Maximizes activities, travel, and fun while maintaining critical essential safety.',
    reserveBoost: 0.8,
    wantMultiplier: 1.4,
    needMultiplier: 1.0,
  },
  {
    id: 'ESSENTIALS',
    name: 'Essentials First',
    icon: '🏠',
    description: '100% focus on non-negotiable core needs before any discretionary allocation.',
    reserveBoost: 1.2,
    wantMultiplier: 0.4,
    needMultiplier: 1.35,
  },
  {
    id: 'FUTURE',
    name: 'Future Investment',
    icon: '🚀',
    description: 'High emphasis on long-term reserve, infrastructure, and sustainable growth.',
    reserveBoost: 2.0,
    wantMultiplier: 0.5,
    needMultiplier: 1.05,
  },
];

export const PLANNING_MODES = [
  {
    id: 'travel',
    name: 'Travel Planner',
    icon: '✈️',
    tagline: 'Plan trips with smart accommodation and activity scaling',
    defaultBudget: 50000,
    minBudget: 5000,
    maxBudget: 500000,
    step: 2000,
    categories: [
      { id: 'transport', name: 'Transport & Flights', icon: '🛫', basePercentage: 25, type: 'NEED', priorityWeight: 5, minAmount: 1500, tag: 'essential' },
      { id: 'accommodation', name: 'Accommodation', icon: '🏨', basePercentage: 30, type: 'NEED', priorityWeight: 4, minAmount: 2000, tag: 'essential' },
      { id: 'food', name: 'Food & Dining', icon: '🍽️', basePercentage: 16, type: 'NEED', priorityWeight: 3, minAmount: 1000, tag: 'essential' },
      { id: 'activities', name: 'Activities & Sightseeing', icon: '🎟️', basePercentage: 12, type: 'WANT', priorityWeight: 2, minAmount: 500, tag: 'flexible' },
      { id: 'shopping', name: 'Shopping & Souvenirs', icon: '🛍️', basePercentage: 8, type: 'WANT', priorityWeight: 1, minAmount: 0, tag: 'flexible' },
      { id: 'reserve', name: 'Emergency Travel Reserve', icon: '🛡️', basePercentage: 9, type: 'RESERVE', priorityWeight: 5, minAmount: 1000, tag: 'reserve' }
    ],
    alternatives: {
      accommodation: [
        { level: 'Luxury', name: '5-Star Luxury Resort', thresholdPct: 35 },
        { level: 'Boutique', name: 'Standard Boutique Hotel', thresholdPct: 25 },
        { level: 'Budget', name: 'Budget Hotel / AirBnB', thresholdPct: 18 },
        { level: 'Economy', name: 'Youth Hostel / Shared Homestay', thresholdPct: 10 },
      ],
      transport: [
        { level: 'Premium', name: 'Direct Business Class Flight', thresholdPct: 35 },
        { level: 'Standard', name: 'Economy Flight / Express Train', thresholdPct: 20 },
        { level: 'Budget', name: 'Budget Airline with Layover', thresholdPct: 12 },
        { level: 'Economy', name: 'Overnight Sleeper Bus/Train', thresholdPct: 6 },
      ],
      food: [
        { level: 'Fine Dining', name: 'Michelin / Fine Dining Restaurants', thresholdPct: 20 },
        { level: 'Casual', name: 'Local Casual Bistros & Cafes', thresholdPct: 14 },
        { level: 'Street Food', name: 'Authentic Street Food & Markets', thresholdPct: 8 },
      ]
    }
  },
  {
    id: 'personal',
    name: 'Personal Budget',
    icon: '🏠',
    tagline: 'Manage daily expenses, lifestyle, and wealth building',
    defaultBudget: 60000,
    minBudget: 10000,
    maxBudget: 1000000,
    step: 5000,
    categories: [
      { id: 'housing', name: 'Housing & Rent', icon: '🔑', basePercentage: 30, type: 'NEED', priorityWeight: 5, minAmount: 5000, tag: 'essential' },
      { id: 'groceries', name: 'Groceries & Supplies', icon: '🛒', basePercentage: 20, type: 'NEED', priorityWeight: 5, minAmount: 3000, tag: 'essential' },
      { id: 'utilities', name: 'Utilities & Bills', icon: '⚡', basePercentage: 10, type: 'NEED', priorityWeight: 4, minAmount: 1500, tag: 'essential' },
      { id: 'entertainment', name: 'Entertainment & Outings', icon: '🎬', basePercentage: 12, type: 'WANT', priorityWeight: 2, minAmount: 0, tag: 'flexible' },
      { id: 'shopping', name: 'Personal Shopping', icon: '👕', basePercentage: 10, type: 'WANT', priorityWeight: 1, minAmount: 0, tag: 'flexible' },
      { id: 'reserve', name: 'Emergency Fund', icon: '🏦', basePercentage: 18, type: 'RESERVE', priorityWeight: 5, minAmount: 2000, tag: 'reserve' }
    ],
    alternatives: {
      entertainment: [
        { level: 'High', name: 'VIP Concerts & Fine Dining', thresholdPct: 15 },
        { level: 'Moderate', name: 'Standard Movies & Weekend Cafes', thresholdPct: 10 },
        { level: 'Budget', name: 'Streaming Subscriptions & Home Dinners', thresholdPct: 5 },
      ],
      shopping: [
        { level: 'Designer', name: 'Designer Apparel & High End Brands', thresholdPct: 15 },
        { level: 'Retail', name: 'Standard High Street Stores', thresholdPct: 8 },
        { level: 'Thrift', name: 'Essential Wardrobe & Discount Outlets', thresholdPct: 4 },
      ]
    }
  },
  {
    id: 'education',
    name: 'Education Planner',
    icon: '🎓',
    tagline: 'Balance tuition fees, books, tech, and skill development',
    defaultBudget: 40000,
    minBudget: 5000,
    maxBudget: 500000,
    step: 2000,
    categories: [
      { id: 'fees', name: 'Tuition & Academic Fees', icon: '🏫', basePercentage: 35, type: 'NEED', priorityWeight: 5, minAmount: 3000, tag: 'essential' },
      { id: 'books', name: 'Books & Reference Material', icon: '📚', basePercentage: 15, type: 'NEED', priorityWeight: 4, minAmount: 1000, tag: 'essential' },
      { id: 'tech', name: 'Technology & Devices', icon: '💻', basePercentage: 20, type: 'NEED', priorityWeight: 4, minAmount: 2000, tag: 'essential' },
      { id: 'courses', name: 'Online Courses & Coaching', icon: '📜', basePercentage: 12, type: 'WANT', priorityWeight: 3, minAmount: 500, tag: 'flexible' },
      { id: 'stationery', name: 'Stationery & Supplies', icon: '✏️', basePercentage: 8, type: 'NEED', priorityWeight: 3, minAmount: 400, tag: 'essential' },
      { id: 'reserve', name: 'Academic Contingency Reserve', icon: '💡', basePercentage: 10, type: 'RESERVE', priorityWeight: 5, minAmount: 1000, tag: 'reserve' }
    ],
    alternatives: {
      courses: [
        { level: 'Premium', name: '1-on-1 Private Mentorship & Bootcamps', thresholdPct: 20 },
        { level: 'Standard', name: 'Paid Certified Online Platforms (Coursera/Udemy)', thresholdPct: 12 },
        { level: 'Free', name: 'OpenSource / YouTube / MIT OpenCourseWare', thresholdPct: 5 },
      ],
      books: [
        { level: 'Hardcover', name: 'Brand New Hardcover Editions', thresholdPct: 18 },
        { level: 'Digital', name: 'Kindle eBooks & Digital PDFs', thresholdPct: 10 },
        { level: 'Library', name: 'Library Borrowing & Senior Notes', thresholdPct: 4 },
      ]
    }
  },
  {
    id: 'city',
    name: 'City Planner',
    icon: '🏙️',
    tagline: 'Distribute civic funds across public infrastructure and safety',
    defaultBudget: 100000,
    minBudget: 20000,
    maxBudget: 2000000,
    step: 10000,
    categories: [
      { id: 'transport', name: 'Public Transit & Roads', icon: '🚌', basePercentage: 25, type: 'NEED', priorityWeight: 5, minAmount: 5000, tag: 'essential' },
      { id: 'water', name: 'Water & Utilities Supply', icon: '💧', basePercentage: 20, type: 'NEED', priorityWeight: 5, minAmount: 4000, tag: 'essential' },
      { id: 'waste', name: 'Sanitation & Recycling', icon: '♻️', basePercentage: 15, type: 'NEED', priorityWeight: 4, minAmount: 3000, tag: 'essential' },
      { id: 'healthcare', name: 'Civic Healthcare & Clinics', icon: '🏥', basePercentage: 18, type: 'NEED', priorityWeight: 5, minAmount: 3500, tag: 'essential' },
      { id: 'public_spaces', name: 'Parks & Public Spaces', icon: '🌳', basePercentage: 10, type: 'WANT', priorityWeight: 2, minAmount: 1000, tag: 'flexible' },
      { id: 'reserve', name: 'Emergency Disaster Infrastructure', icon: '🚨', basePercentage: 12, type: 'RESERVE', priorityWeight: 5, minAmount: 2500, tag: 'reserve' }
    ],
    alternatives: {
      public_spaces: [
        { level: 'Grand', name: 'Botanical Gardens & Smart Parks', thresholdPct: 15 },
        { level: 'Basic', name: 'Community Greening & Benches', thresholdPct: 8 },
        { level: 'Minimal', name: 'Essential Maintenance Only', thresholdPct: 3 },
      ]
    }
  },
  {
    id: 'home',
    name: 'Home Planner',
    icon: '🏡',
    tagline: 'Optimize household upkeep, appliances, and maintenance',
    defaultBudget: 45000,
    minBudget: 10000,
    maxBudget: 500000,
    step: 2500,
    categories: [
      { id: 'rent', name: 'Rent / Mortgage', icon: '🏠', basePercentage: 35, type: 'NEED', priorityWeight: 5, minAmount: 4000, tag: 'essential' },
      { id: 'food', name: 'Groceries & Kitchen', icon: '🍞', basePercentage: 22, type: 'NEED', priorityWeight: 5, minAmount: 2500, tag: 'essential' },
      { id: 'electricity', name: 'Electricity & Gas', icon: '⚡', basePercentage: 12, type: 'NEED', priorityWeight: 4, minAmount: 1200, tag: 'essential' },
      { id: 'internet', name: 'High Speed Internet & Cable', icon: '📶', basePercentage: 8, type: 'NEED', priorityWeight: 3, minAmount: 600, tag: 'essential' },
      { id: 'maintenance', name: 'Home Decor & Maintenance', icon: '🛠️', basePercentage: 10, type: 'WANT', priorityWeight: 2, minAmount: 0, tag: 'flexible' },
      { id: 'reserve', name: 'Home Repairs Reserve', icon: '🧯', basePercentage: 13, type: 'RESERVE', priorityWeight: 5, minAmount: 1500, tag: 'reserve' }
    ],
    alternatives: {
      maintenance: [
        { level: 'Full Renovation', name: 'Professional Interior Refurbish', thresholdPct: 15 },
        { level: 'DIY Repairs', name: 'Self Repair & Minor Touchups', thresholdPct: 8 },
        { level: 'Hold Off', name: 'Emergency Upkeep Only', thresholdPct: 2 },
      ]
    }
  },
  {
    id: 'wedding',
    name: 'Wedding & Event Planner',
    icon: '💍',
    tagline: 'Create stunning celebrations without budget overruns',
    defaultBudget: 80000,
    minBudget: 15000,
    maxBudget: 1000000,
    step: 5000,
    categories: [
      { id: 'venue', name: 'Venue & Banquet Hall', icon: '🏰', basePercentage: 30, type: 'NEED', priorityWeight: 5, minAmount: 5000, tag: 'essential' },
      { id: 'food', name: 'Catering & Dining', icon: '🍲', basePercentage: 25, type: 'NEED', priorityWeight: 5, minAmount: 4000, tag: 'essential' },
      { id: 'clothing', name: 'Bridal & Groom Apparel', icon: '👗', basePercentage: 15, type: 'WANT', priorityWeight: 3, minAmount: 2000, tag: 'flexible' },
      { id: 'photography', name: 'Photo & Videography', icon: '📸', basePercentage: 12, type: 'WANT', priorityWeight: 3, minAmount: 1500, tag: 'flexible' },
      { id: 'entertainment', name: 'DJ, Music & Lighting', icon: '🎷', basePercentage: 8, type: 'WANT', priorityWeight: 2, minAmount: 0, tag: 'flexible' },
      { id: 'reserve', name: 'Event Buffer Reserve', icon: '💐', basePercentage: 10, type: 'RESERVE', priorityWeight: 5, minAmount: 1500, tag: 'reserve' }
    ],
    alternatives: {
      venue: [
        { level: 'Grand Palace', name: '5-Star Luxury Resort Lawn', thresholdPct: 35 },
        { level: 'Boutique Hall', name: 'Air-Conditioned Banquet Hall', thresholdPct: 25 },
        { level: 'Community', name: 'Open Air Garden / Community Club', thresholdPct: 15 },
      ],
      photography: [
        { level: 'Cinematic', name: 'Celebrity Cinematic Crew + Drones', thresholdPct: 16 },
        { level: 'Standard', name: 'Professional Photographer + Album', thresholdPct: 10 },
        { level: 'Basic', name: 'Single Event Photographer', thresholdPct: 5 },
      ]
    }
  },
  {
    id: 'technology',
    name: 'Technology Planner',
    icon: '💻',
    tagline: 'Plan workstation, hardware, cloud services & software stack',
    defaultBudget: 75000,
    minBudget: 10000,
    maxBudget: 500000,
    step: 5000,
    categories: [
      { id: 'hardware', name: 'Core Computer / Laptop', icon: '🖥️', basePercentage: 45, type: 'NEED', priorityWeight: 5, minAmount: 5000, tag: 'essential' },
      { id: 'peripherals', name: 'Monitors & Peripherals', icon: '⌨️', basePercentage: 18, type: 'NEED', priorityWeight: 4, minAmount: 1500, tag: 'essential' },
      { id: 'software', name: 'Licenses & AI Tools', icon: '⚡', basePercentage: 12, type: 'WANT', priorityWeight: 3, minAmount: 500, tag: 'flexible' },
      { id: 'cloud', name: 'Cloud Storage & Hosting', icon: '☁️', basePercentage: 10, type: 'NEED', priorityWeight: 4, minAmount: 800, tag: 'essential' },
      { id: 'reserve', name: 'Tech Repair & Upgrade Fund', icon: '🔧', basePercentage: 15, type: 'RESERVE', priorityWeight: 5, minAmount: 1500, tag: 'reserve' }
    ],
    alternatives: {
      hardware: [
        { level: 'Flagship', name: 'Apple M3 Max / High-End Workstation', thresholdPct: 50 },
        { level: 'Mid-Tier', name: 'Mid-Range Core i7 / Ryzen 7 Laptop', thresholdPct: 35 },
        { level: 'Budget', name: 'Refurbished / Previous Gen Model', thresholdPct: 20 },
      ]
    }
  },
  {
    id: 'vehicle',
    name: 'Vehicle Planner',
    icon: '🚗',
    tagline: 'Balance down payment, insurance, fuel, and upkeep',
    defaultBudget: 70000,
    minBudget: 10000,
    maxBudget: 1000000,
    step: 5000,
    categories: [
      { id: 'emi', name: 'Monthly Payment / Savings', icon: '🚘', basePercentage: 45, type: 'NEED', priorityWeight: 5, minAmount: 4000, tag: 'essential' },
      { id: 'fuel', name: 'Fuel / EV Charging', icon: '⛽', basePercentage: 20, type: 'NEED', priorityWeight: 5, minAmount: 1500, tag: 'essential' },
      { id: 'insurance', name: 'Insurance & Taxes', icon: '📄', basePercentage: 15, type: 'NEED', priorityWeight: 5, minAmount: 1000, tag: 'essential' },
      { id: 'accessories', name: 'Accessories & Customization', icon: '📻', basePercentage: 8, type: 'WANT', priorityWeight: 1, minAmount: 0, tag: 'flexible' },
      { id: 'reserve', name: 'Maintenance & Service Reserve', icon: '🛞', basePercentage: 12, type: 'RESERVE', priorityWeight: 5, minAmount: 1200, tag: 'reserve' }
    ],
    alternatives: {
      emi: [
        { level: 'EV / Premium', name: 'Electric SUV / Premium Sedan', thresholdPct: 50 },
        { level: 'Hatchback', name: 'Compact Hatchback / City Sedan', thresholdPct: 35 },
        { level: 'Two Wheeler', name: 'Smart Electric Scooter', thresholdPct: 20 },
      ]
    }
  },
  {
    id: 'career',
    name: 'Career & Upskilling Planner',
    icon: '💼',
    tagline: 'Invest in certifications, networking, and professional growth',
    defaultBudget: 30000,
    minBudget: 3000,
    maxBudget: 300000,
    step: 1000,
    categories: [
      { id: 'certifications', name: 'Industry Certifications', icon: '🎖️', basePercentage: 35, type: 'NEED', priorityWeight: 5, minAmount: 1500, tag: 'essential' },
      { id: 'networking', name: 'Conferences & Networking', icon: '🤝', basePercentage: 20, type: 'WANT', priorityWeight: 3, minAmount: 500, tag: 'flexible' },
      { id: 'coaching', name: 'Career Coaching & Resume', icon: '🎯', basePercentage: 18, type: 'WANT', priorityWeight: 3, minAmount: 400, tag: 'flexible' },
      { id: 'tools', name: 'Professional Software', icon: '💻', basePercentage: 12, type: 'NEED', priorityWeight: 4, minAmount: 500, tag: 'essential' },
      { id: 'reserve', name: 'Job Transition Emergency Fund', icon: '💼', basePercentage: 15, type: 'RESERVE', priorityWeight: 5, minAmount: 1000, tag: 'reserve' }
    ],
    alternatives: {
      certifications: [
        { level: 'Global', name: 'AWS / Cisco / PMP Global Master', thresholdPct: 40 },
        { level: 'Standard', name: 'Specialized Coursera Professional Cert', thresholdPct: 25 },
        { level: 'Free', name: 'Free Code Camp / Open Certifications', thresholdPct: 10 },
      ]
    }
  },
  {
    id: 'party',
    name: 'Party Planner',
    icon: '🎉',
    tagline: 'Host memorable parties with flexible catering and fun',
    defaultBudget: 25000,
    minBudget: 2000,
    maxBudget: 150000,
    step: 1000,
    categories: [
      { id: 'food', name: 'Food & Snacks', icon: '🍕', basePercentage: 40, type: 'NEED', priorityWeight: 5, minAmount: 1000, tag: 'essential' },
      { id: 'drinks', name: 'Beverages & Mocktails', icon: '🍹', basePercentage: 20, type: 'NEED', priorityWeight: 4, minAmount: 500, tag: 'essential' },
      { id: 'decor', name: 'Decorations & Themes', icon: '🎈', basePercentage: 15, type: 'WANT', priorityWeight: 2, minAmount: 0, tag: 'flexible' },
      { id: 'music', name: 'Music System / DJ', icon: '🎵', basePercentage: 12, type: 'WANT', priorityWeight: 2, minAmount: 0, tag: 'flexible' },
      { id: 'reserve', name: 'Surprise Guest Buffer', icon: '🧁', basePercentage: 13, type: 'RESERVE', priorityWeight: 5, minAmount: 500, tag: 'reserve' }
    ],
    alternatives: {
      food: [
        { level: 'Catered', name: 'Full Gourmet Live Catering', thresholdPct: 45 },
        { level: 'Takeout', name: 'Popular Pizza & Party Boxes', thresholdPct: 30 },
        { level: 'Potluck', name: 'DIY Snacks & Potluck Style', thresholdPct: 15 },
      ]
    }
  },
  {
    id: 'business',
    name: 'Small Business Planner',
    icon: '🌱',
    tagline: 'Allocate startup runway for inventory, marketing, and ops',
    defaultBudget: 90000,
    minBudget: 15000,
    maxBudget: 2000000,
    step: 5000,
    categories: [
      { id: 'inventory', name: 'Inventory / Product Cost', icon: '📦', basePercentage: 35, type: 'NEED', priorityWeight: 5, minAmount: 5000, tag: 'essential' },
      { id: 'marketing', name: 'Marketing & Digital Ads', icon: '📢', basePercentage: 22, type: 'WANT', priorityWeight: 4, minAmount: 1000, tag: 'flexible' },
      { id: 'operations', name: 'Ops, Domain & SaaS', icon: '⚙️', basePercentage: 18, type: 'NEED', priorityWeight: 5, minAmount: 2000, tag: 'essential' },
      { id: 'packaging', name: 'Packaging & Shipping', icon: '🏷️', basePercentage: 10, type: 'NEED', priorityWeight: 4, minAmount: 1000, tag: 'essential' },
      { id: 'reserve', name: 'Business Cash Runway Reserve', icon: '📈', basePercentage: 15, type: 'RESERVE', priorityWeight: 5, minAmount: 3000, tag: 'reserve' }
    ],
    alternatives: {
      marketing: [
        { level: 'Paid Ads', name: 'Meta & Google Ads Campaign', thresholdPct: 25 },
        { level: 'Influencer', name: 'Micro-Influencer Collaborations', thresholdPct: 15 },
        { level: 'Organic', name: 'Organic SEO & Social Media Growth', thresholdPct: 5 },
      ]
    }
  },
  {
    id: 'emergency',
    name: 'Emergency Planner',
    icon: '🆘',
    tagline: 'Maximize crisis readiness with heavy safety reserves',
    defaultBudget: 50000,
    minBudget: 5000,
    maxBudget: 1000000,
    step: 2500,
    categories: [
      { id: 'medical', name: 'Medical Emergency Fund', icon: '🩺', basePercentage: 40, type: 'NEED', priorityWeight: 5, minAmount: 3000, tag: 'essential' },
      { id: 'liquid_cash', name: 'Instant Liquid Cash Reserve', icon: '💵', basePercentage: 30, type: 'RESERVE', priorityWeight: 5, minAmount: 2000, tag: 'reserve' },
      { id: 'supplies', name: 'Essential Ration & Supplies', icon: '🥫', basePercentage: 15, type: 'NEED', priorityWeight: 5, minAmount: 1000, tag: 'essential' },
      { id: 'insurance', name: 'Short-term Insurance', icon: '🛡️', basePercentage: 15, type: 'NEED', priorityWeight: 4, minAmount: 800, tag: 'essential' }
    ],
    alternatives: {
      medical: [
        { level: 'Full Coverage', name: 'Comprehensive Health Cover + Top Up', thresholdPct: 45 },
        { level: 'Standard', name: 'Standard Hospitalization Reserve', thresholdPct: 30 },
        { level: 'Basic', name: 'Basic OPD & Essential Meds Reserve', thresholdPct: 15 },
      ]
    }
  }
];
