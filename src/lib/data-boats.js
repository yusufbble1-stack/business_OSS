// ===== Boat / Marine Performance Database =====
export const boatData = {
  Mercury: {
    'Verado': {
      '2018+': {
        '2.6L V6 300hp': { fuel:'Gasoline', cc:2598, code:'V6 Verado', ecu:'PCM', hp:300, nm:380, hp1:335, nm1:420 },
        '2.6L V6 350hp': { fuel:'Gasoline', cc:2598, code:'V6 Verado', ecu:'PCM', hp:350, nm:420, hp1:388, nm1:462 },
        '2.6L V6 400hp': { fuel:'Gasoline', cc:2598, code:'V6 Verado', ecu:'PCM', hp:400, nm:455, hp1:440, nm1:498 },
      }
    },
    'FourStroke': {
      '2019+': {
        '3.4L V6 175hp': { fuel:'Gasoline', cc:3400, code:'V6', ecu:'PCM', hp:175, nm:225, hp1:198, nm1:252 },
        '3.4L V6 200hp': { fuel:'Gasoline', cc:3400, code:'V6', ecu:'PCM', hp:200, nm:255, hp1:225, nm1:284 },
        '4.6L V8 250hp': { fuel:'Gasoline', cc:4600, code:'V8', ecu:'PCM', hp:250, nm:320, hp1:280, nm1:355 },
        '4.6L V8 300hp': { fuel:'Gasoline', cc:4600, code:'V8', ecu:'PCM', hp:300, nm:370, hp1:335, nm1:408 },
      }
    }
  },
  Volvo_Penta: {
    'D4': {
      '2015+': {
        '3.7L D4-260': { fuel:'Diesel', cc:3700, code:'D4', ecu:'EMS2', hp:260, nm:600, hp1:300, nm1:690 },
        '3.7L D4-300': { fuel:'Diesel', cc:3700, code:'D4', ecu:'EMS2', hp:300, nm:650, hp1:340, nm1:740 },
      }
    },
    'D6': {
      '2015+': {
        '5.5L D6-370': { fuel:'Diesel', cc:5500, code:'D6', ecu:'EMS2', hp:370, nm:800, hp1:420, nm1:900 },
        '5.5L D6-440': { fuel:'Diesel', cc:5500, code:'D6', ecu:'EMS2', hp:440, nm:900, hp1:495, nm1:1010 },
      }
    },
    'D11': {
      '2013+': {
        '10.8L D11-670': { fuel:'Diesel', cc:10800, code:'D11', ecu:'EMS2', hp:670, nm:1950, hp1:740, nm1:2150 },
        '10.8L D11-725': { fuel:'Diesel', cc:10800, code:'D11', ecu:'EMS2', hp:725, nm:2100, hp1:795, nm1:2310 },
      }
    }
  },
  Yamaha_Marine: {
    'F Series': {
      '2020+': {
        '1.8L F115 115hp': { fuel:'Gasoline', cc:1832, code:'F115', ecu:'Yamaha ECM', hp:115, nm:145, hp1:130, nm1:162 },
        '2.8L F200 200hp': { fuel:'Gasoline', cc:2785, code:'F200', ecu:'Yamaha ECM', hp:200, nm:255, hp1:222, nm1:280 },
        '4.2L V6 F300 300hp': { fuel:'Gasoline', cc:4169, code:'F300', ecu:'Yamaha ECM', hp:300, nm:375, hp1:330, nm1:410 },
      }
    }
  },
  Cummins_Marine: {
    'QSB 6.7': {
      '2015+': {
        '6.7L QSB 380hp': { fuel:'Diesel', cc:6700, code:'QSB6.7', ecu:'CM2350', hp:380, nm:1100, hp1:430, nm1:1240 },
        '6.7L QSB 480hp': { fuel:'Diesel', cc:6700, code:'QSB6.7', ecu:'CM2350', hp:480, nm:1350, hp1:535, nm1:1500 },
      }
    },
    'QSM 11': {
      '2013+': {
        '10.8L QSM 600hp': { fuel:'Diesel', cc:10800, code:'QSM11', ecu:'CM870', hp:600, nm:1950, hp1:665, nm1:2150 },
        '10.8L QSM 715hp': { fuel:'Diesel', cc:10800, code:'QSM11', ecu:'CM870', hp:715, nm:2250, hp1:790, nm1:2480 },
      }
    }
  },
  Caterpillar_Marine: {
    'C7.1': {
      '2016+': {
        '7.1L C7.1 400hp': { fuel:'Diesel', cc:7100, code:'C7.1', ecu:'ADEM A5', hp:400, nm:1300, hp1:450, nm1:1460 },
        '7.1L C7.1 500hp': { fuel:'Diesel', cc:7100, code:'C7.1', ecu:'ADEM A5', hp:500, nm:1550, hp1:555, nm1:1720 },
      }
    },
    'C12.9': {
      '2016+': {
        '12.9L C12.9 770hp': { fuel:'Diesel', cc:12900, code:'C12.9', ecu:'ADEM A5', hp:770, nm:2800, hp1:845, nm1:3070 },
        '12.9L C12.9 1000hp': { fuel:'Diesel', cc:12900, code:'C12.9', ecu:'ADEM A5', hp:1000, nm:3500, hp1:1090, nm1:3830 },
      }
    }
  },
  Sea_Ray: {
    'Sundancer': {
      '2016+': {
        '4.5L MerCruiser 250hp': { fuel:'Gasoline', cc:4500, code:'LV RWC', ecu:'MerCruiser PCM09', hp:250, nm:340, hp1:280, nm1:390 },
        '6.2L V8 MerCruiser 300hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:300, nm:400, hp1:335, nm1:450 },
        '6.2L V8 MerCruiser 350hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:350, nm:450, hp1:385, nm1:510 }
      }
    },
    'SPX Series': {
      '2018+': {
        '3.0L MerCruiser 135hp': { fuel:'Gasoline', cc:3000, code:'3.0 TKS', ecu:'MerCruiser MEFI4', hp:135, nm:185, hp1:155, nm1:220 },
        '4.5L MerCruiser 200hp': { fuel:'Gasoline', cc:4500, code:'LV RWC', ecu:'MerCruiser PCM09', hp:200, nm:270, hp1:230, nm1:310 }
      }
    }
  },
  Bayliner: {
    'Ciera': {
      '2015+': {
        '6.2L V8 MerCruiser 300hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:300, nm:400, hp1:335, nm1:450 }
      }
    },
    'VR Series': {
      '2018+': {
        '4.5L MerCruiser 200hp': { fuel:'Gasoline', cc:4500, code:'LV RWC', ecu:'MerCruiser PCM09', hp:200, nm:270, hp1:230, nm1:310 },
        '4.5L MerCruiser 250hp': { fuel:'Gasoline', cc:4500, code:'LV RWC', ecu:'MerCruiser PCM09', hp:250, nm:340, hp1:280, nm1:390 }
      }
    }
  },
  Chaparral: {
    'SSX Series': {
      '2017+': {
        '6.2L V8 MerCruiser 300hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:300, nm:400, hp1:335, nm1:450 },
        '6.2L V8 MerCruiser 350hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:350, nm:450, hp1:385, nm1:510 }
      }
    },
    'OSX Series': {
      '2019+': {
        '4.2L V6 F300 Yamaha 300hp': { fuel:'Gasoline', cc:4169, code:'F300', ecu:'Yamaha ECM', hp:300, nm:375, hp1:330, nm1:410 }
      }
    }
  },
  Regal: {
    'LS Series': {
      '2018+': {
        '4.5L MerCruiser 250hp': { fuel:'Gasoline', cc:4500, code:'LV RWC', ecu:'MerCruiser PCM09', hp:250, nm:340, hp1:280, nm1:390 },
        '6.2L V8 MerCruiser 300hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:300, nm:400, hp1:335, nm1:450 }
      }
    },
    'Cruiser': {
      '2016+': {
        'Volvo Penta D4-300': { fuel:'Diesel', cc:3700, code:'D4', ecu:'EMS2', hp:300, nm:650, hp1:340, nm1:740 },
        'Volvo Penta D6-440': { fuel:'Diesel', cc:5500, code:'D6', ecu:'EMS2', hp:440, nm:900, hp1:495, nm1:1010 }
      }
    }
  },
  Four_Winns: {
    'Horizon': {
      '2016+': {
        '4.5L MerCruiser 250hp': { fuel:'Gasoline', cc:4500, code:'LV RWC', ecu:'MerCruiser PCM09', hp:250, nm:340, hp1:280, nm1:390 }
      }
    },
    'Vista': {
      '2015+': {
        'Volvo Penta D6-370': { fuel:'Diesel', cc:5500, code:'D6', ecu:'EMS2', hp:370, nm:800, hp1:420, nm1:900 }
      }
    }
  },
  Cobalt: {
    'R Series': {
      '2017+': {
        '6.2L V8 MerCruiser 300hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:300, nm:400, hp1:335, nm1:450 },
        '6.2L V8 MerCruiser 350hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:350, nm:450, hp1:385, nm1:510 },
        'Volvo Penta D6-440': { fuel:'Diesel', cc:5500, code:'D6', ecu:'EMS2', hp:440, nm:900, hp1:495, nm1:1010 }
      }
    }
  },
  Monterey: {
    'Super Sport': {
      '2017+': {
        '4.5L MerCruiser 250hp': { fuel:'Gasoline', cc:4500, code:'LV RWC', ecu:'MerCruiser PCM09', hp:250, nm:340, hp1:280, nm1:390 },
        '6.2L V8 MerCruiser 350hp': { fuel:'Gasoline', cc:6200, code:'V8 ECT', ecu:'MerCruiser PCM09', hp:350, nm:450, hp1:385, nm1:510 }
      }
    }
  },
  Lund: {
    'Pro V': {
      '2018+': {
        '200hp Mercury FourStroke': { fuel:'Gasoline', cc:3400, code:'V6 FourStroke', ecu:'PCM', hp:200, nm:255, hp1:225, nm1:284 },
        '300hp Mercury Verado': { fuel:'Gasoline', cc:4600, code:'V8 Verado', ecu:'PCM', hp:300, nm:380, hp1:335, nm1:420 }
      }
    }
  },
  Tracker: {
    'Pro Team': {
      '2019+': {
        '115hp Mercury FourStroke': { fuel:'Gasoline', cc:2100, code:'FourStroke', ecu:'PCM', hp:115, nm:145, hp1:130, nm1:162 },
        '150hp Mercury FourStroke': { fuel:'Gasoline', cc:3000, code:'FourStroke', ecu:'PCM', hp:150, nm:195, hp1:175, nm1:220 }
      }
    }
  }
};
