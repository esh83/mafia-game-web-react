type roles = {
  id: number;
  city: boolean;
  roleType: number;
  roleName: string;
}[];

export enum ROLES_ENUM {
  DOCTOR = 1,
  SNIPER,
  ARMOUR,
  DETECTIVE,
  SIMPLE_CITY,
  DOCTOR_LECTOR ,
  GODFATHER,
  SIMPLE_MAFIA,
}
export const rolesData: roles = [
  {
    id: 1,
    roleType: ROLES_ENUM.DOCTOR,
    roleName: "پزشک",
    city: true,
  },
  {
    id: 2,
    roleType: ROLES_ENUM.SNIPER,
    roleName: "تک تیرانداز",
    city: true,
  },
  {
    id: 3,
    roleType: ROLES_ENUM.DETECTIVE,
    roleName: "کارآگاه",
    city: true,
  },
  {
    id: 4,
    roleType: ROLES_ENUM.SIMPLE_CITY,
    roleName: "شهروند ساده",
    city: true,
  },
  {
    id: 5,
    roleType: ROLES_ENUM.ARMOUR,
    roleName: "زره پوش",
    city: true,
  },
  {
    id: 6,
    roleType: ROLES_ENUM.GODFATHER,
    roleName: "رئیس مافیا",
    city: false,
  },
  {
    id: 7,
    roleType: ROLES_ENUM.DOCTOR_LECTOR,
    roleName: "دکتر لکتر",
    city: false,
  },
  {
    id: 8,
    roleType: ROLES_ENUM.SIMPLE_MAFIA,
    roleName: "مافیای ساده",
    city: false,
  },
];
