import type { BrandData } from "./car-data-eu";

export const asianBrands: BrandData[] = [
  // ========== JAPANESE ==========
  {
    name: "Toyota",
    models: [
      {
        name: "Corolla",
        generations: [
          { name: "E100", yearFrom: 1991, yearTo: 1997, bodyType: "sedan" },
          { name: "E110", yearFrom: 1995, yearTo: 2000, bodyType: "sedan" },
          { name: "E120", yearFrom: 2000, yearTo: 2006, bodyType: "sedan" },
          { name: "E150", yearFrom: 2006, yearTo: 2013, bodyType: "sedan" },
          { name: "E170", yearFrom: 2012, yearTo: 2019, bodyType: "sedan" },
          { name: "E210", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Camry",
        generations: [
          { name: "XV20", yearFrom: 1996, yearTo: 2001, bodyType: "sedan" },
          { name: "XV30", yearFrom: 2001, yearTo: 2006, bodyType: "sedan" },
          { name: "XV40", yearFrom: 2006, yearTo: 2011, bodyType: "sedan" },
          { name: "XV50", yearFrom: 2011, yearTo: 2017, bodyType: "sedan" },
          { name: "XV70", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "RAV4",
        generations: [
          { name: "XA10", yearFrom: 1994, yearTo: 2000, bodyType: "suv" },
          { name: "XA20", yearFrom: 2000, yearTo: 2005, bodyType: "suv" },
          { name: "XA30", yearFrom: 2005, yearTo: 2012, bodyType: "suv" },
          { name: "XA40", yearFrom: 2012, yearTo: 2018, bodyType: "suv" },
          { name: "XA50", yearFrom: 2018, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Land Cruiser Prado",
        generations: [
          { name: "90", yearFrom: 1996, yearTo: 2002, bodyType: "suv" },
          { name: "120", yearFrom: 2002, yearTo: 2009, bodyType: "suv" },
          { name: "150", yearFrom: 2009, yearTo: 2023, bodyType: "suv" },
          { name: "250", yearFrom: 2023, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Land Cruiser",
        generations: [
          { name: "80", yearFrom: 1990, yearTo: 1997, bodyType: "suv" },
          { name: "100", yearFrom: 1998, yearTo: 2007, bodyType: "suv" },
          { name: "200", yearFrom: 2007, yearTo: 2021, bodyType: "suv" },
          { name: "300", yearFrom: 2021, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Highlander",
        generations: [
          { name: "I (XU20)", yearFrom: 2000, yearTo: 2007, bodyType: "suv" },
          { name: "II (XU40)", yearFrom: 2007, yearTo: 2013, bodyType: "suv" },
          { name: "III (XU50)", yearFrom: 2013, yearTo: 2019, bodyType: "suv" },
          { name: "IV (XU70)", yearFrom: 2019, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "C-HR",
        generations: [
          { name: "I", yearFrom: 2016, yearTo: 2023, bodyType: "crossover" },
          { name: "II", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Yaris",
        generations: [
          { name: "XP10 (Vitz)", yearFrom: 1999, yearTo: 2005, bodyType: "hatchback" },
          { name: "XP90", yearFrom: 2005, yearTo: 2010, bodyType: "hatchback" },
          { name: "XP130", yearFrom: 2010, yearTo: 2019, bodyType: "hatchback" },
          { name: "XP210", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Avensis",
        generations: [
          { name: "I (T22)", yearFrom: 1997, yearTo: 2003, bodyType: "sedan" },
          { name: "II (T25)", yearFrom: 2003, yearTo: 2008, bodyType: "sedan" },
          { name: "III (T27)", yearFrom: 2008, yearTo: 2018, bodyType: "sedan" },
        ],
      },
      {
        name: "Auris",
        generations: [
          { name: "E150", yearFrom: 2006, yearTo: 2012, bodyType: "hatchback" },
          { name: "E180", yearFrom: 2012, yearTo: 2018, bodyType: "hatchback" },
        ],
      },
      {
        name: "Hilux",
        generations: [
          { name: "N50", yearFrom: 1988, yearTo: 1997, bodyType: "pickup" },
          { name: "N80/N90/N100", yearFrom: 1997, yearTo: 2004, bodyType: "pickup" },
          { name: "N140/N160", yearFrom: 2004, yearTo: 2015, bodyType: "pickup" },
          { name: "N120/N180", yearFrom: 2015, yearTo: null, bodyType: "pickup" },
        ],
      },
      {
        name: "Fortuner",
        generations: [
          { name: "I", yearFrom: 2004, yearTo: 2015, bodyType: "suv" },
          { name: "II", yearFrom: 2015, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Supra",
        generations: [
          { name: "A70", yearFrom: 1986, yearTo: 1992, bodyType: "coupe" },
          { name: "A80", yearFrom: 1993, yearTo: 2002, bodyType: "coupe" },
          { name: "A90", yearFrom: 2019, yearTo: null, bodyType: "coupe" },
        ],
      },
      {
        name: "bZ4X",
        generations: [
          { name: "bZ4X I", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Venza",
        generations: [
          { name: "I", yearFrom: 2008, yearTo: 2016, bodyType: "wagon" },
          { name: "II", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Crown",
        generations: [
          { name: "S130", yearFrom: 1999, yearTo: 2007, bodyType: "sedan" },
          { name: "S170/S180", yearFrom: 2007, yearTo: 2017, bodyType: "sedan" },
          { name: "S220", yearFrom: 2017, yearTo: 2022, bodyType: "sedan" },
          { name: "S235 (Crown Crossover)", yearFrom: 2022, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Prius",
        generations: [
          { name: "XW10", yearFrom: 1997, yearTo: 2003, bodyType: "hatchback" },
          { name: "XW20", yearFrom: 2003, yearTo: 2009, bodyType: "hatchback" },
          { name: "XW30", yearFrom: 2009, yearTo: 2015, bodyType: "hatchback" },
          { name: "XW50", yearFrom: 2015, yearTo: 2022, bodyType: "hatchback" },
          { name: "XW60", yearFrom: 2022, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "4Runner",
        generations: [
          { name: "N120", yearFrom: 1989, yearTo: 1995, bodyType: "suv" },
          { name: "N180", yearFrom: 1995, yearTo: 2002, bodyType: "suv" },
          { name: "N210", yearFrom: 2002, yearTo: 2009, bodyType: "suv" },
          { name: "N280", yearFrom: 2009, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Tundra",
        generations: [
          { name: "I (XK30)", yearFrom: 1999, yearTo: 2006, bodyType: "pickup" },
          { name: "II (XK50)", yearFrom: 2006, yearTo: 2021, bodyType: "pickup" },
          { name: "III (XK70)", yearFrom: 2021, yearTo: null, bodyType: "pickup" },
        ],
      },
      {
        name: "Sequoia",
        generations: [
          { name: "I", yearFrom: 2000, yearTo: 2007, bodyType: "suv" },
          { name: "II", yearFrom: 2007, yearTo: 2022, bodyType: "suv" },
          { name: "III", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Sienna",
        vehicleType: "bus",
        generations: [
          { name: "I (XL10)", yearFrom: 1997, yearTo: 2003, bodyType: "minivan" },
          { name: "II (XL20)", yearFrom: 2003, yearTo: 2010, bodyType: "minivan" },
          { name: "III (XL30)", yearFrom: 2010, yearTo: 2020, bodyType: "minivan" },
          { name: "IV (XL40)", yearFrom: 2020, yearTo: null, bodyType: "minivan" },
        ],
      },
      {
        name: "Avalon",
        generations: [
          { name: "XX10", yearFrom: 1994, yearTo: 1999, bodyType: "sedan" },
          { name: "XX20", yearFrom: 1999, yearTo: 2004, bodyType: "sedan" },
          { name: "XX30", yearFrom: 2004, yearTo: 2012, bodyType: "sedan" },
          { name: "XX40", yearFrom: 2012, yearTo: 2018, bodyType: "sedan" },
          { name: "XX50", yearFrom: 2018, yearTo: 2022, bodyType: "sedan" },
        ],
      },
      {
        name: "Rush",
        generations: [
          { name: "Rush I", yearFrom: 2006, yearTo: 2018, bodyType: "suv" },
          { name: "Rush II", yearFrom: 2018, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Harrier",
        generations: [
          { name: "XU10", yearFrom: 1997, yearTo: 2003, bodyType: "suv" },
          { name: "XU30", yearFrom: 2003, yearTo: 2013, bodyType: "suv" },
          { name: "XU60", yearFrom: 2013, yearTo: 2020, bodyType: "suv" },
          { name: "XU80", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Mark II / Mark X",
        generations: [
          { name: "Mark II (X90)", yearFrom: 1992, yearTo: 1996, bodyType: "sedan" },
          { name: "Mark II (X100)", yearFrom: 1996, yearTo: 2000, bodyType: "sedan" },
          { name: "Mark II (X110)", yearFrom: 2000, yearTo: 2004, bodyType: "sedan" },
          { name: "Mark X (X120)", yearFrom: 2004, yearTo: 2019, bodyType: "sedan" },
        ],
      },
      {
        name: "Wish",
        vehicleType: "bus",
        generations: [
          { name: "Wish I", yearFrom: 2003, yearTo: 2009, bodyType: "minivan" },
          { name: "Wish II", yearFrom: 2009, yearTo: 2017, bodyType: "minivan" },
        ],
      },
      {
        name: "Alphard",
        vehicleType: "bus",
        generations: [
          { name: "I (AH10)", yearFrom: 2002, yearTo: 2008, bodyType: "minivan" },
          { name: "II (AH20)", yearFrom: 2008, yearTo: 2015, bodyType: "minivan" },
          { name: "III (AH30)", yearFrom: 2015, yearTo: null, bodyType: "minivan" },
        ],
      },
      {
        name: "Century",
        generations: [
          { name: "Century (G50)", yearFrom: 1997, yearTo: 2017, bodyType: "sedan" },
          { name: "Century (G60)", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
        ],
      },
    ],
  },
  {
    name: "Honda",
    models: [
      {
        name: "Civic",
        generations: [
          { name: "VI (EJ/EM)", yearFrom: 1995, yearTo: 2000, bodyType: "hatchback" },
          { name: "VII (EP/ES)", yearFrom: 2000, yearTo: 2005, bodyType: "hatchback" },
          { name: "VIII (FD/FG)", yearFrom: 2005, yearTo: 2011, bodyType: "hatchback" },
          { name: "IX (FB/FG)", yearFrom: 2011, yearTo: 2015, bodyType: "hatchback" },
          { name: "X (FC/FK)", yearFrom: 2015, yearTo: 2021, bodyType: "hatchback" },
          { name: "XI (FL)", yearFrom: 2021, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "CR-V",
        generations: [
          { name: "I (RD1)", yearFrom: 1995, yearTo: 2001, bodyType: "suv" },
          { name: "II (RD5)", yearFrom: 2001, yearTo: 2006, bodyType: "suv" },
          { name: "III (RE1)", yearFrom: 2006, yearTo: 2011, bodyType: "suv" },
          { name: "IV (RM1)", yearFrom: 2011, yearTo: 2016, bodyType: "suv" },
          { name: "V (RW1)", yearFrom: 2016, yearTo: 2022, bodyType: "suv" },
          { name: "VI (RW2)", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Accord",
        generations: [
          { name: "VI (CG)", yearFrom: 1997, yearTo: 2002, bodyType: "sedan" },
          { name: "VII (CM)", yearFrom: 2002, yearTo: 2008, bodyType: "sedan" },
          { name: "VIII (CP)", yearFrom: 2008, yearTo: 2012, bodyType: "sedan" },
          { name: "IX (CR)", yearFrom: 2012, yearTo: 2017, bodyType: "sedan" },
          { name: "X (CV)", yearFrom: 2017, yearTo: 2022, bodyType: "sedan" },
          { name: "XI (CV3)", yearFrom: 2022, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "HR-V",
        generations: [
          { name: "I (GH)", yearFrom: 1998, yearTo: 2006, bodyType: "suv" },
          { name: "II (RU)", yearFrom: 2015, yearTo: 2021, bodyType: "crossover" },
          { name: "III (RV)", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Jazz / Fit",
        generations: [
          { name: "I (GD)", yearFrom: 2001, yearTo: 2007, bodyType: "hatchback" },
          { name: "II (GE)", yearFrom: 2007, yearTo: 2013, bodyType: "hatchback" },
          { name: "III (GK)", yearFrom: 2013, yearTo: 2020, bodyType: "hatchback" },
          { name: "IV (GR)", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Pilot",
        generations: [
          { name: "I", yearFrom: 2002, yearTo: 2008, bodyType: "suv" },
          { name: "II", yearFrom: 2008, yearTo: 2015, bodyType: "suv" },
          { name: "III", yearFrom: 2015, yearTo: 2022, bodyType: "suv" },
          { name: "IV", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Odyssey",
        vehicleType: "bus",
        generations: [
          { name: "III (RA)", yearFrom: 1999, yearTo: 2004, bodyType: "minivan" },
          { name: "IV (RB)", yearFrom: 2004, yearTo: 2013, bodyType: "minivan" },
          { name: "V (RC)", yearFrom: 2013, yearTo: 2020, bodyType: "minivan" },
          { name: "VI", yearFrom: 2020, yearTo: null, bodyType: "minivan" },
        ],
      },
      {
        name: "City",
        generations: [
          { name: "City III (GM)", yearFrom: 1996, yearTo: 2002, bodyType: "sedan" },
          { name: "City IV (GD)", yearFrom: 2002, yearTo: 2008, bodyType: "sedan" },
          { name: "City V (GM2)", yearFrom: 2008, yearTo: 2014, bodyType: "sedan" },
          { name: "City VI (GM6)", yearFrom: 2014, yearTo: 2019, bodyType: "sedan" },
          { name: "City VII", yearFrom: 2019, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Legend",
        generations: [
          { name: "III (KA)", yearFrom: 1995, yearTo: 2004, bodyType: "sedan" },
          { name: "IV (KB)", yearFrom: 2004, yearTo: 2012, bodyType: "sedan" },
          { name: "V (KC)", yearFrom: 2012, yearTo: 2020, bodyType: "sedan" },
        ],
      },
      {
        name: "Element",
        generations: [
          { name: "Element", yearFrom: 2003, yearTo: 2011, bodyType: "suv" },
        ],
      },
      {
        name: "Crosstour",
        generations: [
          { name: "Crosstour", yearFrom: 2009, yearTo: 2015, bodyType: "crossover" },
        ],
      },
      {
        name: "Insight",
        generations: [
          { name: "Insight II", yearFrom: 2009, yearTo: 2014, bodyType: "hatchback" },
          { name: "Insight III", yearFrom: 2018, yearTo: 2022, bodyType: "sedan" },
        ],
      },
      {
        name: "CR-Z",
        generations: [
          { name: "CR-Z", yearFrom: 2010, yearTo: 2016, bodyType: "coupe" },
        ],
      },
      {
        name: "S2000",
        generations: [
          { name: "S2000 (AP1/AP2)", yearFrom: 1999, yearTo: 2009, bodyType: "roadster" },
        ],
      },
    ],
  },
  {
    name: "Nissan",
    models: [
      {
        name: "Qashqai",
        generations: [
          { name: "J10", yearFrom: 2006, yearTo: 2013, bodyType: "crossover" },
          { name: "J11", yearFrom: 2013, yearTo: 2021, bodyType: "crossover" },
          { name: "J12", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "X-Trail",
        generations: [
          { name: "T30", yearFrom: 2000, yearTo: 2007, bodyType: "suv" },
          { name: "T31", yearFrom: 2007, yearTo: 2013, bodyType: "suv" },
          { name: "T32", yearFrom: 2013, yearTo: 2021, bodyType: "suv" },
          { name: "T33", yearFrom: 2021, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Almera",
        generations: [
          { name: "N15", yearFrom: 1995, yearTo: 2000, bodyType: "hatchback" },
          { name: "N16", yearFrom: 2000, yearTo: 2006, bodyType: "sedan" },
          { name: "G15 (N17)", yearFrom: 2012, yearTo: 2019, bodyType: "sedan" },
        ],
      },
      {
        name: "Juke",
        generations: [
          { name: "F15", yearFrom: 2010, yearTo: 2019, bodyType: "crossover" },
          { name: "F16", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Patrol",
        generations: [
          { name: "Y61", yearFrom: 1997, yearTo: null, bodyType: "suv" },
          { name: "Y62", yearFrom: 2010, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Pathfinder",
        generations: [
          { name: "R51", yearFrom: 2004, yearTo: 2012, bodyType: "suv" },
          { name: "R52", yearFrom: 2012, yearTo: 2022, bodyType: "suv" },
          { name: "R53", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Note",
        generations: [
          { name: "E11", yearFrom: 2005, yearTo: 2012, bodyType: "hatchback" },
          { name: "E12", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
          { name: "E13", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Murano",
        generations: [
          { name: "Z50", yearFrom: 2002, yearTo: 2007, bodyType: "suv" },
          { name: "Z51", yearFrom: 2007, yearTo: 2014, bodyType: "suv" },
          { name: "Z52", yearFrom: 2014, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Navara",
        generations: [
          { name: "D40", yearFrom: 2005, yearTo: 2014, bodyType: "pickup" },
          { name: "D23 (NP300)", yearFrom: 2014, yearTo: null, bodyType: "pickup" },
        ],
      },
      {
        name: "Leaf",
        generations: [
          { name: "ZE0", yearFrom: 2010, yearTo: 2017, bodyType: "hatchback" },
          { name: "ZE1", yearFrom: 2017, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Ariya",
        generations: [
          { name: "Ariya", yearFrom: 2021, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Sentra",
        generations: [
          { name: "B15", yearFrom: 1999, yearTo: 2006, bodyType: "sedan" },
          { name: "B16", yearFrom: 2006, yearTo: 2012, bodyType: "sedan" },
          { name: "B17", yearFrom: 2012, yearTo: 2019, bodyType: "sedan" },
          { name: "B18", yearFrom: 2019, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Kicks",
        generations: [
          { name: "Kicks I", yearFrom: 2016, yearTo: 2020, bodyType: "crossover" },
          { name: "Kicks II", yearFrom: 2020, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Tiida",
        generations: [
          { name: "C11", yearFrom: 2004, yearTo: 2012, bodyType: "hatchback" },
          { name: "C13", yearFrom: 2012, yearTo: 2019, bodyType: "hatchback" },
        ],
      },
      {
        name: "Teana",
        generations: [
          { name: "J31", yearFrom: 2003, yearTo: 2008, bodyType: "sedan" },
          { name: "J32", yearFrom: 2008, yearTo: 2013, bodyType: "sedan" },
          { name: "J33", yearFrom: 2013, yearTo: 2018, bodyType: "sedan" },
        ],
      },
      {
        name: "Micra",
        generations: [
          { name: "K12", yearFrom: 2002, yearTo: 2010, bodyType: "hatchback" },
          { name: "K13", yearFrom: 2010, yearTo: 2016, bodyType: "hatchback" },
          { name: "K14", yearFrom: 2016, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Primera",
        generations: [
          { name: "P11", yearFrom: 1996, yearTo: 2001, bodyType: "sedan" },
          { name: "P12", yearFrom: 2001, yearTo: 2007, bodyType: "sedan" },
        ],
      },
      {
        name: "Maxima",
        generations: [
          { name: "A33", yearFrom: 1999, yearTo: 2003, bodyType: "sedan" },
          { name: "A34", yearFrom: 2003, yearTo: 2008, bodyType: "sedan" },
          { name: "A35", yearFrom: 2008, yearTo: 2015, bodyType: "sedan" },
          { name: "A36", yearFrom: 2015, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "GT-R",
        generations: [
          { name: "R35", yearFrom: 2007, yearTo: null, bodyType: "coupe" },
        ],
      },
      {
        name: "370Z / 350Z",
        generations: [
          { name: "350Z (Z33)", yearFrom: 2002, yearTo: 2008, bodyType: "coupe" },
          { name: "370Z (Z34)", yearFrom: 2008, yearTo: 2020, bodyType: "coupe" },
        ],
      },
      {
        name: "Terrano",
        generations: [
          { name: "Terrano II", yearFrom: 1993, yearTo: 2006, bodyType: "suv" },
          { name: "Terrano III (D10)", yearFrom: 2013, yearTo: 2021, bodyType: "suv" },
        ],
      },
      {
        name: "Skyline",
        generations: [
          { name: "V35", yearFrom: 2001, yearTo: 2006, bodyType: "sedan" },
          { name: "V36", yearFrom: 2006, yearTo: 2014, bodyType: "sedan" },
          { name: "V37", yearFrom: 2013, yearTo: 2022, bodyType: "sedan" },
        ],
      },
    ],
  },
  {
    name: "Mazda",
    models: [
      {
        name: "3",
        generations: [
          { name: "BK", yearFrom: 2003, yearTo: 2008, bodyType: "hatchback" },
          { name: "BL", yearFrom: 2008, yearTo: 2013, bodyType: "hatchback" },
          { name: "BM", yearFrom: 2013, yearTo: 2019, bodyType: "hatchback" },
          { name: "BP", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "6",
        generations: [
          { name: "GG", yearFrom: 2002, yearTo: 2007, bodyType: "sedan" },
          { name: "GH", yearFrom: 2007, yearTo: 2012, bodyType: "sedan" },
          { name: "GJ", yearFrom: 2012, yearTo: 2017, bodyType: "sedan" },
          { name: "GL", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "CX-5",
        generations: [
          { name: "KE", yearFrom: 2012, yearTo: 2017, bodyType: "suv" },
          { name: "KF", yearFrom: 2017, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "CX-3",
        generations: [
          { name: "CX-3", yearFrom: 2015, yearTo: 2023, bodyType: "crossover" },
        ],
      },
      {
        name: "CX-30",
        generations: [
          { name: "CX-30", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "CX-9",
        generations: [
          { name: "TB", yearFrom: 2006, yearTo: 2015, bodyType: "suv" },
          { name: "TC", yearFrom: 2015, yearTo: 2023, bodyType: "suv" },
        ],
      },
      {
        name: "CX-60",
        generations: [
          { name: "CX-60", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "CX-7",
        generations: [
          { name: "CX-7", yearFrom: 2006, yearTo: 2012, bodyType: "suv" },
        ],
      },
      {
        name: "CX-50",
        generations: [
          { name: "CX-50", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "MX-5",
        generations: [
          { name: "NA", yearFrom: 1989, yearTo: 1997, bodyType: "roadster" },
          { name: "NB", yearFrom: 1998, yearTo: 2005, bodyType: "roadster" },
          { name: "NC", yearFrom: 2005, yearTo: 2015, bodyType: "roadster" },
          { name: "ND", yearFrom: 2015, yearTo: null, bodyType: "roadster" },
        ],
      },
      {
        name: "RX-8",
        generations: [
          { name: "RX-8", yearFrom: 2003, yearTo: 2012, bodyType: "coupe" },
        ],
      },
      {
        name: "Mazda 2",
        generations: [
          { name: "DE", yearFrom: 2007, yearTo: 2014, bodyType: "hatchback" },
          { name: "DJ", yearFrom: 2014, yearTo: 2019, bodyType: "hatchback" },
          { name: "DL", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Mazda 5",
        vehicleType: "bus",
        generations: [
          { name: "CR", yearFrom: 2005, yearTo: 2010, bodyType: "minivan" },
          { name: "CW", yearFrom: 2010, yearTo: 2015, bodyType: "minivan" },
        ],
      },
      {
        name: "MPV",
        vehicleType: "bus",
        generations: [
          { name: "MPV III (LW)", yearFrom: 1999, yearTo: 2006, bodyType: "minivan" },
          { name: "MPV IV (LY)", yearFrom: 2006, yearTo: 2016, bodyType: "minivan" },
        ],
      },
    ],
  },
  {
    name: "Mitsubishi",
    models: [
      {
        name: "Outlander",
        generations: [
          { name: "I (CU)", yearFrom: 2001, yearTo: 2005, bodyType: "suv" },
          { name: "II (CW)", yearFrom: 2005, yearTo: 2012, bodyType: "suv" },
          { name: "III (GG)", yearFrom: 2012, yearTo: 2021, bodyType: "suv" },
          { name: "IV (GG)", yearFrom: 2021, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "ASX",
        generations: [
          { name: "ASX I (GA)", yearFrom: 2010, yearTo: 2019, bodyType: "crossover" },
          { name: "ASX II", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Eclipse Cross",
        generations: [
          { name: "Eclipse Cross I", yearFrom: 2017, yearTo: 2021, bodyType: "crossover" },
          { name: "Eclipse Cross II", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Pajero / Montero",
        generations: [
          { name: "III (V20/V40)", yearFrom: 1999, yearTo: 2006, bodyType: "suv" },
          { name: "IV (V80/V90)", yearFrom: 2006, yearTo: 2021, bodyType: "suv" },
        ],
      },
      {
        name: "Pajero Sport",
        generations: [
          { name: "I (K60/K70)", yearFrom: 1996, yearTo: 2008, bodyType: "suv" },
          { name: "II (KA/KH)", yearFrom: 2008, yearTo: 2015, bodyType: "suv" },
          { name: "III (QH)", yearFrom: 2015, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "L200",
        generations: [
          { name: "L200 IV (K60)", yearFrom: 1996, yearTo: 2006, bodyType: "pickup" },
          { name: "L200 V (KT)", yearFrom: 2006, yearTo: 2014, bodyType: "pickup" },
          { name: "L200 VI (MQ)", yearFrom: 2014, yearTo: null, bodyType: "pickup" },
        ],
      },
      {
        name: "Lancer",
        generations: [
          { name: "Lancer IX", yearFrom: 2000, yearTo: 2007, bodyType: "sedan" },
          { name: "Lancer X", yearFrom: 2007, yearTo: 2017, bodyType: "sedan" },
        ],
      },
      {
        name: "Lancer Evolution",
        generations: [
          { name: "Evo VII", yearFrom: 2001, yearTo: 2003, bodyType: "sedan" },
          { name: "Evo VIII", yearFrom: 2003, yearTo: 2005, bodyType: "sedan" },
          { name: "Evo IX", yearFrom: 2005, yearTo: 2007, bodyType: "sedan" },
          { name: "Evo X", yearFrom: 2007, yearTo: 2016, bodyType: "sedan" },
        ],
      },
      {
        name: "Colt",
        generations: [
          { name: "Colt VI (Z30)", yearFrom: 2004, yearTo: 2012, bodyType: "hatchback" },
          { name: "Colt VII (Z40)", yearFrom: 2012, yearTo: 2020, bodyType: "hatchback" },
        ],
      },
      {
        name: "Galant",
        generations: [
          { name: "Galant VIII", yearFrom: 1996, yearTo: 2003, bodyType: "sedan" },
          { name: "Galant IX", yearFrom: 2003, yearTo: 2012, bodyType: "sedan" },
        ],
      },
      {
        name: "Grandis",
        vehicleType: "bus",
        generations: [
          { name: "Grandis", yearFrom: 2003, yearTo: 2011, bodyType: "minivan" },
        ],
      },
      {
        name: "i-MiEV",
        generations: [
          { name: "i-MiEV", yearFrom: 2009, yearTo: 2021, bodyType: "hatchback" },
        ],
      },
      {
        name: "Space Star / Mirage",
        generations: [
          { name: "Space Star / Mirage (6A)", yearFrom: 2012, yearTo: 2022, bodyType: "hatchback" },
        ],
      },
    ],
  },
  {
    name: "Subaru",
    models: [
      {
        name: "Forester",
        generations: [
          { name: "SF", yearFrom: 1997, yearTo: 2002, bodyType: "suv" },
          { name: "SG", yearFrom: 2002, yearTo: 2008, bodyType: "suv" },
          { name: "SH", yearFrom: 2008, yearTo: 2012, bodyType: "suv" },
          { name: "SJ", yearFrom: 2012, yearTo: 2018, bodyType: "suv" },
          { name: "SK", yearFrom: 2018, yearTo: 2022, bodyType: "suv" },
          { name: "SP", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Outback",
        generations: [
          { name: "BH", yearFrom: 1998, yearTo: 2003, bodyType: "wagon" },
          { name: "BP", yearFrom: 2003, yearTo: 2009, bodyType: "wagon" },
          { name: "BR", yearFrom: 2009, yearTo: 2014, bodyType: "wagon" },
          { name: "BS", yearFrom: 2014, yearTo: 2019, bodyType: "wagon" },
          { name: "BT", yearFrom: 2019, yearTo: null, bodyType: "wagon" },
        ],
      },
      {
        name: "XV / Crosstrek",
        generations: [
          { name: "XV I (GJ)", yearFrom: 2012, yearTo: 2017, bodyType: "crossover" },
          { name: "XV II (GT)", yearFrom: 2017, yearTo: 2022, bodyType: "crossover" },
          { name: "Crosstrek III (GT)", yearFrom: 2022, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Legacy",
        generations: [
          { name: "BH", yearFrom: 1998, yearTo: 2003, bodyType: "sedan" },
          { name: "BL", yearFrom: 2003, yearTo: 2009, bodyType: "sedan" },
          { name: "BM", yearFrom: 2009, yearTo: 2014, bodyType: "sedan" },
          { name: "BN", yearFrom: 2014, yearTo: 2019, bodyType: "sedan" },
          { name: "BW", yearFrom: 2019, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Impreza",
        generations: [
          { name: "GC", yearFrom: 1992, yearTo: 2000, bodyType: "hatchback" },
          { name: "GD", yearFrom: 2000, yearTo: 2007, bodyType: "sedan" },
          { name: "GE", yearFrom: 2007, yearTo: 2011, bodyType: "hatchback" },
          { name: "GJ", yearFrom: 2011, yearTo: 2016, bodyType: "hatchback" },
          { name: "GK", yearFrom: 2016, yearTo: 2022, bodyType: "hatchback" },
          { name: "GU", yearFrom: 2022, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "WRX",
        generations: [
          { name: "VA", yearFrom: 2014, yearTo: 2021, bodyType: "sedan" },
          { name: "VB", yearFrom: 2021, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "BRZ",
        generations: [
          { name: "ZC (1st)", yearFrom: 2012, yearTo: 2021, bodyType: "coupe" },
          { name: "ZD (2nd)", yearFrom: 2021, yearTo: null, bodyType: "coupe" },
        ],
      },
      {
        name: "Levorg",
        generations: [
          { name: "VM", yearFrom: 2014, yearTo: 2020, bodyType: "wagon" },
          { name: "VN", yearFrom: 2020, yearTo: null, bodyType: "wagon" },
        ],
      },
      {
        name: "Tribeca",
        generations: [
          { name: "Tribeca", yearFrom: 2005, yearTo: 2014, bodyType: "suv" },
        ],
      },
      {
        name: "Solterra",
        generations: [
          { name: "Solterra", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
    ],
  },
  {
    name: "Suzuki",
    models: [
      {
        name: "Vitara",
        generations: [
          { name: "Vitara I (Escudo)", yearFrom: 1988, yearTo: 1998, bodyType: "suv" },
          { name: "Vitara II (Grand Vitara)", yearFrom: 1998, yearTo: 2005, bodyType: "suv" },
          { name: "Vitara III (Escudo)", yearFrom: 2005, yearTo: 2015, bodyType: "suv" },
          { name: "Vitara IV", yearFrom: 2015, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "SX4",
        generations: [
          { name: "SX4 I", yearFrom: 2006, yearTo: 2013, bodyType: "hatchback" },
          { name: "SX4 II / S-Cross", yearFrom: 2013, yearTo: 2021, bodyType: "crossover" },
          { name: "S-Cross (new)", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Swift",
        generations: [
          { name: "Swift II", yearFrom: 2004, yearTo: 2010, bodyType: "hatchback" },
          { name: "Swift III", yearFrom: 2010, yearTo: 2016, bodyType: "hatchback" },
          { name: "Swift IV", yearFrom: 2016, yearTo: 2021, bodyType: "hatchback" },
          { name: "Swift V", yearFrom: 2021, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Jimny",
        generations: [
          { name: "JB23 (3rd)", yearFrom: 1998, yearTo: 2018, bodyType: "suv" },
          { name: "JB43/JB64/JB74 (4th)", yearFrom: 2018, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Ignis",
        generations: [
          { name: "Ignis II", yearFrom: 2000, yearTo: 2008, bodyType: "hatchback" },
          { name: "Ignis III", yearFrom: 2016, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Grand Vitara",
        generations: [
          { name: "Grand Vitara I", yearFrom: 1998, yearTo: 2005, bodyType: "suv" },
          { name: "Grand Vitara II", yearFrom: 2005, yearTo: 2014, bodyType: "suv" },
          { name: "Grand Vitara III", yearFrom: 2014, yearTo: 2022, bodyType: "suv" },
        ],
      },
      {
        name: "Baleno",
        generations: [
          { name: "Baleno II", yearFrom: 2015, yearTo: 2022, bodyType: "hatchback" },
          { name: "Baleno (new)", yearFrom: 2022, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Celerio",
        generations: [
          { name: "Celerio", yearFrom: 2014, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Alto",
        generations: [
          { name: "Alto (HA)", yearFrom: 2009, yearTo: 2014, bodyType: "hatchback" },
          { name: "Alto (K10)", yearFrom: 2014, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Across",
        generations: [
          { name: "Across", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Liana",
        generations: [
          { name: "Liana", yearFrom: 2001, yearTo: 2007, bodyType: "hatchback" },
        ],
      },
      {
        name: "Splash",
        generations: [
          { name: "Splash", yearFrom: 2008, yearTo: 2014, bodyType: "hatchback" },
        ],
      },
      {
        name: "Wagon R+",
        generations: [
          { name: "Wagon R+", yearFrom: 1997, yearTo: 2012, bodyType: "hatchback" },
        ],
      },
      {
        name: "Kizashi",
        generations: [
          { name: "Kizashi", yearFrom: 2009, yearTo: 2015, bodyType: "sedan" },
        ],
      },
    ],
  },
  {
    name: "Lexus",
    models: [
      {
        name: "IS",
        generations: [
          { name: "XE10", yearFrom: 1998, yearTo: 2005, bodyType: "sedan" },
          { name: "XE20", yearFrom: 2005, yearTo: 2013, bodyType: "sedan" },
          { name: "XE30", yearFrom: 2013, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "ES",
        generations: [
          { name: "XV20", yearFrom: 1996, yearTo: 2001, bodyType: "sedan" },
          { name: "XV30", yearFrom: 2001, yearTo: 2006, bodyType: "sedan" },
          { name: "XV40", yearFrom: 2006, yearTo: 2012, bodyType: "sedan" },
          { name: "XV60", yearFrom: 2012, yearTo: 2018, bodyType: "sedan" },
          { name: "XV70", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "GS",
        generations: [
          { name: "S160", yearFrom: 1997, yearTo: 2004, bodyType: "sedan" },
          { name: "S190", yearFrom: 2004, yearTo: 2011, bodyType: "sedan" },
          { name: "L10", yearFrom: 2011, yearTo: 2020, bodyType: "sedan" },
        ],
      },
      {
        name: "LS",
        generations: [
          { name: "XF30", yearFrom: 2000, yearTo: 2006, bodyType: "sedan" },
          { name: "XF40", yearFrom: 2006, yearTo: 2017, bodyType: "sedan" },
          { name: "XF50", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "NX",
        generations: [
          { name: "AZ10", yearFrom: 2014, yearTo: 2021, bodyType: "crossover" },
          { name: "AZ20", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "RX",
        generations: [
          { name: "XU10", yearFrom: 1997, yearTo: 2003, bodyType: "suv" },
          { name: "XU30", yearFrom: 2003, yearTo: 2008, bodyType: "suv" },
          { name: "AL10", yearFrom: 2008, yearTo: 2015, bodyType: "suv" },
          { name: "AL20", yearFrom: 2015, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "UX",
        generations: [
          { name: "UX (ZA10)", yearFrom: 2018, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "GX",
        generations: [
          { name: "J120", yearFrom: 2009, yearTo: 2023, bodyType: "suv" },
          { name: "J150", yearFrom: 2023, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "LX",
        generations: [
          { name: "J100", yearFrom: 1998, yearTo: 2007, bodyType: "suv" },
          { name: "J200", yearFrom: 2007, yearTo: 2021, bodyType: "suv" },
          { name: "J300", yearFrom: 2021, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "LC",
        generations: [
          { name: "LC500", yearFrom: 2017, yearTo: null, bodyType: "coupe" },
        ],
      },
      {
        name: "RC",
        generations: [
          { name: "RC", yearFrom: 2014, yearTo: null, bodyType: "coupe" },
        ],
      },
      {
        name: "LBX",
        generations: [
          { name: "LBX", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "RZ",
        generations: [
          { name: "RZ", yearFrom: 2023, yearTo: null, bodyType: "suv" },
        ],
      },
    ],
  },
  {
    name: "Infiniti",
    models: [
      {
        name: "Q50",
        generations: [
          { name: "Q50", yearFrom: 2013, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Q60",
        generations: [
          { name: "V36 (G37)", yearFrom: 2006, yearTo: 2015, bodyType: "coupe" },
          { name: "CV37", yearFrom: 2015, yearTo: null, bodyType: "coupe" },
        ],
      },
      {
        name: "Q70",
        generations: [
          { name: "Y51 (M)", yearFrom: 2010, yearTo: 2019, bodyType: "sedan" },
        ],
      },
      {
        name: "QX50",
        generations: [
          { name: "J50 (EX)", yearFrom: 2007, yearTo: 2015, bodyType: "crossover" },
          { name: "QX50", yearFrom: 2015, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "QX55",
        generations: [
          { name: "QX55", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "QX60",
        generations: [
          { name: "L50 (JX)", yearFrom: 2012, yearTo: 2021, bodyType: "suv" },
          { name: "QX60", yearFrom: 2021, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "QX70",
        generations: [
          { name: "S51 (FX)", yearFrom: 2008, yearTo: 2017, bodyType: "crossover" },
        ],
      },
      {
        name: "QX80",
        generations: [
          { name: "Z62", yearFrom: 2010, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "FX",
        generations: [
          { name: "S50", yearFrom: 2003, yearTo: 2008, bodyType: "crossover" },
          { name: "S51", yearFrom: 2008, yearTo: 2017, bodyType: "crossover" },
        ],
      },
      {
        name: "EX",
        generations: [
          { name: "J50", yearFrom: 2007, yearTo: 2015, bodyType: "crossover" },
        ],
      },
      {
        name: "G",
        generations: [
          { name: "V35", yearFrom: 2002, yearTo: 2006, bodyType: "sedan" },
          { name: "V36", yearFrom: 2006, yearTo: 2015, bodyType: "sedan" },
        ],
      },
      {
        name: "M",
        generations: [
          { name: "Y50", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
          { name: "Y51", yearFrom: 2010, yearTo: 2019, bodyType: "sedan" },
        ],
      },
    ],
  },
  {
    name: "Acura",
    models: [
      {
        name: "MDX",
        generations: [
          { name: "YD1", yearFrom: 2000, yearTo: 2006, bodyType: "suv" },
          { name: "YD2", yearFrom: 2006, yearTo: 2013, bodyType: "suv" },
          { name: "YD3", yearFrom: 2013, yearTo: 2020, bodyType: "suv" },
          { name: "YD4", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "RDX",
        generations: [
          { name: "TB1", yearFrom: 2006, yearTo: 2012, bodyType: "suv" },
          { name: "TB3", yearFrom: 2012, yearTo: 2018, bodyType: "suv" },
          { name: "TB4", yearFrom: 2018, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "TLX",
        generations: [
          { name: "TLX I", yearFrom: 2014, yearTo: 2020, bodyType: "sedan" },
          { name: "TLX II", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "ILX",
        generations: [
          { name: "ILX", yearFrom: 2012, yearTo: 2022, bodyType: "sedan" },
        ],
      },
      {
        name: "TSX",
        generations: [
          { name: "TSX I", yearFrom: 2003, yearTo: 2008, bodyType: "sedan" },
          { name: "TSX II", yearFrom: 2008, yearTo: 2014, bodyType: "sedan" },
        ],
      },
      {
        name: "TL",
        generations: [
          { name: "TL (3G)", yearFrom: 2003, yearTo: 2008, bodyType: "sedan" },
          { name: "TL (4G)", yearFrom: 2008, yearTo: 2014, bodyType: "sedan" },
        ],
      },
      {
        name: "NSX",
        generations: [
          { name: "NSX I", yearFrom: 1990, yearTo: 2005, bodyType: "coupe" },
          { name: "NSX II", yearFrom: 2016, yearTo: 2022, bodyType: "coupe" },
        ],
      },
      {
        name: "Integra",
        generations: [
          { name: "Integra (new)", yearFrom: 2022, yearTo: null, bodyType: "liftback" },
        ],
      },
      {
        name: "ZDX",
        generations: [
          { name: "ZDX", yearFrom: 2009, yearTo: 2013, bodyType: "crossover" },
          { name: "ZDX (new)", yearFrom: 2024, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "CDX",
        generations: [
          { name: "CDX", yearFrom: 2016, yearTo: 2022, bodyType: "crossover" },
        ],
      },
    ],
  },
  {
    name: "Daihatsu",
    models: [
      {
        name: "Terios",
        generations: [
          { name: "Terios I", yearFrom: 1997, yearTo: 2005, bodyType: "suv" },
          { name: "Terios II", yearFrom: 2005, yearTo: 2016, bodyType: "suv" },
        ],
      },
      {
        name: "Sirion",
        generations: [
          { name: "Sirion I", yearFrom: 1998, yearTo: 2004, bodyType: "hatchback" },
          { name: "Sirion II", yearFrom: 2004, yearTo: 2018, bodyType: "hatchback" },
          { name: "Sirion III", yearFrom: 2018, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Materia",
        generations: [
          { name: "Materia", yearFrom: 2006, yearTo: 2012, bodyType: "hatchback" },
        ],
      },
      {
        name: "Rocky",
        generations: [
          { name: "Rocky (new)", yearFrom: 2019, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Copen",
        generations: [
          { name: "Copen I", yearFrom: 2002, yearTo: 2012, bodyType: "roadster" },
          { name: "Copen II", yearFrom: 2014, yearTo: null, bodyType: "roadster" },
        ],
      },
    ],
  },
  {
    name: "Isuzu",
    models: [
      {
        name: "D-Max",
        generations: [
          { name: "D-Max I", yearFrom: 2002, yearTo: 2011, bodyType: "pickup" },
          { name: "D-Max II", yearFrom: 2011, yearTo: 2020, bodyType: "pickup" },
          { name: "D-Max III", yearFrom: 2020, yearTo: null, bodyType: "pickup" },
        ],
      },
      {
        name: "MU-X",
        generations: [
          { name: "MU-X I", yearFrom: 2013, yearTo: 2020, bodyType: "suv" },
          { name: "MU-X II", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Trooper",
        generations: [
          { name: "Trooper", yearFrom: 1981, yearTo: 2002, bodyType: "suv" },
        ],
      },
    ],
  },
  // ========== KOREAN ==========
  {
    name: "Hyundai",
    models: [
      {
        name: "Accent",
        generations: [
          { name: "LC", yearFrom: 1994, yearTo: 1999, bodyType: "sedan" },
          { name: "MC", yearFrom: 1999, yearTo: 2005, bodyType: "sedan" },
          { name: "RB", yearFrom: 2005, yearTo: 2010, bodyType: "sedan" },
          { name: "HC", yearFrom: 2010, yearTo: 2017, bodyType: "sedan" },
          { name: "Accent (current)", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Creta",
        generations: [
          { name: "Creta I", yearFrom: 2014, yearTo: 2020, bodyType: "suv" },
          { name: "Creta II", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Tucson",
        generations: [
          { name: "JM", yearFrom: 2004, yearTo: 2009, bodyType: "suv" },
          { name: "LM", yearFrom: 2009, yearTo: 2015, bodyType: "suv" },
          { name: "TL", yearFrom: 2015, yearTo: 2020, bodyType: "suv" },
          { name: "NX", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Solaris",
        generations: [
          { name: "Solaris I", yearFrom: 2010, yearTo: 2017, bodyType: "sedan" },
          { name: "Solaris II", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Santa Fe",
        generations: [
          { name: "SM", yearFrom: 2000, yearTo: 2006, bodyType: "suv" },
          { name: "CM", yearFrom: 2006, yearTo: 2012, bodyType: "suv" },
          { name: "DM", yearFrom: 2012, yearTo: 2018, bodyType: "suv" },
          { name: "TM", yearFrom: 2018, yearTo: 2023, bodyType: "suv" },
          { name: "MX", yearFrom: 2023, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Palisade",
        generations: [
          { name: "Palisade", yearFrom: 2018, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Sonata",
        generations: [
          { name: "EF", yearFrom: 1998, yearTo: 2001, bodyType: "sedan" },
          { name: "NF", yearFrom: 2004, yearTo: 2010, bodyType: "sedan" },
          { name: "YF", yearFrom: 2010, yearTo: 2014, bodyType: "sedan" },
          { name: "LF", yearFrom: 2014, yearTo: 2019, bodyType: "sedan" },
          { name: "DN8", yearFrom: 2019, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Elantra",
        generations: [
          { name: "XD", yearFrom: 2000, yearTo: 2006, bodyType: "sedan" },
          { name: "HD", yearFrom: 2006, yearTo: 2010, bodyType: "sedan" },
          { name: "MD", yearFrom: 2010, yearTo: 2015, bodyType: "sedan" },
          { name: "AD", yearFrom: 2015, yearTo: 2020, bodyType: "sedan" },
          { name: "CN7", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "i30",
        generations: [
          { name: "FD", yearFrom: 2007, yearTo: 2011, bodyType: "hatchback" },
          { name: "GD", yearFrom: 2011, yearTo: 2017, bodyType: "hatchback" },
          { name: "PD", yearFrom: 2017, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "ix35",
        generations: [
          { name: "ix35", yearFrom: 2009, yearTo: 2015, bodyType: "suv" },
        ],
      },
      {
        name: "Venue",
        generations: [
          { name: "Venue", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Kona",
        generations: [
          { name: "OS (Kona I)", yearFrom: 2017, yearTo: 2023, bodyType: "crossover" },
          { name: "SX2 (Kona II)", yearFrom: 2023, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Ioniq 5",
        generations: [
          { name: "Ioniq 5", yearFrom: 2021, yearTo: null, bodyType: "liftback" },
        ],
      },
      {
        name: "Ioniq 6",
        generations: [
          { name: "Ioniq 6", yearFrom: 2022, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Staria",
        vehicleType: "bus",
        generations: [
          { name: "Staria", yearFrom: 2021, yearTo: null, bodyType: "van" },
        ],
      },
      {
        name: "i20",
        generations: [
          { name: "PB", yearFrom: 2008, yearTo: 2014, bodyType: "hatchback" },
          { name: "GB", yearFrom: 2014, yearTo: 2020, bodyType: "hatchback" },
          { name: "BC", yearFrom: 2020, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "i40",
        generations: [
          { name: "VF", yearFrom: 2011, yearTo: 2019, bodyType: "wagon" },
        ],
      },
      {
        name: "ix20",
        vehicleType: "bus",
        generations: [
          { name: "ix20", yearFrom: 2010, yearTo: 2019, bodyType: "minivan" },
        ],
      },
      {
        name: "ix55 / Veracruz",
        generations: [
          { name: "Veracruz", yearFrom: 2006, yearTo: 2015, bodyType: "suv" },
        ],
      },
      {
        name: "Genesis (Hyundai)",
        generations: [
          { name: "BH", yearFrom: 2008, yearTo: 2012, bodyType: "sedan" },
        ],
      },
      {
        name: "Coupe / Tiburon",
        generations: [
          { name: "GK", yearFrom: 1996, yearTo: 2008, bodyType: "coupe" },
        ],
      },
      {
        name: "Getz",
        generations: [
          { name: "TB", yearFrom: 2002, yearTo: 2011, bodyType: "hatchback" },
        ],
      },
      {
        name: "Atos",
        generations: [
          { name: "Atos", yearFrom: 1997, yearTo: 2014, bodyType: "hatchback" },
        ],
      },
      {
        name: "Terracan",
        generations: [
          { name: "Terracan", yearFrom: 2001, yearTo: 2007, bodyType: "suv" },
        ],
      },
      {
        name: "Galloper",
        generations: [
          { name: "Galloper", yearFrom: 1991, yearTo: 2003, bodyType: "suv" },
        ],
      },
      {
        name: "Matrix",
        vehicleType: "bus",
        generations: [
          { name: "Matrix", yearFrom: 2001, yearTo: 2010, bodyType: "minivan" },
        ],
      },
      {
        name: "H-1 / Starex / Grand Starex",
        vehicleType: "bus",
        generations: [
          { name: "H-1", yearFrom: 1997, yearTo: 2007, bodyType: "van" },
          { name: "Starex / Grand Starex", yearFrom: 2007, yearTo: 2021, bodyType: "van" },
        ],
      },
      {
        name: "Santa Cruz",
        generations: [
          { name: "Santa Cruz", yearFrom: 2021, yearTo: null, bodyType: "pickup" },
        ],
      },
      {
        name: "Casper",
        generations: [
          { name: "Casper", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Nexo",
        generations: [
          { name: "Nexo", yearFrom: 2018, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Veloster",
        generations: [
          { name: "FS", yearFrom: 2011, yearTo: 2017, bodyType: "hatchback" },
          { name: "JS", yearFrom: 2018, yearTo: 2021, bodyType: "hatchback" },
        ],
      },
    ],
  },
  {
    name: "Kia",
    models: [
      {
        name: "Rio",
        generations: [
          { name: "DC", yearFrom: 1999, yearTo: 2005, bodyType: "sedan" },
          { name: "JB", yearFrom: 2005, yearTo: 2011, bodyType: "sedan" },
          { name: "UB", yearFrom: 2011, yearTo: 2017, bodyType: "sedan" },
          { name: "FB", yearFrom: 2017, yearTo: 2023, bodyType: "sedan" },
          { name: "DE", yearFrom: 2023, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Sportage",
        generations: [
          { name: "KM", yearFrom: 2004, yearTo: 2010, bodyType: "suv" },
          { name: "SL", yearFrom: 2010, yearTo: 2016, bodyType: "suv" },
          { name: "QL", yearFrom: 2016, yearTo: 2021, bodyType: "suv" },
          { name: "NQ5", yearFrom: 2021, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Ceed",
        generations: [
          { name: "ED", yearFrom: 2006, yearTo: 2012, bodyType: "hatchback" },
          { name: "JD", yearFrom: 2012, yearTo: 2018, bodyType: "hatchback" },
          { name: "CD", yearFrom: 2018, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "K5 / Optima",
        generations: [
          { name: "TF", yearFrom: 2000, yearTo: 2005, bodyType: "sedan" },
          { name: "JF", yearFrom: 2010, yearTo: 2015, bodyType: "sedan" },
          { name: "DL3", yearFrom: 2015, yearTo: 2020, bodyType: "sedan" },
          { name: "K5 (DL3)", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Sorento",
        generations: [
          { name: "BL", yearFrom: 2002, yearTo: 2009, bodyType: "suv" },
          { name: "XM", yearFrom: 2009, yearTo: 2014, bodyType: "suv" },
          { name: "UM", yearFrom: 2014, yearTo: 2020, bodyType: "suv" },
          { name: "MQ4", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Seltos",
        generations: [
          { name: "Seltos", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Carnival / Sedona",
        vehicleType: "bus",
        generations: [
          { name: "Sedona II", yearFrom: 2005, yearTo: 2014, bodyType: "minivan" },
          { name: "Sedona III", yearFrom: 2014, yearTo: 2020, bodyType: "minivan" },
          { name: "Carnival IV", yearFrom: 2020, yearTo: null, bodyType: "minivan" },
        ],
      },
      {
        name: "Soul",
        generations: [
          { name: "AM", yearFrom: 2008, yearTo: 2013, bodyType: "hatchback" },
          { name: "PS", yearFrom: 2013, yearTo: 2019, bodyType: "hatchback" },
          { name: "SK3", yearFrom: 2019, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Stinger",
        generations: [
          { name: "CK", yearFrom: 2017, yearTo: 2023, bodyType: "liftback" },
        ],
      },
      {
        name: "EV6",
        generations: [
          { name: "EV6", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "EV9",
        generations: [
          { name: "EV9", yearFrom: 2023, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Picanto",
        generations: [
          { name: "SA", yearFrom: 2004, yearTo: 2011, bodyType: "hatchback" },
          { name: "TA", yearFrom: 2011, yearTo: 2017, bodyType: "hatchback" },
          { name: "JA", yearFrom: 2017, yearTo: null, bodyType: "hatchback" },
        ],
      },
      {
        name: "Stonic",
        generations: [
          { name: "Stonic", yearFrom: 2017, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Niro",
        generations: [
          { name: "DE", yearFrom: 2016, yearTo: 2022, bodyType: "crossover" },
          { name: "SG", yearFrom: 2022, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Cerato / Forte",
        generations: [
          { name: "TD", yearFrom: 2008, yearTo: 2012, bodyType: "sedan" },
          { name: "YD", yearFrom: 2012, yearTo: 2018, bodyType: "sedan" },
          { name: "BD", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Mohave / Borrego",
        generations: [
          { name: "Mohave / Borrego", yearFrom: 2008, yearTo: 2022, bodyType: "suv" },
        ],
      },
      {
        name: "K7 / Cadenza",
        generations: [
          { name: "K7 / Cadenza", yearFrom: 2009, yearTo: 2016, bodyType: "sedan" },
          { name: "Cadenza (YG)", yearFrom: 2016, yearTo: 2020, bodyType: "sedan" },
        ],
      },
      {
        name: "K9 / Quoris",
        generations: [
          { name: "K9 / Quoris", yearFrom: 2012, yearTo: 2020, bodyType: "sedan" },
          { name: "K9 (new)", yearFrom: 2021, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "K3",
        generations: [
          { name: "K3", yearFrom: 2012, yearTo: 2018, bodyType: "sedan" },
          { name: "K3 (new)", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "Carens",
        vehicleType: "bus",
        generations: [
          { name: "UN", yearFrom: 1999, yearTo: 2006, bodyType: "minivan" },
          { name: "RP", yearFrom: 2012, yearTo: 2022, bodyType: "minivan" },
        ],
      },
      {
        name: "Magentis",
        generations: [
          { name: "Magentis", yearFrom: 2000, yearTo: 2010, bodyType: "sedan" },
        ],
      },
      {
        name: "Venga",
        vehicleType: "bus",
        generations: [
          { name: "Venga", yearFrom: 2009, yearTo: 2019, bodyType: "minivan" },
        ],
      },
      {
        name: "ProCeed",
        generations: [
          { name: "ProCeed", yearFrom: 2019, yearTo: null, bodyType: "liftback" },
        ],
      },
      {
        name: "XCeed",
        generations: [
          { name: "XCeed", yearFrom: 2019, yearTo: null, bodyType: "crossover" },
        ],
      },
    ],
  },
  {
    name: "Genesis",
    models: [
      {
        name: "G70",
        generations: [
          { name: "G70", yearFrom: 2017, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "G80",
        generations: [
          { name: "RG3", yearFrom: 2016, yearTo: 2020, bodyType: "sedan" },
          { name: "G80 (new)", yearFrom: 2020, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "G90",
        generations: [
          { name: "HI (EQ900)", yearFrom: 2015, yearTo: 2018, bodyType: "sedan" },
          { name: "RS4", yearFrom: 2018, yearTo: null, bodyType: "sedan" },
        ],
      },
      {
        name: "GV60",
        generations: [
          { name: "GV60", yearFrom: 2021, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "GV70",
        generations: [
          { name: "GV70", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "GV80",
        generations: [
          { name: "GV80", yearFrom: 2020, yearTo: null, bodyType: "suv" },
        ],
      },
    ],
  },
  {
    name: "SsangYong",
    models: [
      {
        name: "Actyon",
        generations: [
          { name: "Actyon I", yearFrom: 2005, yearTo: 2012, bodyType: "pickup" },
          { name: "Actyon II (Sports)", yearFrom: 2012, yearTo: 2017, bodyType: "pickup" },
        ],
      },
      {
        name: "Korando",
        generations: [
          { name: "Korando III", yearFrom: 1996, yearTo: 2006, bodyType: "suv" },
          { name: "Korando IV (C200)", yearFrom: 2010, yearTo: 2019, bodyType: "suv" },
          { name: "Korando V", yearFrom: 2019, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Rexton",
        generations: [
          { name: "Rexton I", yearFrom: 2001, yearTo: 2006, bodyType: "suv" },
          { name: "Rexton II", yearFrom: 2006, yearTo: 2012, bodyType: "suv" },
          { name: "Rexton III (W)", yearFrom: 2012, yearTo: 2017, bodyType: "suv" },
          { name: "Rexton IV", yearFrom: 2017, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Tivoli",
        generations: [
          { name: "Tivoli", yearFrom: 2015, yearTo: null, bodyType: "crossover" },
        ],
      },
      {
        name: "Torres",
        generations: [
          { name: "Torres", yearFrom: 2022, yearTo: null, bodyType: "suv" },
        ],
      },
      {
        name: "Musso",
        generations: [
          { name: "Musso (new)", yearFrom: 2018, yearTo: null, bodyType: "pickup" },
        ],
      },
      {
        name: "Kyron",
        generations: [
          { name: "Kyron", yearFrom: 2005, yearTo: 2015, bodyType: "suv" },
        ],
      },
      {
        name: "Stavic / Turismo",
        vehicleType: "bus",
        generations: [
          { name: "Stavic / Turismo", yearFrom: 2013, yearTo: null, bodyType: "minivan" },
        ],
      },
      {
        name: "Rodius",
        vehicleType: "bus",
        generations: [
          { name: "Rodius", yearFrom: 2004, yearTo: 2013, bodyType: "minivan" },
        ],
      },
      {
        name: "Chairman",
        generations: [
          { name: "Chairman", yearFrom: 1997, yearTo: 2017, bodyType: "sedan" },
        ],
      },
    ],
  },
  {
    name: "Daewoo",
    models: [
      {
        name: "Nexia",
        generations: [
          { name: "Nexia I", yearFrom: 1995, yearTo: 2008, bodyType: "sedan" },
          { name: "Nexia II", yearFrom: 2008, yearTo: 2016, bodyType: "sedan" },
        ],
      },
      {
        name: "Matiz",
        generations: [
          { name: "Matiz I", yearFrom: 1998, yearTo: 2005, bodyType: "hatchback" },
          { name: "Matiz II", yearFrom: 2005, yearTo: 2010, bodyType: "hatchback" },
          { name: "Matiz III", yearFrom: 2010, yearTo: 2015, bodyType: "hatchback" },
        ],
      },
      {
        name: "Lanos",
        generations: [
          { name: "Lanos", yearFrom: 1997, yearTo: 2012, bodyType: "sedan" },
        ],
      },
      {
        name: "Gentra",
        generations: [
          { name: "Gentra", yearFrom: 2013, yearTo: 2019, bodyType: "sedan" },
        ],
      },
      {
        name: "Lacetti",
        generations: [
          { name: "Lacetti", yearFrom: 2002, yearTo: 2013, bodyType: "sedan" },
        ],
      },
      {
        name: "Nubira",
        generations: [
          { name: "Nubira I", yearFrom: 1997, yearTo: 2003, bodyType: "sedan" },
          { name: "Nubira II", yearFrom: 2003, yearTo: 2008, bodyType: "sedan" },
        ],
      },
      {
        name: "Leganza",
        generations: [
          { name: "Leganza", yearFrom: 1997, yearTo: 2002, bodyType: "sedan" },
        ],
      },
      {
        name: "Espero",
        generations: [
          { name: "Espero", yearFrom: 1994, yearTo: 1999, bodyType: "sedan" },
        ],
      },
      {
        name: "Magnus / Tosca",
        generations: [
          { name: "Magnus / Tosca", yearFrom: 2000, yearTo: 2006, bodyType: "sedan" },
        ],
      },
      {
        name: "Kalos",
        generations: [
          { name: "Kalos", yearFrom: 2002, yearTo: 2011, bodyType: "hatchback" },
        ],
      },
      {
        name: "Winstorm",
        generations: [
          { name: "Winstorm", yearFrom: 2006, yearTo: 2012, bodyType: "suv" },
        ],
      },
    ],
  },
];
