import type { Mission } from './types';

export const mockMissions: Mission[] = [
  {
    id: 1,
    name: "Renta",
    assigned: "800.00",
    portion: 20,
    used: "220.00",
    deferred: false,
    monthly: false,
    attributes: [
      {
        id: 1,
        name: "principal",
      },
      {
        id: 2,
        name: "diversion",
      },
      {
        id: 3,
        name: "ahorros",
      },
    ],
    expenses: [
      {
        id: 1,
        date: new Date("2022-01-01"),
        amount: "100.00",
        recurring: false,
        notes: "Expense 1",
      },
      {
        id: 2,
        date: new Date("2022-01-02"),
        amount: "200.00",
        recurring: false,
        notes: "Expense 2",
      },
      {
        id: 3,
        date: new Date("2022-01-03"),
        amount: "300.00",
        recurring: false,
        notes: "Expense 3",
      },
    ],
  },
  {
    id: 2,
    name: "Seguridad",
    assigned: "500.00",
    portion: 15,
    used: "75.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 4,
        name: "seguridad",
      },
      {
        id: 5,
        name: "salud",
      },
    ],
    expenses: [
      {
        id: 4,
        date: new Date("2022-01-04"),
        amount: "50.00",
        recurring: true,
        notes: "Monthly Security",
      },
    ],
  },
  {
    id: 3,
    name: "Educación",
    assigned: "1000.00",
    portion: 25,
    used: "250.00",
    deferred: true,
    monthly: false,
    attributes: [
      {
        id: 6,
        name: "educacion",
      },
      {
        id: 7,
        name: "formacion",
      },
    ],
    expenses: [
      {
        id: 5,
        date: new Date("2022-01-05"),
        amount: "250.00",
        recurring: false,
        notes: "Education Expense",
      },
    ],
  },
  {
    id: 4,
    name: "Vivienda",
    assigned: "1200.00",
    portion: 30,
    used: "360.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 8,
        name: "vivienda",
      },
      {
        id: 9,
        name: "arrendamiento",
      },
    ],
    expenses: [
      {
        id: 6,
        date: new Date("2022-01-06"),
        amount: "120.00",
        recurring: true,
        notes: "Monthly Rent",
      },
    ],
  },
  {
    id: 5,
    name: "Transporte",
    assigned: "400.00",
    portion: 10,
    used: "80.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 10,
        name: "transporte",
      },
      {
        id: 11,
        name: "gasolina",
      },
    ],
    expenses: [
      {
        id: 7,
        date: new Date("2022-01-07"),
        amount: "40.00",
        recurring: true,
        notes: "Monthly Gas",
      },
    ],
  },
  {
    id: 6,
    name: "Alimentación",
    assigned: "600.00",
    portion: 15,
    used: "120.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 12,
        name: "alimentacion",
      },
      {
        id: 13,
        name: "comida",
      },
    ],
    expenses: [
      {
        id: 8,
        date: new Date("2022-01-08"),
        amount: "60.00",
        recurring: true,
        notes: "Monthly Food",
      },
    ],
  },
  {
    id: 7,
    name: "Entretenimiento",
    assigned: "200.00",
    portion: 5,
    used: "40.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 14,
        name: "entretenimiento",
      },
      {
        id: 15,
        name: "ocio",
      },
    ],
    expenses: [
      {
        id: 9,
        date: new Date("2022-01-09"),
        amount: "20.00",
        recurring: true,
        notes: "Monthly Entertainment",
      },
    ],
  },
  {
    id: 8,
    name: "Salud",
    assigned: "300.00",
    portion: 7.5,
    used: "45.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 16,
        name: "salud",
      },
      {
        id: 17,
        name: "medicinas",
      },
    ],
    expenses: [
      {
        id: 10,
        date: new Date("2022-01-10"),
        amount: "15.00",
        recurring: true,
        notes: "Monthly Health",
      },
    ],
  },
  {
    id: 9,
    name: "Impuestos",
    assigned: "150.00",
    portion: 3.75,
    used: "22.50",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 18,
        name: "impuestos",
      },
      {
        id: 19,
        name: "contribuciones",
      },
    ],
    expenses: [
      {
        id: 11,
        date: new Date("2022-01-11"),
        amount: "7.50",
        recurring: true,
        notes: "Monthly Taxes",
      },
    ],
  },
  {
    id: 10,
    name: "Deudas",
    assigned: "250.00",
    portion: 6.25,
    used: "37.50",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 20,
        name: "deudas",
      },
      {
        id: 21,
        name: "creditos",
      },
    ],
    expenses: [
      {
        id: 12,
        date: new Date("2022-01-12"),
        amount: "12.50",
        recurring: true,
        notes: "Monthly Debts",
      },
    ],
  },
  {
    id: 11,
    name: "Ahorro",
    assigned: "100.00",
    portion: 2.5,
    used: "10.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 22,
        name: "ahorro",
      },
      {
        id: 23,
        name: "inversiones",
      },
    ],
    expenses: [
      {
        id: 13,
        date: new Date("2022-01-13"),
        amount: "5.00",
        recurring: true,
        notes: "Monthly Savings",
      },
    ],
  },
  {
    id: 12,
    name: "Gastos Varios",
    assigned: "150.00",
    portion: 3.75,
    used: "22.50",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 24,
        name: "gastos_varios",
      },
      {
        id: 25,
        name: "miscelaneos",
      },
    ],
    expenses: [
      {
        id: 14,
        date: new Date("2022-01-14"),
        amount: "7.50",
        recurring: true,
        notes: "Monthly Miscellaneous",
      },
    ],
  },
  {
    id: 13,
    name: "Vacaciones",
    assigned: "500.00",
    portion: 12.5,
    used: "62.50",
    deferred: true,
    monthly: false,
    attributes: [
      {
        id: 26,
        name: "vacaciones",
      },
      {
        id: 27,
        name: "viajes",
      },
    ],
    expenses: [
      {
        id: 15,
        date: new Date("2022-01-15"),
        amount: "62.50",
        recurring: false,
        notes: "Vacation Expense",
      },
    ],
  },
  {
    id: 14,
    name: "Hogar",
    assigned: "300.00",
    portion: 7.5,
    used: "45.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 28,
        name: "hogar",
      },
      {
        id: 29,
        name: "decoracion",
      },
    ],
    expenses: [
      {
        id: 16,
        date: new Date("2022-01-16"),
        amount: "15.00",
        recurring: true,
        notes: "Monthly Home",
      },
    ],
  },
  {
    id: 15,
    name: "Electrónica",
    assigned: "200.00",
    portion: 5,
    used: "40.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 30,
        name: "electronica",
      },
      {
        id: 31,
        name: "tecnologia",
      },
    ],
    expenses: [
      {
        id: 17,
        date: new Date("2022-01-17"),
        amount: "20.00",
        recurring: true,
        notes: "Monthly Electronics",
      },
    ],
  },
  {
    id: 16,
    name: "Deporte",
    assigned: "100.00",
    portion: 2.5,
    used: "10.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 32,
        name: "deporte",
      },
      {
        id: 33,
        name: "actividades",
      },
    ],
    expenses: [
      {
        id: 18,
        date: new Date("2022-01-18"),
        amount: "5.00",
        recurring: true,
        notes: "Monthly Sports",
      },
    ],
  },
  {
    id: 17,
    name: "Cultura",
    assigned: "150.00",
    portion: 3.75,
    used: "22.50",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 34,
        name: "cultura",
      },
      {
        id: 35,
        name: "arte",
      },
    ],
    expenses: [
      {
        id: 19,
        date: new Date("2022-01-19"),
        amount: "7.50",
        recurring: true,
        notes: "Monthly Culture",
      },
    ],
  },
  {
    id: 18,
    name: "Comunicaciones",
    assigned: "100.00",
    portion: 2.5,
    used: "10.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 36,
        name: "comunicaciones",
      },
      {
        id: 37,
        name: "internet",
      },
    ],
    expenses: [
      {
        id: 20,
        date: new Date("2022-01-20"),
        amount: "5.00",
        recurring: true,
        notes: "Monthly Communications",
      },
    ],
  },
  {
    id: 19,
    name: "Servicios",
    assigned: "200.00",
    portion: 5,
    used: "40.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 38,
        name: "servicios",
      },
      {
        id: 39,
        name: "utilidades",
      },
    ],
    expenses: [
      {
        id: 21,
        date: new Date("2022-01-21"),
        amount: "20.00",
        recurring: true,
        notes: "Monthly Services",
      },
    ],
  },
  {
    id: 20,
    name: "Otros",
    assigned: "100.00",
    portion: 2.5,
    used: "10.00",
    deferred: false,
    monthly: true,
    attributes: [
      {
        id: 40,
        name: "otros",
      },
      {
        id: 41,
        name: "varios",
      },
    ],
    expenses: [
      {
        id: 22,
        date: new Date("2022-01-22"),
        amount: "5.00",
        recurring: true,
        notes: "Monthly Others",
      },
    ],
  },
];
