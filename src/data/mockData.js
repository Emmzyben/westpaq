export const CATS = [
  {
    "id": "general",
    "equipNo": "EQ-1001",
    "name": "General",
    "desc": "Hand tools, spanners, welding sets and workshop consumables."
  },
  {
    "id": "ccu",
    "equipNo": "EQ-1002",
    "name": "CCU",
    "desc": "Cargo carrying units — certified containers, baskets and frames."
  },
  {
    "id": "instrument",
    "equipNo": "EQ-1003",
    "name": "Instrument",
    "desc": "Calibrated gauges, meters and precision measuring tools."
  },
  {
    "id": "lifting",
    "equipNo": "EQ-1004",
    "name": "Lifting Gear",
    "desc": "Slings, shackles and rigging hardware rated by tonnage."
  },
  {
    "id": "scaffold",
    "equipNo": "EQ-1005",
    "name": "Scaffold Materials",
    "desc": "Pipes, boards, clamps and ladders tracked per campaign."
  },
  {
    "id": "gas",
    "equipNo": "EQ-1006",
    "name": "Gas Cylinders",
    "desc": "Onboard, in-use, empty and complete cylinder counts by gas type."
  }
];

export const FIELD_SCHEMAS = {
  "general": [
    [
      "partNo",
      "Part No"
    ],
    [
      "manufacturer",
      "Manufacturer"
    ],
    [
      "uom",
      "UoM"
    ],
    [
      "remarks",
      "Remarks"
    ]
  ],
  "ccu": [
    [
      "dimension",
      "Dimension"
    ],
    [
      "swl",
      "S.W.L"
    ],
    [
      "tareWeight",
      "Tare Weight"
    ],
    [
      "colorCode",
      "Color Code"
    ],
    [
      "certNumber",
      "Certification No"
    ],
    [
      "certDate",
      "Certification Date"
    ],
    [
      "nextCert",
      "Next Certification"
    ],
    [
      "daysNext",
      "Days to Next Cert"
    ]
  ],
  "instrument": [
    [
      "partNumber",
      "Part Number"
    ],
    [
      "manufacturer",
      "Manufacturer"
    ]
  ],
  "lifting": [
    [
      "model",
      "Model"
    ],
    [
      "manufacturer",
      "Manufacturer"
    ],
    [
      "diameter",
      "Diameter"
    ],
    [
      "length",
      "Length"
    ],
    [
      "tonnage",
      "Tonnage"
    ]
  ],
  "scaffold": [
    [
      "uom",
      "UoM"
    ],
    [
      "remarks",
      "Remarks"
    ]
  ],
  "gas": [
    [
      "onboard",
      "Total Onboard"
    ],
    [
      "inUse",
      "In Use"
    ],
    [
      "empty",
      "Empty Cylinders"
    ],
    [
      "complete",
      "Complete Cylinders"
    ]
  ]
};

export const STAFF_INIT = [
  {
    "id": 1,
    "equipNo": "EQ-1007",
    "name": "Engr. Larry Udoh",
    "role": "Field Engineer",
    "dept": "Operations",
    "sup": false,
    "held": 2,
    "tx": 34
  },
  {
    "id": 2,
    "equipNo": "EQ-1008",
    "name": "Katie Bassey",
    "role": "Site Technician",
    "dept": "Operations",
    "sup": false,
    "held": 1,
    "tx": 19
  },
  {
    "id": 3,
    "equipNo": "EQ-1009",
    "name": "Gabby Nwosu",
    "role": "IT Support",
    "dept": "IT & Electronics",
    "sup": false,
    "held": 1,
    "tx": 11
  },
  {
    "id": 4,
    "equipNo": "EQ-1010",
    "name": "Ken Larry",
    "role": "Wireline Operator",
    "dept": "Instrument",
    "sup": true,
    "held": 1,
    "tx": 47
  },
  {
    "id": 5,
    "equipNo": "EQ-1011",
    "name": "Josiah Eze",
    "role": "Facilities Tech",
    "dept": "General",
    "sup": false,
    "held": 0,
    "tx": 22
  },
  {
    "id": 6,
    "equipNo": "EQ-1012",
    "name": "Jovi Obu",
    "role": "Yard Technician",
    "dept": "Operations",
    "sup": false,
    "held": 1,
    "tx": 15
  },
  {
    "id": 7,
    "equipNo": "EQ-1013",
    "name": "Chiamaka Bello",
    "role": "Rigging Supervisor",
    "dept": "Lifting Gear",
    "sup": true,
    "held": 0,
    "tx": 52
  },
  {
    "id": 8,
    "equipNo": "EQ-1014",
    "name": "Tari Sokari",
    "role": "Logistics Officer",
    "dept": "CCU",
    "sup": false,
    "held": 1,
    "tx": 9
  },
  {
    "name": "Emmanuel Amadi",
    "role": "web design",
    "dept": "IT",
    "img": "",
    "sup": true,
    "id": 1784122246317,
    "held": 0,
    "tx": 0
  }
];

export const EQUIPMENT_INIT = [
  {
    "id": "g1",
    "equipNo": "EQ-1015",
    "cat": "general",
    "name": "Ring Spanner 75\"",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "partNo": "—",
      "manufacturer": "—",
      "uom": "EA",
      "remarks": ""
    }
  },
  {
    "id": "g2",
    "equipNo": "EQ-1016",
    "cat": "general",
    "name": "Ring Spanner 60\"",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "partNo": "—",
      "manufacturer": "—",
      "uom": "EA",
      "remarks": ""
    }
  },
  {
    "id": "g3",
    "equipNo": "EQ-1017",
    "cat": "general",
    "name": "Ring Spanner 50\"",
    "tag": "—",
    "location": "Offshore",
    "qty": 3,
    "status": "available",
    "holder": null,
    "fields": {
      "partNo": "—",
      "manufacturer": "—",
      "uom": "EA",
      "remarks": ""
    }
  },
  {
    "id": "g4",
    "equipNo": "EQ-1018",
    "cat": "general",
    "name": "Ring Spanner 55\"",
    "tag": "—",
    "location": "Offshore",
    "qty": 4,
    "status": "out",
    "holder": 5,
    "fields": {
      "partNo": "—",
      "manufacturer": "—",
      "uom": "EA",
      "remarks": ""
    }
  },
  {
    "id": "g5",
    "equipNo": "EQ-1019",
    "cat": "general",
    "name": "Allen Key 5mm",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "partNo": "—",
      "manufacturer": "—",
      "uom": "EA",
      "remarks": ""
    }
  },
  {
    "id": "g6",
    "equipNo": "EQ-1020",
    "cat": "general",
    "name": "Grinding Machine Key",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "partNo": "—",
      "manufacturer": "—",
      "uom": "EA",
      "remarks": ""
    }
  },
  {
    "id": "g7",
    "equipNo": "EQ-1021",
    "cat": "general",
    "name": "Miller Welding Machine 907810",
    "tag": "907810",
    "location": "Offshore",
    "qty": 9,
    "status": "out",
    "holder": 6,
    "fields": {
      "partNo": "907810",
      "manufacturer": "Miller",
      "uom": "EA",
      "remarks": "NF310693C · WPQ01 · WPQ02 · WPQ03"
    }
  },
  {
    "id": "g8",
    "equipNo": "EQ-1022",
    "cat": "general",
    "name": "12\" Combination Square",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "partNo": "—",
      "manufacturer": "Ring & Flat",
      "uom": "EA",
      "remarks": ""
    }
  },
  {
    "id": "c1",
    "equipNo": "EQ-1023",
    "cat": "ccu",
    "name": "20FT Cargo Container",
    "tag": "WEL/RL/001",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "dimension": "2.59M x 2.44M x 6.05M",
      "swl": "4000Kgs",
      "tareWeight": "2950Kgs",
      "colorCode": "Green",
      "certNumber": "WEL/P/26/001",
      "certDate": "5/8/2026",
      "nextCert": "11/7/2026",
      "daysNext": "141 days"
    }
  },
  {
    "id": "c2",
    "equipNo": "EQ-1024",
    "cat": "ccu",
    "name": "20FT Cargo Container",
    "tag": "WEL/RL/002",
    "location": "Offshore",
    "qty": 1,
    "status": "out",
    "holder": 8,
    "fields": {
      "dimension": "2.59M x 2.44M x 6.05M",
      "swl": "4000Kgs",
      "tareWeight": "2950Kgs",
      "colorCode": "Green",
      "certNumber": "WEL/P/26/002",
      "certDate": "5/8/2026",
      "nextCert": "11/7/2026",
      "daysNext": "141 days"
    }
  },
  {
    "id": "i1",
    "equipNo": "EQ-1025",
    "cat": "instrument",
    "name": "Welding Gauge",
    "tag": "42928",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "3112090681",
      "manufacturer": "Insize"
    }
  },
  {
    "id": "i2",
    "equipNo": "EQ-1026",
    "cat": "instrument",
    "name": "Protractor",
    "tag": "3435",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "19",
      "manufacturer": "Starrett"
    }
  },
  {
    "id": "i3",
    "equipNo": "EQ-1027",
    "cat": "instrument",
    "name": "Welding Gauge",
    "tag": "30635",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "1MM",
      "manufacturer": "—"
    }
  },
  {
    "id": "i4",
    "equipNo": "EQ-1028",
    "cat": "instrument",
    "name": "Vernier Caliper",
    "tag": "58678",
    "location": "Offshore",
    "qty": 1,
    "status": "out",
    "holder": 4,
    "fields": {
      "partNumber": "1707121171",
      "manufacturer": "Insize"
    }
  },
  {
    "id": "i5",
    "equipNo": "EQ-1029",
    "cat": "instrument",
    "name": "Feeler Gauge",
    "tag": "27689",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "—",
      "manufacturer": "Marberg"
    }
  },
  {
    "id": "i6",
    "equipNo": "EQ-1030",
    "cat": "instrument",
    "name": "Digital Clamp Meter",
    "tag": "66880366",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "66880366",
      "manufacturer": "Fluke"
    }
  },
  {
    "id": "i7",
    "equipNo": "EQ-1031",
    "cat": "instrument",
    "name": "Infrared Thermometer",
    "tag": "WEL/IT/01",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "TA601C",
      "manufacturer": "TASI"
    }
  },
  {
    "id": "i8",
    "equipNo": "EQ-1032",
    "cat": "instrument",
    "name": "MIT525 Insulation Tester",
    "tag": "MIT525/2-EU",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "1016085",
      "manufacturer": "Megger"
    }
  },
  {
    "id": "i9",
    "equipNo": "EQ-1033",
    "cat": "instrument",
    "name": "Harness Tester Equipment",
    "tag": "—",
    "location": "Offshore",
    "qty": 1,
    "status": "available",
    "holder": null,
    "fields": {
      "partNumber": "—",
      "manufacturer": "OEM · Mitutoyo"
    }
  },
  {
    "id": "l1",
    "equipNo": "EQ-1034",
    "cat": "lifting",
    "name": "Flat Polyester Webbing Sling",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "model": "—",
      "manufacturer": "Cleftec",
      "diameter": "90mm",
      "length": "3m",
      "tonnage": "3T"
    }
  },
  {
    "id": "l2",
    "equipNo": "EQ-1035",
    "cat": "lifting",
    "name": "Flat Polyester Webbing Sling",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "model": "—",
      "manufacturer": "Cleftec",
      "diameter": "60mm",
      "length": "1m",
      "tonnage": "2T"
    }
  },
  {
    "id": "l3",
    "equipNo": "EQ-1036",
    "cat": "lifting",
    "name": "Flat Polyester Webbing Sling",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "out",
    "holder": 7,
    "fields": {
      "model": "—",
      "manufacturer": "Cleftec",
      "diameter": "130mm",
      "length": "5m",
      "tonnage": "5T"
    }
  },
  {
    "id": "l4",
    "equipNo": "EQ-1037",
    "cat": "lifting",
    "name": "Flat Polyester Webbing Sling",
    "tag": "—",
    "location": "Offshore",
    "qty": 4,
    "status": "available",
    "holder": null,
    "fields": {
      "model": "—",
      "manufacturer": "Cleftec",
      "diameter": "90mm",
      "length": "6m",
      "tonnage": "3T"
    }
  },
  {
    "id": "l5",
    "equipNo": "EQ-1038",
    "cat": "lifting",
    "name": "Flat Polyester Webbing Sling",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "model": "—",
      "manufacturer": "Cleftec",
      "diameter": "130mm",
      "length": "4m",
      "tonnage": "5T"
    }
  },
  {
    "id": "l6",
    "equipNo": "EQ-1039",
    "cat": "lifting",
    "name": "Flat Polyester Webbing Sling",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "model": "—",
      "manufacturer": "Anchor Power Lift",
      "diameter": "130mm",
      "length": "5m",
      "tonnage": "5T"
    }
  },
  {
    "id": "l7",
    "equipNo": "EQ-1040",
    "cat": "lifting",
    "name": "Flat Polyester Webbing Sling",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "model": "—",
      "manufacturer": "Anchor Power Lift",
      "diameter": "130mm",
      "length": "4m",
      "tonnage": "5T"
    }
  },
  {
    "id": "s1",
    "equipNo": "EQ-1041",
    "cat": "scaffold",
    "name": "6M Pipe",
    "tag": "—",
    "location": "Offshore",
    "qty": 2170,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": "Main campaign stock"
    }
  },
  {
    "id": "s2",
    "equipNo": "EQ-1042",
    "cat": "scaffold",
    "name": "2M Board",
    "tag": "—",
    "location": "Offshore",
    "qty": 480,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s3",
    "equipNo": "EQ-1043",
    "cat": "scaffold",
    "name": "3M Board",
    "tag": "—",
    "location": "Offshore",
    "qty": 410,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s4",
    "equipNo": "EQ-1044",
    "cat": "scaffold",
    "name": "4M Board",
    "tag": "—",
    "location": "Offshore",
    "qty": 545,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s5",
    "equipNo": "EQ-1045",
    "cat": "scaffold",
    "name": "Base Plate",
    "tag": "—",
    "location": "Offshore",
    "qty": 345,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s6",
    "equipNo": "EQ-1046",
    "cat": "scaffold",
    "name": "Board Clamp",
    "tag": "—",
    "location": "Offshore",
    "qty": 2366,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s7",
    "equipNo": "EQ-1047",
    "cat": "scaffold",
    "name": "Beam Clamp",
    "tag": "—",
    "location": "Offshore",
    "qty": 1462,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s8",
    "equipNo": "EQ-1048",
    "cat": "scaffold",
    "name": "Single Clamp",
    "tag": "—",
    "location": "Offshore",
    "qty": 2550,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s9",
    "equipNo": "EQ-1049",
    "cat": "scaffold",
    "name": "Double Clamp",
    "tag": "—",
    "location": "Offshore",
    "qty": 6810,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s10",
    "equipNo": "EQ-1050",
    "cat": "scaffold",
    "name": "Swivel Clamp",
    "tag": "—",
    "location": "Offshore",
    "qty": 1650,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s11",
    "equipNo": "EQ-1051",
    "cat": "scaffold",
    "name": "Sleeve",
    "tag": "—",
    "location": "Offshore",
    "qty": 630,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s12",
    "equipNo": "EQ-1052",
    "cat": "scaffold",
    "name": "3M Aluminium Ladder",
    "tag": "—",
    "location": "Offshore",
    "qty": 19,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s13",
    "equipNo": "EQ-1053",
    "cat": "scaffold",
    "name": "4M Aluminium Ladder",
    "tag": "—",
    "location": "Offshore",
    "qty": 38,
    "status": "out",
    "holder": 2,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s14",
    "equipNo": "EQ-1054",
    "cat": "scaffold",
    "name": "6M Aluminium Ladder",
    "tag": "—",
    "location": "Offshore",
    "qty": 8,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s15",
    "equipNo": "EQ-1055",
    "cat": "scaffold",
    "name": "Safety Cage Ring",
    "tag": "—",
    "location": "Offshore",
    "qty": 3,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s16",
    "equipNo": "EQ-1056",
    "cat": "scaffold",
    "name": "Sole Pad",
    "tag": "—",
    "location": "Offshore",
    "qty": 225,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s17",
    "equipNo": "EQ-1057",
    "cat": "scaffold",
    "name": "6M Steel Ladder",
    "tag": "—",
    "location": "Offshore",
    "qty": 3,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s18",
    "equipNo": "EQ-1058",
    "cat": "scaffold",
    "name": "4M Steel Ladder",
    "tag": "—",
    "location": "Offshore",
    "qty": 6,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s19",
    "equipNo": "EQ-1059",
    "cat": "scaffold",
    "name": "2M Steel Ladder",
    "tag": "—",
    "location": "Offshore",
    "qty": 7,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s20",
    "equipNo": "EQ-1060",
    "cat": "scaffold",
    "name": "Double Sided Ladder",
    "tag": "—",
    "location": "Offshore",
    "qty": 165,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "s21",
    "equipNo": "EQ-1061",
    "cat": "scaffold",
    "name": "Bind & Plate",
    "tag": "—",
    "location": "Offshore",
    "qty": 150,
    "status": "available",
    "holder": null,
    "fields": {
      "uom": "PCS",
      "remarks": ""
    }
  },
  {
    "id": "ga1",
    "equipNo": "EQ-1062",
    "cat": "gas",
    "name": "Industrial Oxygen (O₂)",
    "tag": "—",
    "location": "Offshore",
    "qty": 6,
    "status": "available",
    "holder": null,
    "fields": {
      "onboard": "6",
      "inUse": "—",
      "empty": "—",
      "complete": "—"
    }
  },
  {
    "id": "ga2",
    "equipNo": "EQ-1063",
    "cat": "gas",
    "name": "Acetylene (C₂H₂)",
    "tag": "—",
    "location": "Offshore",
    "qty": 4,
    "status": "available",
    "holder": null,
    "fields": {
      "onboard": "4",
      "inUse": "—",
      "empty": "—",
      "complete": "—"
    }
  },
  {
    "id": "ga3",
    "equipNo": "EQ-1064",
    "cat": "gas",
    "name": "Argon (Ar)",
    "tag": "—",
    "location": "Offshore",
    "qty": 0,
    "status": "available",
    "holder": null,
    "fields": {
      "onboard": "—",
      "inUse": "—",
      "empty": "—",
      "complete": "—"
    }
  },
  {
    "id": "ga4",
    "equipNo": "EQ-1065",
    "cat": "gas",
    "name": "Soldering Mixture (Ar/CO₂)",
    "tag": "—",
    "location": "Offshore",
    "qty": 0,
    "status": "available",
    "holder": null,
    "fields": {
      "onboard": "—",
      "inUse": "—",
      "empty": "—",
      "complete": "—"
    }
  },
  {
    "id": "ga5",
    "equipNo": "EQ-1066",
    "cat": "gas",
    "name": "Nitrogen (N₂)",
    "tag": "—",
    "location": "Offshore",
    "qty": 0,
    "status": "available",
    "holder": null,
    "fields": {
      "onboard": "—",
      "inUse": "—",
      "empty": "—",
      "complete": "—"
    }
  },
  {
    "id": "ga6",
    "equipNo": "EQ-1067",
    "cat": "gas",
    "name": "Carbon Dioxide (CO₂)",
    "tag": "—",
    "location": "Offshore",
    "qty": 0,
    "status": "available",
    "holder": null,
    "fields": {
      "onboard": "—",
      "inUse": "—",
      "empty": "—",
      "complete": "—"
    }
  },
  {
    "id": "ga7",
    "equipNo": "EQ-1068",
    "cat": "gas",
    "name": "Propane (C₃H₈)",
    "tag": "—",
    "location": "Offshore",
    "qty": 2,
    "status": "available",
    "holder": null,
    "fields": {
      "onboard": "2",
      "inUse": "—",
      "empty": "—",
      "complete": "—"
    }
  },
  {
    "id": "ga8",
    "equipNo": "EQ-1069",
    "cat": "gas",
    "name": "Propane Cylinder",
    "tag": "—",
    "location": "Aveon",
    "qty": 3,
    "status": "return",
    "holder": null,
    "fields": {
      "onboard": "—",
      "inUse": "—",
      "empty": "3",
      "complete": "—"
    }
  },
  {
    "id": "ga9",
    "equipNo": "EQ-1070",
    "cat": "gas",
    "name": "Acetylene Cylinder",
    "tag": "—",
    "location": "Aveon",
    "qty": 3,
    "status": "return",
    "holder": null,
    "fields": {
      "onboard": "—",
      "inUse": "—",
      "empty": "3",
      "complete": "—"
    }
  },
  {
    "id": "ga10",
    "equipNo": "EQ-1071",
    "cat": "gas",
    "name": "Oxygen Cylinder",
    "tag": "—",
    "location": "Aveon",
    "qty": 1,
    "status": "return",
    "holder": null,
    "fields": {
      "onboard": "—",
      "inUse": "—",
      "empty": "1",
      "complete": "—"
    }
  }
];

export const LOG_INIT = [
  {
    "id": "tx1784126322240",
    "dateOut": "2026-07-15 14:38:42",
    "dateIn": "2026-07-15 14:39:09",
    "managerDate": "2026-07-15 14:39:09",
    "tag": "—",
    "equipNo": "EQ-1022",
    "name": "12\" Combination Square",
    "cat": "general",
    "project": "test",
    "location": "test",
    "tech": "Katie Bassey",
    "status": "return",
    "techSigOut": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAACWCAYAAADwkd5lAAAQAElEQVR4Aeyde2wr2V3HZ8Z2XvedOHbi3MSrbVe0KwQIrco/ywLitd0KCupKbMtDFVVRVaSCxLYShVZb0VJVWyEqJN6UPygLValaFXVLRRGURQhU3T8WqVpAu3Dj5Dq287i5Nzcv2+Pp7+v4eI8n48TxYzyPr2/OnTOvc36/zxn/vnPOsceWwRcJkAAJkAAJ9EGAAtIHNJ5CAiRAAiRgGBQQXgUkMC4CrJcEQk6AAhLyBqT5JEACJDAuAhSQcZFnvSRAAiQQcgIhFpCQk6f5JOAvgelrswvbc5mlWjp7sz6/sGwjZRZXGqdSbsXJDCu1yke9/rrL2vwgQAHxgzLrIIEhE4AIIPBnc3mnx3QwNTU5m5RXQl5W62V6vQxzeP9a5Uu1Sd1O2I5EYRnyheFzcRQQn4GzOhLoh8C1uYUjBFwVhEUDEojN/ZR13jmOcf6/Xo/oVhdsR6KwdCMUju0UkHC0E62MGYGVhx/+UV0wpiYnJxFw3Rgcj1ej9bLlVavVa0fHx5vl4uoVSWYvqVIsmMNKen11eSlz3X6odfiIRGFRRIK9pIAEu31oXYwI3EjnjpVoHB/Z30Ag9XIfQVgF5spGwXKnzdJaAmmrvJ7c2bwzcW+7lJFyHkga69925U5K2arsx1J0pQ6fkLoZCBZIFJZuhMaznQIyDu6skwRaBK7cyBSVaExMpCYQJFu72gsE1uPjahXBFglBuL0zAplRCQvmiSKAJ9AuUEAC3Tw0LooEVlZWHleiMTM9vegWDQhGw240IBZIEIzd7Y3JKLI4y6dBhQXzRGrOCLyv3Mi+clZ93HdxAhSQizPjGSTQF4HMwrKNgHZcN19yiwYKtOWlBGOzvJbANqbTBPoRFvCemZ56UzaXdyAm89ll+3TJ3HJRAhSQixLj8SRwAQIYRoFoIJmWder9hvluiAYS5iwuUDQPdRFwC8v+weG/oTfnOsyAmFgJy0KbIEFQrs1m77qP4/r5BE5d0OefwiNIgATOInD1emYTQQnBCcMo7mMR1CYSjScgGpjsdu/n+nAIPNit/CCG/8AZSU3Wu0uHoExNTV1He6Hd8AVL9zFc9yZAAfHmwq1dCHBzdwLX5xaPJQg1pmem0whK+pEQjcPDo7sIZAhqa2trL+n7mR89AdVDQRvY1amraBN3rWg36Sh29E7Qru7juH5CgAJywoH/k0DfBGbnl6oiHM7k5MSEFGJKav4hQOF7GAhYEI37d8uzzR38b+wEtrb+Zw9tgrZBOqt3gnZF+yKxd9LZdBSQTh5cI4GeCaj5jVQqmdJPgnA8uHf3cwhQ+B6Gvo/5YBLQeycyrPjhhtNoeFnq7p3g5sHruNFsC16pFJDgtQktCjCB2dk3XsVdKO5G3fMbEA7czUI49vfv/2KA3aBpZxBoNBqf3NxYS6AtkaR3UkPbuk/BcBduHnAtIOG6MKxLn3IfF+V1CkiUW5e+DZVAZnHZTk3V7uEuVC9YAk7zOxsQDn0789EgIL2TCbQtxGR6wpw+s3eykP4QxAST8ensUi0aBLp7QQHpzoZ7okWgb2+mr6RfQlAwTavj/SJ3pnUEFRnySPRdOE8MFYHbt28fdfRO7Fq1W+8kkUi2n0AMQbm68OanQuVsD8Z2vCF6OJ6HkECsCGBY4uqVS48rpxEsjo6OHkA45M60Y+5DHcNlfAhsl4uTqndSXkxPoHci18gpABjumrYOvoobEYgJ5s9OHRTCDRSQEDYaTfaFwLvlzd7Qh6vqdr2KYHFvp3zFFwtYSbgI3LpVQ+9ErpHmU49tu3YkYuK4nYCYYP5Mrq/mb7lAUK5ez5Tcx4VhvWcBCYMztJEEhkEAd4fy5v5LKUt9JNcxG8dv2S7fid3zqIQB//oksFUuTouYWOitSkqe2TuZmc7KNdd8zEoul0v3WaXvp1FAfEfOCoNMAHeDuDtUNjZOnk9llUqlb6ltXJJAHwTsjt5JvbbfrXdiG6nmkwz6qMP3UyggviNnhUEkgJ9WxR0ghhda9jmG4Xxgs7yebK2PccGqo0Zgq1K8rPVOLOmd2CIobTdxHeJ6xA1Ne2MAMxSQADYKTfKXAN6k+KEiVavjNPCxXBl6KPyB2sYlCYyQgCO9k6QIilmvHe/r9QRdSCggemsxHzsCEA+8SZXjRwcH5crGGj+Wq4Bw6SuB7c3SZZkvMQ8PDzsm1fVr1FeDzqksDgJyDgLujisBXTwceeGNe293cyGuPOh3cAjcv1tZxPV4dFR9OThWnbaEAnKaCbfEgIBbPCobBb4XYtDuYXNxcjL1vUG2mW+aILcObRsJAYrHSLB6F8qtfRHAF1hb12lf5/t1EgXEL9KsJxAEWm/K5vc7ZNTKYc8jEM0SeyPS2Zs1XJv45BUSvsCqz3s4hhNIRhSQQDYLjRoFAbxB1ZuS4jEKwizzIgRULwOCkUgkkura1MuQ69TAXEilWGje9Oj7gpCngAShFbrawB3DIkDxGBZJltMvgetzC3u4DiEYSO5eBsoVwXDwdOe9I+dXmsKxEUzhgK1IFBBQYIo0Abxp1d0d3qActop0cwfKOb2XMTk5eVldh7qRuCZtu1FrCYaFpzsf7BT+TD8mqHkKSFBbhnYNhQDFYygYY1lIP0730stAuRCN4+Pj5lOdcUOzVV6bwPawJQpI2FqM9vZMgOLRMyoeOAABfQL8rF4GhqbQy0CCaOxul0L/VGcKyAAXDk8NLgGKR3DbJgqW6UNTZ0yAO9LLuK8EA0NTUfBd94ECotNgfngExlgSxWOM8CNcNa4rTH4jnTUBDsFAavUyrkUYiUEBiXLrxtC3G+nF+2qiEuPMeBPHEANdHgKB9EL+RV001HWlF41rzLbtYyUYUexl6P668xQQNxGuh5pAKpW6rBygeCgSXPZKQOYzjpRoJCzjrd1Eo95wvq5EY6u8PtVr+T4d51s1FBDfULMiPwioNzwmLP2oj3WEn8D8wrLdFo1EYlJdQ7pn6GlAMJBwY7JdKjyp749rngIS15aPoN8IBMqtuA0lKL+5PJ/A3MLNYyUYF5nPOL/k+B1BAYlfm0fWY0tecA53i1j2m3hetAikF/Jf1QUjaSUmuvUy3F/oixaJ4XtDARk+U5Y4BgLX5xZ2VbXVarXjV93Udi7jQ2BeH5ayjKe8BAM0cLNRs43PqqGpsH6hD76MI1FAxkGddQ6dwMTExFVVaBS+oKV84bI3AunsclXvZUhn1PISDQiG+tSUEo2d8up7equFR7kJDF9A3DVwnQRGT+C7VLDg5PnoYQehhhvpxY4HEyYSVkpdA7p9EAxcExALJEyAb8X4U1M6m2HkKSDDoMgyxkpA7jxfUQZw8lyRiNzySX1YSnqcng8mhNcQjf2Do28oweA1ASqjSRSQ0XBlqT4SUHeeCBw+VhvEqiJlU7rzR5a+ds6w1CEEAwm9jAe75R+PFIyAOkMBCWjD0KzeCDz66KPtp5hWq7Wd3s7iUUEkMDuf25feZAMfrUVKJLr+yJLjMSw1E0Sfom4TBSTqLRxx/8pb99qfuNrd3khH3N2ouffb+rBUKpWaUb1Jt6PoXe4dHH5F9TA4LOUmNJ51CojGndnwEcCwRvisjq/FumBIL+N30H5eogHBsG17H4KBhGGpg93K2+NLLpieU0CC2S60qkcCXsGnx1N5mA8E5jJLh/qw1FmC4TEs1X6umQ+msoo+CFBA+oDGU0iABLwJmBNX/k4XjGQyOdVN5NHL2D+ynzvpYRQsDkt5Mw3yVgpIkFuHtp1LQAUnBKNzD+YBIyGgD0tl0rPvUG3irgxtZNuN5g8sKdF4sLP+MfdxXA8PAQpIeNqKlpJAIAjMZc9/GCEMhWCcHpZai/QPLMHvOCUKSDRam16QwMgIXL42/78dw1IJ74cRwgCIxu5e9TdUD4PDUqAS3UQBiW7bxsozBK5YOTxiZ2fncwdKNC5dmnnkrGEp6WVsQzCQ8Gmp472N3xuxeSw+IAQoIAFpCJoxGAEZW7cHK4FngwDmM7K5vJNKpaa9RANCLYLRgFggQTCklxHv798AXEwTBSSmDR81t3c277S/kR4130btz7XZbPvBhPiYrV6fCIYhySlv7r1XE4yEfgzz8SVAAYlv29PzmBNQvY2pqalTDyZsikZxNSc9DFOSZdR2/jzmuOi+BwEKiAcUbvKTAOvyk8DEzPWX1dyGu7cBO9TwVFM0DGMD25hIoBsBCkg3MtxOAhEioHobN65f+x733Eart/ERDFHJfAaHpyLU7qN2hQIyasIsnwTGR+DZC/Q2Pj4+M1nzuAgMWi8FZFCCPJ8EAkYgnb1ZxyepJD3v1du4v3fwRfY2AtZoITWHAhLShqPZgxHI3Vx+fjGX/1J2aeU/M4v51ySVM7n8bmZx5WB+YaUqQz41yduSGr0knLO0tPyJwawa6OwnYKeIhpOQl7skfW7jcG/zafd+rpNAPwQoIP1Q4zkjJZDNPfRtBEMkBMSzkjLkrGO89tkN69mGYfyM4ZhvMU3jYUkZ0zCumaY5bVlmSiaYk5K3JHX/0/bgnLpjfVivC/ZnFvMjnYiW3gaEDj/C9E2YY2gvzG1Ua43Ps7ehQWF2qAQoIEPFycIuQkDu+F/NLK407/D1wGsYzqMIhkgXKS9ox8J+0zQWdN9a/tYWF1c+M4C9GZSDcqWzAaET7Xu9NL23cXdz7ZnX9zBHAsMlQAEZLk+W1oWABLyO34VA8JOo9waz9epymuGc808/r4Fbbsc5dAzjnuMYFUn/Z5rGLbnIv5ywGp/Gnfio00ndUrNumJY3T17Jhml+AAxUEj6N7GJ+Szv0VHYuc7PaPC6XL6MY/QC4Xq3W/hv+8ZNUOhnmR0lA3lujLP6ssrkvygQwJ9AKdg6CpAS8rr8LAQ4IgM1kGK8iCKpUKRbMs5Icl8H5SCJIRmWjMFMprl6vbKxmJb2hdGf1sY3i6s8W19c+iGNGnU7qLlhil6mS4Th/Ir7VJYm+eFsgfEzDNObASiXwk6SGqJxkMpFqHqcV0dHb2Cq+WdvFLAmMnAAFZOSI41GBTDrXJdhhLL4pGJgTcAc7kEAQbSa3UGwULAn+lgTgR3DcBdImysPxXvVh+7hTeaPwPvEtJalDWERNpKd0fm/Fyy8lHOxtjLt1410/BSTe7T+Q952CYSW8Ah2Cu6SquhtHEG2m4upFhaKrrfW6XVI7RchC81BFEUvpKXX2VoSV6IrypvtSJvkt1VPBEm2xsJT/j+5ndO7hGgkMgwAFZBgUY1ZG5ubDH0XQOkMwjl2CMTlKRDubd3KqfARWlQ/L8tpsdh8C4MUUglKr1Y7Elx3kZen5h7aQvswPoAyUlcnl73oeyI0kMEQCFJAhwoxDUTK3UTQbdvtnSBHUJLl7GFN+s8CQjqpzdj53T+WDvERvCQF/ampqBgKg2ypMHYgwems7m8Vpyc8hL8tz51ZQlmkY11E20nwuX9XLZp4EhkWAAtIPyZiegztbmdtYVO47DecIQU3SSHsYqr6zg0bZ4wAADAFJREFUlvpcQDKZvHLWsePcN3M1/Ro4IrC7e0sQjXq9fgSREKbnvjfdcyum0fg0ynD7JwWlUB8S6l566KH3uY/hOgn0Q0CurX5O4zlxI4DAgzvbtt+m+WKlVJhurwcgo4Jny865AJjUNkH1Nq5cvvRwy772PtitRGO7cqdvpqXi2gchPOXiarOXIuWemg9C3fWq80dKTLK55b9pG8IMCVyQAAXkgsDieDiCHwKP8r0ZoO7cfptaD8ryoGa9X9kigrep8mNbJmafFjuan0zz7G3YdnPoD0F/FDZKuclmW4mgiJhgHqWjmpM2tZ55XUzy/99xQDBXaFWACFBAAtQYATUlqYIfvtSHgBRQO40HW7f/WNl2EhzVmr/LtHqYYfbKF9x2SCDH3EZGgru1XV73behP6sM8SrNnYhhmBXYY2qtl50MQEyQRvgNtN7Mk4EmAAuKJhRsVAQkmNZXHF/pUPqhLW17KNgRylfdhmZCg2+xtJOSl14dgXa/bNYivBHK858baOyoXb2dhR1l6JqbjfBH26fYiL4IyLW3f/E6P+FXHNiYScBPAxezexvUIE+jXNQkyx/2e6+d5W+X1pKpP4vjIfxxJRKrWCrR1CbqmqhtLYYbexiMI1tuV9QlsC1oqbRSehn0Qk1TS+XXY7LZR/Eq0fHRETBoLueXn3cdwPZ4EKCDxbPcLey1BZurCJ43pBOmEtCePJcCP4u75MQRSBFURqbZgKXel/joCsjDD++tVtT3oy/VC4TOwGbYjiZicYidiYjqG9Sx8bzJYWPlK0P2ifaMjgAt8dKWzZBIYA4FR9ULwMEMETknfQiDVXZNgi97GzyPwSv0pfV9Y8yImKfiD5DjGfbcfTQaW+VPC46RnsrjyD+5juK4TiF6eAhK9NqVHQkB6AUPrhTTvtHP55sMMpeiOP9SDACvBFu+lFzp2RmilsrF6DX4imYZzC4KpuwcxcUzzJ5WYZBfz/6zvZz6aBHDRR9MzehVrAtILaA8tyTBTz3MhEItMbsVBQjBEQnDUYSJ4IpAi6fXox0Q5XyoWHoNglmUS3mg4fw8eur9NXqbxw2AHngu5/C19P/PRIUABiU5bRt2TC/uH3oE6qde5EAQ/0zj5p85VSzwuBUETwVNti/uyXCr8NHiAi/RMvu4lJo5hfL8Sk7jzipr/FJCotSj9aRPQewe99kIQAB39R6xkA4Ijkv64lHYlzLQJlIqFJzUx+VdBJ9rR3m1AnCEk2aX8+utbmQszAQpImFuPtp9L4KK9EARAfN+lnTYKfI+cS/n0ASImPwSWZRnmkp5Jp5g4xhKE5PRZ3BJYAl0M45ujCxhujgaBfnoh0fA8OF6UioW2mOhWQUQwR5LNrXxZ3858eAhQQMLTVrS0TwJ6LwTP9eqzGJ42BALlZo/EKKiiMKxlGObbs7l886PA2dzK3xp8hYYABSQ0TUVD+yWg90Jaz/V6R79l9Xcez9IJlIqreQiJ1xyJYZg/l22JSWbh5ocMvgJNgAIS6OahccMisH9Y+0NVlgybfEHluRwfATVHYjjGv3iJiWklPgUxkbQxPitZ81kEKCBn0eG+NgEZ+jn1OPD2zhBkHtwt/io+hgtTMWwi/rS/aIhtTOMjUN5Y/RElJo5jfM0tJmLZgoi+nc3efK/k+RcgAmEQkADhiq8pMvTj26PHR0VZ/xiu+INr/52jqovl9kegsrH6lBITKaH9Y1ci+paRSPyp9EbwhOBXZB//AkAAb6IAmEETgkpA7trbjx6Xu/ZTD9cLqt3d7Do6rv2j2id3tX+t8lwGj4DMk7xLkmkahvt7I28SIXkQPIvjZxEFJH5tfiGP5a49o06Qu/aEyod1eW+7+BNqiMSUl4gih7LOaswA7JNJ9+VycdWs151fEnMakvB3KZtb2UOGaXwEKCDjYx+amu2G821lbBQCLoZIlD8iingP/LJa5zK4BLYrhb8SIcFNTGs+zrwcXGvjYRnePPHwlF72TWCrVPhudXIr4KrV0C6Pq7WXlfHZXP4vVJ7L4BMQEZlWVmaX8neySyu/q9a59JcABWSkvKNTuN0w/kl5I3MHahhBbQrdcner+H1qKAvGR8En+BGjdKfpq2PkDMf8zYVc/v3Ndf7nKwEKiK+4w1vZVmn1x1TAlakDmdcMry/Kcn0oCz5RRBSZ4C+lF3LTMQz8gNVrsFbyn8SSyV8CFBB/eYe6tmrd/IRyICrBVgJRWwwpIqp1w7GsFFffKu33RsMwn3Ec492G68XV0ROggIyecWRq2N1c/YirF9KeGwmzkxKETDzCHT5QREAhXKlcvP35ysbql8JldTSspYBEox1986JS2fsFVZn0Qv5L5cO+xOPbdXEU30I/zxP2NqH9wSdAAQl+G43Hwm612ndf0AOtkbjxrm6Hhm075kR03ygiYWtB2us3AQqI38QjUJ8E2seVG5nMlc+pfBSW4ptFEYlCS9IHPwhQQPygHL06/l0PslfTK89FyUWKSJRaM5S+hMZoCkhomipYhiLIKoumUsZHVT4qS/iniySHs6LSsvRjmAQoIMOkGbOy9ACbXlj5ZtTcd4tINpd3ouYj/SGBQQhQQAahF/NzEWAVgoRlPqHy414Os374qIQS5UJE0tmboX8qMXxhIoFBCVBABiUY8/P14Cq9kPZDF6OEBSJiy0v5lJAXh7QUDS7jTIACEufWH4LvCK6qGOmFPKryUVtuldeT5eIqv7UetYalPwMROC0gAxXHk+NIoCEv5Xc6u7yr8lFcQkRUr4vfWo9iC9OnixCggFyEFo/1JLBZWsNvNDT3JRLWtWYmwv+h10URiXAD07WeCVBAekbFA88iIJ2Q9sQyJpqvzi1//Kzjw77PS0Tm5+cH/YGjsGOh/TEjQAGJWYOPyl3phaTUXTnqmJ60fmt+YdlGPqrJLSJWamaPk+tRbW365UWAAuJFhdv6IoCAKj2R9kMILXlFPaDCZ104MS/SFzyeRAIhJBApAQkh/8iZLD2RxGHV+ZhyDAEVQ1oyuX7yC3JqR4SWEBFMrkfIJbpCAj0RoID0hIkHXYTA/a3Ccwio+p25TK7n0BvBsNZsNv/CRcoL6rHp7M19+AO/IJJBtZN2kcCoCFBARkWW5Rq4M7cbjXWFAr0RGdWyUgnjnQi4SAi+CMJBFJXLs0u/LyJRg33ziysN2AqbVUokEjPwB34pH3XRVNvisaSXcSRAAYljq/vo81ZpbdndG9GrR/BFEPZbVEQYNiEMEAUkJQr68tJU8tdEJJKwz4KhknTb9TyEA35CNPXtzJNAlAlQQKLcugHyDYEVARbJbji3EHCRvEyUOG0iaHeISm7FyfSZdFFQeRGGNOpAXUhednhtg81Itm0fwheV4J/X8dxGAlEmQAEJRuvGyoqtUuExBFwkFYDthvFiA5FZkhcM0+j/n1d5Xtuk6uYfPkkmArGlbNOXsBlpq7w+41UGt5FAnAhQQOLU2gH2dau0+rbNjYKF4KwCds02Potg3ozqhtP/v2YBjoOybLtRm54wp1Ud+hJ1I+GTZCIQ8wHGRdNIIBAEKCCBaAYa4UVgp7z6HgRzBPVKsWD2nTZOhAllbZXXJm7fvn3kVR+3xZQA3e6bAAWkb3Q8kQRIgATiTYACEu/2p/ckQAIk0DcBCkjf6HjiCQH+TwIkEFcCFJC4tjz9JgESIIEBCVBABgTI00mABEhgXATGXS8FZNwtwPpJgARIIKQEKCAhbTiaTQIkQALjJkABGXcLsP7xEWDNJEACAxGggAyEjyeTAAmQQHwJUEDi2/b0nARIgAQGIjCAgAxUL08mARIgARIIOQEKSMgbkOaTAAmQwLgIUEDGRZ71ksAABHgqCQSBAAUkCK1AG0iABEgghAQoICFsNJpMAiRAAkEgEE8BCQJ52kACJEACISdAAQl5A9J8EiABEhgXAQrIuMizXhKIJwF6HSECFJAINSZdIQESIAE/CVBA/KTNukiABEggQgQoICFrTJpLAiRAAkEhQAEJSkvQDhIgARIIGQEKSMgajOaSAAmMiwDrdROggLiJcJ0ESIAESKAnAhSQnjDxIBIgARIgATcBCoibCNdHRYDlkgAJRIwABSRiDUp3SIAESMAvAt8BAAD//zE+NAAAAAAGSURBVAMAi7cHDuTSCQEAAAAASUVORK5CYII=",
    "techSigIn": "data:image/png;base64,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",
    "managerSig": "data:image/png;base64,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",
    "equipmentId": "g8"
  },
  {
    "id": "tx1784122301633",
    "dateOut": "2026-07-15 13:31:41",
    "dateIn": "2026-07-15 13:47:19",
    "managerDate": "2026-07-15 13:47:19",
    "tag": "66880366",
    "equipNo": "EQ-1030",
    "name": "Digital Clamp Meter",
    "cat": "instrument",
    "project": "test",
    "location": "test",
    "tech": "Engr. Larry Udoh",
    "status": "return",
    "techSigOut": "data:image/png;base64,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",
    "techSigIn": "data:image/png;base64,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",
    "managerSig": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAACWCAYAAADwkd5lAAAQAElEQVR4AeydbWhkWVrH77l1k+6dGWe6k1RVkkpS3eugC76Au8K6CrrDfhD0g4KDsvhFxEUQYf2ggsv6xRcWQUGU/SCIIIiIgwoLIoisI76w7IcRWRjE3ZlO5aUqlUq6MzuzvZNU1b0+T02f6pvqvFSqbt26597f7Zw+576d8zy/Jzn/POdWVXyPDQIpEVipbnyrul6P4qWythXGS3l1sy/X9ZYqtQdiFt+fAoEvCGSVAD+gWY1MjuxartTeU9EolUrPjbplRjZfNrmutBAE9+SevpRzghPfv0h4ZKxDGePDUviCAARmTAABmTHgIne/VK490gk/CILn4xwi7+m/+PGbtuPaI7rjq/DIWGUZ8y0p54RHxeaFpdof33SMmV5P5xBwnAAC4ngAs2i+CMdDncAXFoI7cfvCKAzbzYY5bO4Mi+5fUUq9fn+nL1soWxTb4v2O01axef528Fm1S8Xkbrn2H+PcxzUQgMDlBBCQy9lwZgICMjlHIhx347fKvD8Qjk5rtxQ/PkY7PG7v1Y/ae0HnYLd02NrxbblCdIyc+85er9cR3emL7oSj46iYLC4EP/JUTNbfHr2GfQhA4HoCDgvI9c5xRXoE9MG3TsgyOQ8HtcIhk/5NhWPYx4SNt48P9ytWeERQVFSMCorYFMX7FHvN4sLCfbVdxC+U7OlR/DxtCEDgcgIIyOVsODMmAZ149fmDvVwm6UHGMQfhsCZcWKugiE2+Ckq/H56Inc+IiWRPd6yYrFRr71/YEQchAIEBAQRkgIH/JiGwXN3Y1slWf4u39/e63T+RSTrtjMMOP3Z91N69K3YOxCTyzD9fJCalUnBL/VOBFDHpjt15AS7ERQgoAQREKVBuTEAn1aBUqtsbZQIeZB3HneZn7TFX6sPm9o9bMQlN8HviSxS3XQVSxCSwYlJe3ezFz9OGQFEJICBFjfwUfutEqpOq7eL09OxNmYAzn3VYe6+qO/tv/bb4MshMdKnrIjHxfb+kDEREo42NjQ9d1R/nIJBnAgjIPKLr6Jjl1a2v6cRpzdfJVSfZk+PW99hjeavjYjL6ii4RUa8blh4v1WobefMbfyAwDgEEZBxKXOPJsk3f9833WhT9fr+nk6vdL0KtLyVWwdQSF5OFKNi9u7z2n0VggI8QiBNAQOI0aF9IQJZqQl82ezLy/T88au8t2P0i1iom/X7/29b3xVuLP7yyunFq96kzSwDDEiSAgCQIM49dqXjIUo1R3+yS1eHeg9/Q/aIXEdHn+qH3Zcuh5JcWJVPjAbsFQp17AghI7kM8uYMyGfbj4lG0JatxyB0dND5V8rrDz/qSRK0kotsf516ugYDrBBAQ1yM4Q/tlMhx+f1jxmOFwznbdbDYfy3ORZeuAiK4vIvLMR6jY89QQyAuB4QSRF4fwIxkCmn3Ynnr98Cu2TX0pgYciIkaX+fQKERGDiCgJSp4JICB5ju4UvsWzj+P27iem6KpQt2qmFheRJy97frlQEHB2RgSy1y0Ckr2YzN2iePZx1u1uz90gxwx4IiLDJSwRka+/VLn3m465gbkQuJYAAnItouJdEM8+HnWa94tHYHqPRURKYRgOH6bfDqI/WCrX9qbvmR4gkB0CCEh2YpEJS5bK6y1rSK/bO7HtHNSpu9A52A36vd57duCFhaC2Ut3o2X1qCLhOAAFxPYIJ2x8EQdV2edzZP/eHoexx6vEJHB3uf8dpt/939g792Pv4EqE9Tg0BFwkgIC5GbYY266uHnnR/7hNpnxyjmoDASWfv1Xaz8TF7qy4R8gotS4PaZQJjC4jLTmL7zQnI+j0CcnNsV93xhojI4B39epEKNSKiJCguE0BAXI5ewrYvV2pt22Vkgl+2berkCKiIXPAy3+QGoCcIpEgAAUkRdtaHkvX5srXxqPXgz22bOlkCh60d34qI9nz9g3W9igKB7BFAQLIXk7lZpMsqOnh8ctN9SvIEVERsryLcufhjXNYf6uIQQECKE+uxPUVAxkY11YXCefhmw6VqnYxvKprcPA8CRRCQeXB1bsylysbb1uju++/+mm1Tz46AZCHDzCPwo1+c3Uj0DIHZEEBAZsPVuV6Dkn/PGn1ycvKntk09WwKShQxe7fZk+XBptqPROwSSJeAn2x29uUrgyQTm2QnNVT9cs1uykO+yNlfWto5sOzc1juSaAAKS6/De3DkE5ObMprzjG5a5FfEp++N2CKRGAAFJDXV2B1qubr5preuf3eLjSyyMlGpZw+Izx1JizTDJEkBAkuWZcG/pdFfyzUfsSA8ffuObtk2dDgHjeXc8Ngg4SAABcTBomAwBCEAgCwQQkCxEYc422LV3uxY/Z3MKNzz8sxlyrLqeAAJyPaPCXIGAzDfU8J8vf0a/OQEE5ObMcnXHcnXrv6xD7zxsf59tU6dDYKW6OXyAfvKt/mfSGZVRIJAMAQQkGY7O9lLyvR+yxp+dnQ1fjWWPTVxz41gEfN+8aC/svtv8C9umhoALBBAQF6KEjbklYJ9/5NZBHMs1AQQk1+G93jk7gbH+fj2rWV4B/1nSLVzfqTmMgKSGOtsDMYHNPT7R3C3AAAjckAACckNgubp8/WMrQ3/67780bNNIhUB1vT4UDXkW8u+pDMogEEiQAAKSIEzXulrpH37N2tzpdN6z7aLXKfj/o3Hx0OzvYL/xyRTGZQgIJEoAAUkUp1udGeOV3bI4F9aqePyb9UTF47C1w8+hBULtFAG+cZ0KV7LGGmOIf7JIr+sN8biOEOedIpD8BOKU+xgLgfQIyLIVmUd6uBkpBQIISAqQGaLYBFaqGz0Rj+EDc5ativ39kCfvEZA8RfOGvsgSltFbdELTmpI8gcraVliSzfasrGf4zMMOQw2BVAggIKlgZpCiEViq1I4067Airf73+mdfRTyUBCUvBBCQvEQSPzJDQLOOhSBYtgZp1tFuNsxxu/Vxe4waAnkggIDEoljUpk5wRfU9Sb+XqxvHIh5RPOsIw7BH1pEkZfrKEgEEJEvRmJMt8nS3N6ehczGsFY6gVFoS8Rj6pFlH52B3YXiABgRyRgAByVlAJ3HHeP7/emw3JnCZcGhGp+Jx4w4LfQPOu0gAAXExagnbfNoNv5Rwl7nurry6+ViXqkYzDiscLFnlOvw4FyOAgMRgFLV5a8H7raL6fhO/RTRCfWWV7/sfii9VIRw3oci1eSKAgOQjmlN5IZMh3weXECyvbT20wiGcBu+bsZciHJYEdVEJMHEUNfLit06AUnmjE6MeK3JZqW50rWj4xtw1slkeyqzfD7v6jIOlKkuFuqgEEJCiRh6/4wSWrWDoElWpVApEMy7KNr5bReOovbsYv5l2wQkU2H0EpMDBl9+mv11U95crtWGWIaJxNCoYykX4RKFssWzj//Q4BQIQ+IAAAvIBh0L+fyuIhn+RsLy61c47hHiWEch2mWh0u71HVjQ6B7ulvHPBPwhMSgABmZRcDu7b29sbZiBmbn9cajYglyq1UxUMKZFkGINiZBsdLZ5lWNF42NlfGr2OfQhA4FkCCMizTAp1RCdQdVjm1nNr/nrMlXKRWCwEwaL6JOUZN9Tn07OzB1YwyDKeQcQBCIxFAAEZC1N+LwoXTc16V17dPLTttGqbHUxTLwSXi4X6oYIhjzJCFQwt+iD85Kj1YT1HgUCRCUzrOwIyLUHH7z9qNFrWBfltffhMxB6bZS3LS2HS/cfEIlCx0KKCQZaRNGn6g4DnISB8F3g66SoGERCjdVolPl4oRkxUJLVQkbAlJhb9tPxgHAgUlQACUtTIx/wueeYH7e4ssgLbd7yW5bLhBC8a0O+0dvyJyjxfJRV3iDYECkgAASlg0EddbrUab8gkPlhO0qwgDRHxZbN2yPJSYNvUEICAOwQQEHdiNVNLZRIvySpSpIOoiEiG0NX2LMpyZeMd268d0+5TQwAC7hCYo4C4A6kolurzAzuhS4IQiIh0ZuF7EJRetP3qmLZNDQEIuEUAAXErXjO3Nj6hi4isVNbv/0uygy5+xPZnxcruU0MAAm4RQEDcilcq1rY7zY/bgYwXfmrxxc1P2/1p68ra6pu2DxGrVF82bMel9jwYQCAJAghIEhTz1ke3+9UwMn9v3br7gv/X0k7k4z30+Yr0ZV86/FDbFAhAwE0CCIibcZu51Z3W9s+EYTR8k2F1vX487aDxV3cdH+7/5LT9cT8EIDBfAgjIJPwLck/nYGddRGT4aiwRkaiyVp/4405s9qH4+v3+P2lNgQAE3CWAgLgbu1QsFxFZlIfdp3YwY7xyZW1r8J4Re2ycury2ObxHxGPY3zj3cg0EIJBNAghINuOSKasOWzu3Swv+H1mjjGyajSzeuffT9th1tW/84cekHLX3bl93vQvnV9frv1Ot1V+/sqzXt4XVnojua+Xa1qsu+JVxGzEvQwQQkAwFI8umNBsPfl0/b0qykcGbDdXWu89F/1AZY0mrvLo5/LsjoWx6bx6KgPglL/J+zLuqeF5dfK2J5r7qR+Y1EZNQyomU7epa/ctra/XP379/vyrX8AUB5wggIM6FbL4GSzbii4icWSvMGEtavu8PM45Ojj67KuyajxrfvHJlMdHPeZ75kud5+hcfRXM8zcRekv26tF4Jjfe7j0/DAxGUwR+90lrO8QUBJwggIE6EKTkjk+hJROSWTH6v2b6MbDrxVeTZiCzn/KM9rvVS9d6faa1FhEcnUG3monQ62wcHe9uvX1n2d/623dz+qXazsSrFN6H3q17kvS4qsud5nj4LyhUT8YmvAhFAQAoU7CRdbe83flYmRBMXBdERI5PjT1gxKa9t7QZ++Bk7rghP4b/fDg4aX2y3Gq8cNBubwu+2FF+KEUH+fcuJGgKuECj8D7QrgcqqnSoKIiL6m/Q5E1VMfGM2tNYTcg2/aSuIS4oI8ucvOcXh3BDInyMISP5imrpHIiL6m7TR36SjMHp8kViokGhmokUequvfAvn+1A1lQAhAIFECCEiiOIvXmQpCvBjfPKdicRUJeajuyz3/IyXS5yZ3V1/+lauu5xwEIJBNAghINuOSK6u63V7LK5kvXJaZLPrdL1oxGX0IHwOR66b6n2sHcS6XBBCQXIY1Paf6/bAbijJcXsLoYWd/vb27/TlZ6ho8MB4sdck9o1YOMpfIGz6Er6zVG6PX5HE/Lh7GeHzAZB6DnFOfEJCcBjYtt47au4ud1o5/edm98HssJibn3ldi7TaDzdvSybWythVKed+ec72urtX/Vf2yxfoTed47B/uNZbtPDYHMELjEkAt/uC+5lsMQmAWBSMTklmYlWiST2ZPkRObSp0MNtMSYW3bCLYugyNkXpDj1VVnfHCzVecb7pDeyRZH3zcNm487IYXYhkGkCCEimw1M84yST2RRBGSx1yUT7N6NiokR8UZTqev1dKU48hJfsST++JDKef+7FAuJbX5Ty1Hjefx+2GvrudI8NAi4RQEBcilbBbG3vNz5txaTkdZ+XCVfm2/MQREvM8CH8FVMYCwAABBBJREFU+lZUiRfJVHTyjhfJXvqyfyr1o8p6/esiQn91vsdk9lZr9TcqYov0HxljRCOe9qvZhmZb4lsgWcftg2bjo0/P0oKAOwQQEHdiVWhLm83mY5lwB5mJTr5hGOp7Sc4xMZKynCvm2U2yF/kSzTHmjvG8l6WDn9dJPukiIvEDRuyR/odfon7vqO1kG0MkNBwngIA4HsCimt852A10MtYiz00eaXYyWrLARm0yi8EvqJ2SbfCMIwtBwYbECLggIIk5S0f5JNBp7SxpdjJadNIet3hB6XOeMV+RzOFAJv3HkuH0RJj6kxbJNt7SsdWmg+23/jKf5PGq6AQQkKJ/B+D/gEB75+0vtPe3P3HYaqzJpP+8ZDgLndZOMGmRbEOXxwZ98x8E8koAAclrZPELAkkQoA8IXEEAAbkCDqcgAAEIQOByAgjI5Ww4AwEIQAACVxBAQK6AM/0peoAABCCQXwIISH5ji2cQgAAEZkoAAZkpXjqHAATmRYBxZ08AAZk9Y0aAAAQgkEsCCEguw4pTEIAABGZPAAGZPWM3R8BqCEAAAtcQQECuAcRpCEAAAhC4mAACcjEXjkIAAhCYFwFnxkVAnAkVhkIAAhDIFgEEJFvxwBoIQAACzhBAQJwJFYaOS4DrIACBdAggIOlwZhQIQAACuSOAgOQupDgEAQhAIB0CzwpIOuMyCgQgAAEIOE4AAXE8gJgPAQhAYF4EEJB5kWdcCDxLgCMQcIoAAuJUuDAWAhCAQHYIICDZiQWWQAACEHCKQK4ExCnyGAsBCEDAcQIIiOMBxHwIQAAC8yKAgMyLPONCIFcEcKaIBBCQIkYdnyEAAQgkQAABSQAiXUAAAhAoIgEEJBtRxwoIQAACzhFAQJwLGQZDAAIQyAYBBCQbccAKCEBgXgQYd2ICCMjE6LgRAhCAQLEJICDFjj/eQwACEJiYAAIyMTpu/IAA/0MAAkUlgIAUNfL4DQEIQGBKAgjIlAC5HQIQgMC8CMx7XARk3hFgfAhAAAKOEkBAHA0cZkMAAhCYNwEEZN4RYPz5EWBkCEBgKgIIyFT4uBkCEIBAcQkgIMWNPZ5DAAIQmIrAFAIy1bjcDAEIQAACjhNAQBwPIOZDAAIQmBcBBGRe5BkXAlMQ4FYIZIEAApKFKGADBCAAAQcJICAOBg2TIQABCGSBQDEFJAvksQECEICA4wQQEMcDiPkQgAAE5kUAAZkXecaFQDEJ4HWOCCAgOQomrkAAAhBIkwACkiZtxoIABCCQIwIIiGPBxFwIQAACWSGAgGQlEtgBAQhAwDECCIhjAcNcCEBgXgQYd5QAAjJKhH0IQAACEBiLAAIyFiYuggAEIACBUQIIyCgR9mdFgH4hAIGcEUBAchZQ3IEABCCQFoH/BwAA///lwPldAAAABklEQVQDAAlE1JZAwTeSAAAAAElFTkSuQmCC",
    "equipmentId": "i6"
  },
  {
    "id": "tx1",
    "equipNo": "EQ-1072",
    "dateOut": "2026-07-10 12:45:00",
    "dateIn": "2026-07-12 14:20:00",
    "managerDate": "2026-07-12 14:35:00",
    "tag": "WEL/RL/002",
    "name": "20FT Cargo Container",
    "cat": "ccu",
    "project": "NLNG Contract",
    "location": "Nembe",
    "tech": "Tari Sokari",
    "status": "return",
    "techSigOut": "signed",
    "techSigIn": "signed",
    "managerSig": "signed"
  },
  {
    "id": "tx2",
    "equipNo": "EQ-1073",
    "dateOut": "2026-06-11 09:20:00",
    "dateIn": null,
    "managerDate": null,
    "tag": "—",
    "name": "4M Aluminium Ladder",
    "cat": "scaffold",
    "project": "Offshore Maintenance",
    "location": "Rig Alpha",
    "tech": "Katie Bassey",
    "status": "out",
    "techSigOut": "signed",
    "techSigIn": null,
    "managerSig": null
  },
  {
    "id": "tx3",
    "equipNo": "EQ-1074",
    "dateOut": "2026-06-06 15:40:00",
    "dateIn": null,
    "managerDate": null,
    "tag": "—",
    "name": "Ring Spanner 55\"",
    "cat": "general",
    "project": "Pipeline Repair",
    "location": "Aveon",
    "tech": "Josiah Eze",
    "status": "out",
    "techSigOut": "signed",
    "techSigIn": null,
    "managerSig": null
  },
  {
    "id": "tx4",
    "equipNo": "EQ-1075",
    "dateOut": "2026-04-18 11:05:00",
    "dateIn": null,
    "managerDate": null,
    "tag": "58678",
    "name": "Vernier Caliper",
    "cat": "instrument",
    "project": "Calibration Check",
    "location": "Onshore",
    "tech": "Ken Larry",
    "status": "out",
    "techSigOut": "signed",
    "techSigIn": null,
    "managerSig": null
  },
  {
    "id": "tx5",
    "equipNo": "EQ-1076",
    "dateOut": "2026-04-01 08:00:00",
    "dateIn": "2026-04-04 14:22:00",
    "managerDate": "2026-04-04 15:00:00",
    "tag": "66880366",
    "name": "Digital Clamp Meter",
    "cat": "instrument",
    "project": "Electrical Testing",
    "location": "Offshore",
    "tech": "Gabby Nwosu",
    "status": "in",
    "techSigOut": "signed",
    "techSigIn": "signed",
    "managerSig": "signed"
  }
];
