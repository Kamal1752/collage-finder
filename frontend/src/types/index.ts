export interface College {
  id: number;
  name: string;
  location: string;
  state: string;
  type: string;
  fees_min: number;
  fees_max: number;
  rating: number;
  placement_percentage: number;
  avg_package: number;
  image_url: string;
  description: string;
  established: number;
  total_students: number;
  website: string;
  courses?: Course[];
  reviews?: Review[];
}

export interface Course {
  id: number;
  name: string;
  duration: string;
  fees: number;
  seats: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user_name: string;
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
