type roles = {
  id: number;
  city: boolean;
  roleType: number;
  roleName: string;
}[];

export enum CITY_ROLES {
  DOCTOR = 1,
  SNIPER,
  ARMOUR,
  DETECTIVE,
  SIMPLE_CITY,
}
export enum MAFIA_ROLES {
  DOCTOR_LECTOR = 1,
  GODFATHER,
  SIMPLE_MAFIA,
}

export const rolesData: roles = [
  {
    id: 1,
    roleType: CITY_ROLES.DOCTOR,
    roleName: "پزشک",
    city: true,
  },
  {
    id: 2,
    roleType: CITY_ROLES.SNIPER,
    roleName: "تک تیرانداز",
    city: true,
  },
  {
    id: 3,
    roleType: CITY_ROLES.DETECTIVE,
    roleName: "کارآگاه",
    city: true,
  },
  {
    id: 4,
    roleType: CITY_ROLES.SIMPLE_CITY,
    roleName: "شهروند ساده",
    city: true,
  },
  {
    id: 5,
    roleType: CITY_ROLES.ARMOUR,
    roleName: "زره پوش",
    city: true,
  },
  {
    id: 6,
    roleType: MAFIA_ROLES.GODFATHER,
    roleName: "رئیس مافیا",
    city: false,
  },
  {
    id: 7,
    roleType: MAFIA_ROLES.DOCTOR_LECTOR,
    roleName: "دکتر لکتر",
    city: false,
  },
  {
    id: 8,
    roleType: MAFIA_ROLES.SIMPLE_MAFIA,
    roleName: "مافیای ساده",
    city: false,
  },
];
