const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: "products",
  BLOGS: "blogs",
  OUR_SERVICES: "services",
  FAQ: "faqs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:id/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",

  // Admin
  ADMIN: "Admin",
  DASHBOARD: "dashboard",
  MANAGER_USER: "manager-user",
  MANAGER_PRODUCTS: "manager-products",
  MANAGER_ORDERS: "manager-orders",
  CREATE_PRODUCTS: "create-products",

  // Member
  MEMBER: "Member",
  PESONAL: "personal",
};

export default path;
