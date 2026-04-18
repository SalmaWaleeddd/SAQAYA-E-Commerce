import { TeamMember } from "@/types/about";
import FounderImg from "@/assets/images/team/tom-cruise-img.svg";
import ManagingDirectorImg from "@/assets/images/team/emma-watson-img.svg";
import ProductDesignerImg from "@/assets/images/team/will-smith-img.svg";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: FounderImg,
    socialLinks: {
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Emma Watson",
    position: "Managing Director",
    image: ManagingDirectorImg,
    socialLinks: {
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Will Smith",
    position: "Product Designer",
    image: ProductDesignerImg,
    socialLinks: {
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
];
