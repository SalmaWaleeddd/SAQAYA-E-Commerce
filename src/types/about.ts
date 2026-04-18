export interface TeamMember {
  name: string;
  position: string;
  image: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}