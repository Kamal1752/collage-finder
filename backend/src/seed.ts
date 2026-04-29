import { query } from './db';

const colleges = [
  {
    name: 'VelTech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    location: 'Avadi, Chennai', state: 'Tamil Nadu', type: 'Private',
    fees_min: 85000, fees_max: 150000, rating: 4.1, placement_percentage: 85,
    avg_package: 4.5, established: 1997, total_students: 15000,
    website: 'https://www.veltech.edu.in',
    description: 'VelTech is a leading private engineering university in Chennai, Tamil Nadu. Known for strong industry connections and excellent placement record.',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'
  },
  {
    name: 'Indian Institute of Technology Madras',
    location: 'Chennai', state: 'Tamil Nadu', type: 'Government',
    fees_min: 75000, fees_max: 100000, rating: 4.9, placement_percentage: 98,
    avg_package: 18.5, established: 1959, total_students: 9000,
    website: 'https://www.iitm.ac.in',
    description: 'IIT Madras is one of the foremost institutes of national importance in higher technological education and research.',
    image_url: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800'
  },
  {
    name: 'Anna University',
    location: 'Chennai', state: 'Tamil Nadu', type: 'Government',
    fees_min: 50000, fees_max: 80000, rating: 4.3, placement_percentage: 88,
    avg_package: 5.2, established: 1978, total_students: 13000,
    website: 'https://www.annauniv.edu',
    description: 'Anna University is a technical university offering higher education in engineering, technology, and allied sciences.',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Kattankulathur, Chennai', state: 'Tamil Nadu', type: 'Private',
    fees_min: 180000, fees_max: 280000, rating: 4.2, placement_percentage: 90,
    avg_package: 6.8, established: 1985, total_students: 52000,
    website: 'https://www.srmist.edu.in',
    description: 'SRM is one of the top ranking universities in India with world-class infrastructure and global collaborations.',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'
  },
  {
    name: 'Vellore Institute of Technology',
    location: 'Vellore', state: 'Tamil Nadu', type: 'Private',
    fees_min: 190000, fees_max: 300000, rating: 4.5, placement_percentage: 92,
    avg_package: 8.2, established: 1984, total_students: 35000,
    website: 'https://vit.ac.in',
    description: 'VIT University is known for its excellent academic environment and top-notch placement opportunities with Fortune 500 companies.',
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800'
  },
  {
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai', state: 'Maharashtra', type: 'Government',
    fees_min: 80000, fees_max: 110000, rating: 4.9, placement_percentage: 99,
    avg_package: 22.3, established: 1958, total_students: 10000,
    website: 'https://www.iitb.ac.in',
    description: 'IIT Bombay is one of the top engineering institutes in India and Asia, renowned globally for cutting-edge research.',
    image_url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800'
  },
  {
    name: 'Delhi Technological University',
    location: 'New Delhi', state: 'Delhi', type: 'Government',
    fees_min: 60000, fees_max: 90000, rating: 4.2, placement_percentage: 87,
    avg_package: 9.5, established: 1941, total_students: 12000,
    website: 'https://www.dtu.ac.in',
    description: 'DTU is a premier state technical university in Delhi offering engineering and technology programs.',
    image_url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800'
  },
  {
    name: 'BITS Pilani',
    location: 'Pilani', state: 'Rajasthan', type: 'Private',
    fees_min: 200000, fees_max: 350000, rating: 4.7, placement_percentage: 95,
    avg_package: 14.2, established: 1964, total_students: 16000,
    website: 'https://www.bits-pilani.ac.in',
    description: 'BITS Pilani is a deemed university known for its research-oriented curriculum and exceptional placement record.',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'
  },
  {
    name: 'National Institute of Technology Trichy',
    location: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Government',
    fees_min: 65000, fees_max: 95000, rating: 4.4, placement_percentage: 91,
    avg_package: 10.1, established: 1964, total_students: 8000,
    website: 'https://www.nitt.edu',
    description: 'NIT Trichy is one of the top NITs in India, known for strong academics and outstanding placement statistics.',
    image_url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800'
  },
  {
    name: 'Manipal Institute of Technology',
    location: 'Manipal', state: 'Karnataka', type: 'Private',
    fees_min: 230000, fees_max: 380000, rating: 4.3, placement_percentage: 89,
    avg_package: 7.5, established: 1957, total_students: 14000,
    website: 'https://manipal.edu',
    description: 'MIT Manipal is a top private engineering college with international collaborations and state-of-the-art labs.',
    image_url: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800'
  },
  {
    name: 'PSG College of Technology',
    location: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
    fees_min: 70000, fees_max: 120000, rating: 4.2, placement_percentage: 83,
    avg_package: 5.8, established: 1951, total_students: 7000,
    website: 'https://www.psgtech.edu',
    description: 'PSG Tech is a prestigious engineering institution in Coimbatore with strong industry ties.',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'
  },
  {
    name: 'Amrita Vishwa Vidyapeetham',
    location: 'Coimbatore', state: 'Tamil Nadu', type: 'Private',
    fees_min: 150000, fees_max: 250000, rating: 4.1, placement_percentage: 82,
    avg_package: 5.2, established: 1994, total_students: 20000,
    website: 'https://www.amrita.edu',
    description: 'Amrita University is a multi-campus, multi-disciplinary research university known for its values-based education.',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
  }
];

const coursesByCollege: Record<string, { name: string; duration: string; fees: number; seats: number }[]> = {
  'VelTech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology': [
    { name: 'B.Tech Computer Science', duration: '4 Years', fees: 120000, seats: 180 },
    { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 110000, seats: 120 },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 100000, seats: 120 },
    { name: 'M.Tech Computer Science', duration: '2 Years', fees: 85000, seats: 60 },
    { name: 'MBA', duration: '2 Years', fees: 150000, seats: 90 },
  ],
  'default': [
    { name: 'B.Tech Computer Science', duration: '4 Years', fees: 120000, seats: 120 },
    { name: 'B.Tech Electronics & Communication', duration: '4 Years', fees: 110000, seats: 90 },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 100000, seats: 90 },
    { name: 'M.Tech', duration: '2 Years', fees: 80000, seats: 60 },
    { name: 'MBA', duration: '2 Years', fees: 180000, seats: 60 },
  ]
};

async function seed() {
  console.log('🌱 Seeding database...');

  await query('DELETE FROM courses');
  await query('DELETE FROM saved_colleges');
  await query('DELETE FROM reviews');
  await query('DELETE FROM colleges');

  for (const college of colleges) {
    const result = await query(
      `INSERT INTO colleges (name, location, state, type, fees_min, fees_max, rating, placement_percentage, avg_package, established, total_students, website, description, image_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id`,
      [college.name, college.location, college.state, college.type, college.fees_min, college.fees_max,
       college.rating, college.placement_percentage, college.avg_package, college.established,
       college.total_students, college.website, college.description, college.image_url]
    );

    const collegeId = result.rows[0].id;
    const courses = coursesByCollege[college.name] || coursesByCollege['default'];

    for (const course of courses) {
      await query(
        `INSERT INTO courses (college_id, name, duration, fees, seats) VALUES ($1,$2,$3,$4,$5)`,
        [collegeId, course.name, course.duration, course.fees, course.seats]
      );
    }
    console.log(`✅ Seeded: ${college.name}`);
  }

  console.log('🎉 Seeding complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
