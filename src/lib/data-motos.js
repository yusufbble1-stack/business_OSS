// ===== Motorcycle Performance Database =====
export const motoData = {
  Yamaha: {
    'MT-07': {
      '2021+': {
        '689cc CP2 73hp': { fuel:'Gasoline', cc:689, code:'CP2', ecu:'Denso', hp:73, nm:67, hp1:82, nm1:74 },
      }
    },
    'MT-09': {
      '2021+': {
        '890cc CP3 119hp': { fuel:'Gasoline', cc:890, code:'CP3', ecu:'Denso', hp:119, nm:93, hp1:132, nm1:102 },
      }
    },
    'R1': {
      '2020+': {
        '998cc CP4 200hp': { fuel:'Gasoline', cc:998, code:'CP4', ecu:'Denso', hp:200, nm:113, hp1:218, nm1:121 },
      }
    },
    'TMAX 560': {
      '2020+': {
        '562cc 46hp': { fuel:'Gasoline', cc:562, code:'TMAX', ecu:'Denso', hp:46, nm:56, hp1:52, nm1:62 },
      }
    },
    'Tracer 9': {
      '2021+': {
        '890cc CP3 119hp': { fuel:'Gasoline', cc:890, code:'CP3', ecu:'Denso', hp:119, nm:93, hp1:132, nm1:102 },
      }
    }
  },
  Kawasaki: {
    'Z900': {
      '2020+': {
        '948cc 125hp': { fuel:'Gasoline', cc:948, code:'ZR900E', ecu:'Denso', hp:125, nm:99, hp1:138, nm1:108 },
      }
    },
    'Ninja ZX-10R': {
      '2021+': {
        '998cc 203hp': { fuel:'Gasoline', cc:998, code:'ZX1002', ecu:'Denso', hp:203, nm:115, hp1:220, nm1:123 },
      }
    },
    'Z650': {
      '2020+': {
        '649cc 68hp': { fuel:'Gasoline', cc:649, code:'ER650', ecu:'Denso', hp:68, nm:64, hp1:76, nm1:70 },
      }
    },
    'Versys 1000': {
      '2019+': {
        '1043cc 120hp': { fuel:'Gasoline', cc:1043, code:'ZGT00A', ecu:'Denso', hp:120, nm:102, hp1:133, nm1:112 },
      }
    }
  },
  Honda: {
    'CBR1000RR-R': {
      '2020+': {
        '1000cc 217hp': { fuel:'Gasoline', cc:999, code:'SC82E', ecu:'Keihin', hp:217, nm:113, hp1:235, nm1:121 },
      }
    },
    'CB650R': {
      '2021+': {
        '649cc 95hp': { fuel:'Gasoline', cc:649, code:'RH03E', ecu:'Keihin', hp:95, nm:64, hp1:105, nm1:70 },
      }
    },
    'Africa Twin 1100': {
      '2020+': {
        '1084cc 102hp': { fuel:'Gasoline', cc:1084, code:'SD09E', ecu:'Keihin', hp:102, nm:105, hp1:115, nm1:116 },
      }
    },
    'X-ADV 750': {
      '2021+': {
        '745cc 58hp': { fuel:'Gasoline', cc:745, code:'RC95E', ecu:'Keihin', hp:58, nm:69, hp1:66, nm1:76 },
      }
    }
  },
  BMW: {
    'S1000RR': {
      '2019+': {
        '999cc 207hp': { fuel:'Gasoline', cc:999, code:'S1000RR', ecu:'BMS-X', hp:207, nm:113, hp1:225, nm1:121 },
      }
    },
    'R1250GS': {
      '2019+': {
        '1254cc 136hp': { fuel:'Gasoline', cc:1254, code:'ShiftCam', ecu:'BMS-X', hp:136, nm:143, hp1:150, nm1:156 },
      }
    },
    'F900R': {
      '2020+': {
        '895cc 105hp': { fuel:'Gasoline', cc:895, code:'F900R', ecu:'BMS-K', hp:105, nm:92, hp1:118, nm1:101 },
      }
    },
    'R1250RT': {
      '2019+': {
        '1254cc 136hp': { fuel:'Gasoline', cc:1254, code:'ShiftCam', ecu:'BMS-X', hp:136, nm:143, hp1:150, nm1:156 },
      }
    }
  },
  Ducati: {
    'Panigale V4': {
      '2022+': {
        '1103cc 215hp': { fuel:'Gasoline', cc:1103, code:'V4', ecu:'Bosch ME17', hp:215, nm:124, hp1:232, nm1:133 },
      }
    },
    'Monster 937': {
      '2021+': {
        '937cc 111hp': { fuel:'Gasoline', cc:937, code:'Testastretta L2', ecu:'Bosch ME17', hp:111, nm:93, hp1:124, nm1:102 },
      }
    },
    'Multistrada V4': {
      '2021+': {
        '1158cc 170hp': { fuel:'Gasoline', cc:1158, code:'V4 Granturismo', ecu:'Bosch ME17', hp:170, nm:125, hp1:188, nm1:137 },
      }
    }
  },
  KTM: {
    '1290 Super Duke R': {
      '2020+': {
        '1301cc 180hp': { fuel:'Gasoline', cc:1301, code:'LC8', ecu:'Bosch ME17', hp:180, nm:140, hp1:198, nm1:153 },
      }
    },
    '890 Duke R': {
      '2020+': {
        '889cc 121hp': { fuel:'Gasoline', cc:889, code:'LC8c', ecu:'Bosch ME17', hp:121, nm:99, hp1:135, nm1:109 },
      }
    },
    '390 Duke': {
      '2017+': {
        '373cc 44hp': { fuel:'Gasoline', cc:373, code:'LC4c', ecu:'Bosch ME17', hp:44, nm:37, hp1:50, nm1:42 },
      }
    }
  },
  'Harley-Davidson': {
    'Street Glide': {
      '2017+': {
        '1868cc Milwaukee-Eight 93hp': { fuel:'Gasoline', cc:1868, code:'M8-114', ecu:'Delphi', hp:93, nm:160, hp1:108, nm1:180 },
      }
    },
    'Road King': {
      '2017+': {
        '1746cc Milwaukee-Eight 86hp': { fuel:'Gasoline', cc:1746, code:'M8-107', ecu:'Delphi', hp:86, nm:150, hp1:100, nm1:168 },
      }
    },
    'Fat Bob': {
      '2018+': {
        '1868cc Milwaukee-Eight 93hp': { fuel:'Gasoline', cc:1868, code:'M8-114', ecu:'Delphi', hp:93, nm:155, hp1:108, nm1:175 },
      }
    }
  }
};
