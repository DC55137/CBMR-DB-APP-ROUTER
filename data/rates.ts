// data/rates.ts

export interface Rate {
  service: string;
  price: number;
}

export const rates: Rate[] = [
  { service: "New Roof", price: 65.0 },
  { service: "Re Roof Metal New", price: 65.0 },
  { service: "Re-Roof Asbestos", price: 70.0 },
  { service: "Re Roof old house", price: 110.0 },
  { service: "Re roof Decromastic", price: 110.0 },
  { service: "Reroof from Tile", price: 130.0 },
  { service: "Asbestos removal", price: 50.0 },
  { service: "Increased Pitch 25 deg", price: 5 },
  { service: "Increased Pitch 30 deg", price: 12 },
  { service: "0.48 bmt increase", price: 5 },
  { service: "Gutter replacement", price: 65 },
  { service: "Fascia and gutter", price: 60.0 },
  { service: "Safety Rail", price: 40.0 },
  { service: "Bin", price: 650 },
  { service: "Crane", price: 700 },
  { service: "", price: 0 },
  { service: "", price: 0 },
  { service: "", price: 0 },
  { service: "", price: 0 },
  { service: "", price: 0 },
  { service: "", price: 0 },
  { service: "Whirlybird", price: 200 },
  { service: "Parapet", price: 50 },
  { service: "Fascia Repair and Fascia Cover", price: 0.0 },
  { service: "Solar Panels", price: 0.0 },
  { service: "Gutter Guard", price: 0.0 },
  { service: "Solar Hot Water", price: 0.0 },
  { service: "Fascia", price: 0.0 },
  { service: "Barge Capping", price: 0.0 },
  { service: "Apron Flashings", price: 0.0 },
  { service: "Transition Flashing", price: 0.0 },
  { service: "Barge Board", price: 0.0 },
  { service: "150 guttering", price: 0.0 },
  { service: "Wall cladding", price: 0.0 },
];
