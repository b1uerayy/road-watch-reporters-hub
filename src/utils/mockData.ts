
import { faker } from '@faker-js/faker';

// Types for our data
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  xp: number;
  rank: 'Observer' | 'Reporter' | 'Inspector' | 'Supervisor';
  reportsCount: number;
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  imageUrl: string;
  timestamp: Date;
  status: 'Reported' | 'Under Review' | 'Repair Scheduled' | 'Fixed';
  roadInfo: {
    id: string;
    type: string;
    contractor: string;
    constructionYear: number;
    lastRepaired: number;
    estimatedCost: string;
  };
  reportCount: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  userRank: string;
  text: string;
  timestamp: Date;
  likes: number;
}

// Generate a road type
const roadTypes = [
  'Concrete',
  'Asphalt',
  'Gravel',
  'Dirt',
  'Cobblestone',
  'Bituminous',
  'Macadam'
];

// Generate a contractor name
const generateContractor = () => {
  const prefixes = ['National', 'Regional', 'City', 'Metro', 'Urban', 'Rural', 'Highway'];
  const middleNames = ['Road', 'Infrastructure', 'Construction', 'Development', 'Engineering'];
  const suffixes = ['Ltd.', 'Corp.', 'Inc.', 'Co.', 'Pvt. Ltd.', 'Group', 'Associates'];
  
  return `${faker.helpers.arrayElement(prefixes)} ${faker.helpers.arrayElement(middleNames)} ${faker.helpers.arrayElement(suffixes)}`;
};

// Calculate rank based on XP
export const calculateRank = (xp: number): 'Observer' | 'Reporter' | 'Inspector' | 'Supervisor' => {
  if (xp < 50) return 'Observer';
  if (xp < 150) return 'Reporter';
  if (xp < 300) return 'Inspector';
  return 'Supervisor';
};

// Generate mock users
export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => {
    const xp = faker.number.int({ min: 0, max: 500 });
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      profileImage: faker.image.avatar(),
      xp,
      rank: calculateRank(xp),
      reportsCount: faker.number.int({ min: 0, max: 15 })
    };
  });
};

// Generate a cost string
const generateCost = () => {
  const amount = faker.number.float({ min: 1, max: 50, fractionDigits: 1 });
  return `₹${amount} Lakhs`;
};

// Generate comments for a report
const generateComments = (count: number, users: User[]): Comment[] => {
  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);
    return {
      id: faker.string.uuid(),
      userId: user.id,
      userName: user.name,
      userProfileImage: user.profileImage,
      userRank: user.rank,
      text: faker.lorem.sentence({ min: 3, max: 10 }),
      timestamp: faker.date.recent({ days: 30 }),
      likes: faker.number.int({ min: 0, max: 25 })
    };
  });
};

// Generate mock reports
export const generateReports = (count: number, users: User[]): Report[] => {
  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(users);
    const latitude = faker.location.latitude({ min: 28.5, max: 28.7 }); // Delhi-NCR region as example
    const longitude = faker.location.longitude({ min: 77.1, max: 77.3 });
    const currentYear = new Date().getFullYear();
    const constructionYear = faker.number.int({ min: currentYear - 20, max: currentYear - 5 });
    const lastRepaired = faker.number.int({ min: constructionYear, max: currentYear - 1 });
    
    // Create a road title based on location
    const roadTitle = `${faker.location.street()} ${faker.helpers.arrayElement(['Damage', 'Pothole', 'Crack', 'Erosion', 'Sinkhole'])}`;
    
    return {
      id: faker.string.uuid(),
      userId: user.id,
      userName: user.name,
      userProfileImage: user.profileImage,
      title: roadTitle,
      description: faker.lorem.paragraph(),
      location: {
        latitude,
        longitude,
        address: `${faker.location.streetAddress()}, ${faker.location.city()}`
      },
      imageUrl: faker.image.urlLoremFlickr({ category: 'road,damage' }),
      timestamp: faker.date.recent({ days: 60 }),
      status: faker.helpers.arrayElement(['Reported', 'Under Review', 'Repair Scheduled', 'Fixed']),
      roadInfo: {
        id: `RD-${faker.number.int({ min: 1000, max: 9999 })}`,
        type: faker.helpers.arrayElement(roadTypes),
        contractor: generateContractor(),
        constructionYear,
        lastRepaired,
        estimatedCost: generateCost()
      },
      reportCount: faker.number.int({ min: 1, max: 10 }),
      comments: generateComments(faker.number.int({ min: 0, max: 8 }), users)
    };
  });
};

// Generate weekly report statistics
export const generateWeeklyStats = (): number[] => {
  return Array.from({ length: 7 }, () => faker.number.int({ min: 5, max: 30 }));
};

// Generate top reported roads
export const generateTopRoads = (): { name: string; count: number }[] => {
  return Array.from({ length: 5 }, (_, index) => ({
    name: faker.location.street(),
    count: faker.number.int({ min: 10 - index, max: 40 - index * 3 })
  }));
};

// Create some fixed data for our app
export const mockUsers = generateUsers(20);
export const mockReports = generateReports(30, mockUsers);
export const currentUser = mockUsers[0];
export const weeklyStats = generateWeeklyStats();
export const topRoads = generateTopRoads();

// Calculate statistics
export const totalReports = mockReports.length;
export const fixedReports = mockReports.filter(r => r.status === 'Fixed').length;
export const inProgressReports = mockReports.filter(r => r.status === 'Repair Scheduled' || r.status === 'Under Review').length;
