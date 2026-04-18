import shieldTickIcon from "@/assets/icons/shield-tick-icon.svg";
import deliveryIcon from "@/assets/icons/delivery-icon.svg";
import customerServiceIcon from "@/assets/icons/customer-service-icon.svg";
import shoppingBagIcon from "@/assets/icons/shoppingBag-icon.svg";
import shopIcon from "@/assets/icons/shop-icon.svg";
import saleIcon from "@/assets/icons/sale-icon.svg";
import moneyBagIcon from "@/assets/icons/moneyBag-icon.svg";
import { TrustBadge } from "@/types/trustBadges";

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

export const STATS_BADGES : TrustBadge[] = [
  {
    icon: shopIcon,
    title: "10.5K",
    description: "Sellers active our site",
  },
  {
    icon: saleIcon,
    title: "33K",
    description: "Monthly Product Sale",
  },
  {
    icon: shoppingBagIcon,
    title: "45.5K",
    description: "Customer active in our site",
  },
  {
    icon: moneyBagIcon,
    title: "25K",
    description: "Annual gross sale in our site",
  },
]
