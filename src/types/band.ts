export type Member = {
  name: string;
  role: string;
  image: string;
};

export type Band = {
  id: string | number; 
  name: string;
  genre: string;
  image: string;
  description: string;
  members: Member[];
};