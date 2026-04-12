import shieldTickIcon from "@/assets/icons/shield-tick-icon.svg";
import deliveryIcon from "@/assets/icons/delivery-icon.svg";
import customerServiceIcon from "@/assets/icons/customer-service-icon.svg";

export interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

export const TRUST_BADGES: TrustBadge[] = [
  {
    icon: deliveryIcon,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: customerServiceIcon,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: shieldTickIcon,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];
