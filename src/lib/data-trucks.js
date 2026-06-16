// ===== Truck Performance Database =====
export const truckData = {
  Mercedes: {
    Actros: {
      'MP4 - 2011+': {
        '10.7L OM470 428hp': { fuel:'Diesel', cc:10677, code:'OM470', ecu:'MCM2.1', hp:428, nm:2100, hp1:480, nm1:2350 },
        '12.8L OM471 449hp': { fuel:'Diesel', cc:12809, code:'OM471', ecu:'MCM2.1', hp:449, nm:2200, hp1:500, nm1:2450 },
        '12.8L OM471 510hp': { fuel:'Diesel', cc:12809, code:'OM471', ecu:'MCM2.1', hp:510, nm:2500, hp1:560, nm1:2750 },
        '15.6L OM473 625hp': { fuel:'Diesel', cc:15600, code:'OM473', ecu:'MCM2.1', hp:625, nm:3000, hp1:680, nm1:3250 },
      }
    },
    Atego: {
      'MK3 - 2013+': {
        '4.8L OM934 156hp': { fuel:'Diesel', cc:4801, code:'OM934', ecu:'MCM2.1', hp:156, nm:650, hp1:185, nm1:750 },
        '4.8L OM934 177hp': { fuel:'Diesel', cc:4801, code:'OM934', ecu:'MCM2.1', hp:177, nm:750, hp1:210, nm1:860 },
        '7.7L OM936 238hp': { fuel:'Diesel', cc:7698, code:'OM936', ecu:'MCM2.1', hp:238, nm:1000, hp1:275, nm1:1150 },
        '7.7L OM936 299hp': { fuel:'Diesel', cc:7698, code:'OM936', ecu:'MCM2.1', hp:299, nm:1200, hp1:340, nm1:1380 },
      }
    },
    Arocs: {
      '2013+': {
        '10.7L OM470 394hp': { fuel:'Diesel', cc:10677, code:'OM470', ecu:'MCM2.1', hp:394, nm:1900, hp1:445, nm1:2150 },
        '12.8L OM471 510hp': { fuel:'Diesel', cc:12809, code:'OM471', ecu:'MCM2.1', hp:510, nm:2500, hp1:560, nm1:2750 },
      }
    }
  },
  MAN: {
    TGX: {
      '2020+': {
        '12.4L D2676 470hp': { fuel:'Diesel', cc:12419, code:'D2676', ecu:'EDC7', hp:470, nm:2300, hp1:520, nm1:2550 },
        '12.4L D2676 510hp': { fuel:'Diesel', cc:12419, code:'D2676', ecu:'EDC7', hp:510, nm:2500, hp1:565, nm1:2750 },
        '15.2L D3876 640hp': { fuel:'Diesel', cc:15260, code:'D3876', ecu:'EDC7', hp:640, nm:3000, hp1:700, nm1:3280 },
      }
    },
    TGS: {
      '2020+': {
        '9.0L D2066 360hp': { fuel:'Diesel', cc:9000, code:'D2066', ecu:'EDC7', hp:360, nm:1800, hp1:405, nm1:2020 },
        '12.4L D2676 470hp': { fuel:'Diesel', cc:12419, code:'D2676', ecu:'EDC7', hp:470, nm:2300, hp1:520, nm1:2550 },
      }
    },
    TGL: {
      '2013+': {
        '4.6L D0834 180hp': { fuel:'Diesel', cc:4580, code:'D0834', ecu:'EDC7', hp:180, nm:750, hp1:210, nm1:860 },
        '4.6L D0834 220hp': { fuel:'Diesel', cc:4580, code:'D0834', ecu:'EDC7', hp:220, nm:850, hp1:255, nm1:970 },
      }
    }
  },
  DAF: {
    XF: {
      '2017+': {
        '10.8L MX-11 450hp': { fuel:'Diesel', cc:10800, code:'MX-11', ecu:'Bosch EDC7', hp:450, nm:2200, hp1:500, nm1:2440 },
        '12.9L MX-13 480hp': { fuel:'Diesel', cc:12900, code:'MX-13', ecu:'Bosch EDC7', hp:480, nm:2350, hp1:535, nm1:2600 },
        '12.9L MX-13 530hp': { fuel:'Diesel', cc:12900, code:'MX-13', ecu:'Bosch EDC7', hp:530, nm:2600, hp1:585, nm1:2860 },
      }
    },
    CF: {
      '2017+': {
        '6.7L PX-7 250hp': { fuel:'Diesel', cc:6700, code:'PX-7', ecu:'Bosch EDC7', hp:250, nm:1050, hp1:285, nm1:1200 },
        '10.8L MX-11 370hp': { fuel:'Diesel', cc:10800, code:'MX-11', ecu:'Bosch EDC7', hp:370, nm:1800, hp1:415, nm1:2020 },
        '10.8L MX-11 450hp': { fuel:'Diesel', cc:10800, code:'MX-11', ecu:'Bosch EDC7', hp:450, nm:2200, hp1:500, nm1:2440 },
      }
    }
  },
  Volvo: {
    FH: {
      '2012+': {
        '12.8L D13K 460hp': { fuel:'Diesel', cc:12800, code:'D13K', ecu:'EMS3', hp:460, nm:2300, hp1:510, nm1:2550 },
        '12.8L D13K 500hp': { fuel:'Diesel', cc:12800, code:'D13K', ecu:'EMS3', hp:500, nm:2500, hp1:555, nm1:2760 },
        '12.8L D13K 540hp': { fuel:'Diesel', cc:12800, code:'D13K', ecu:'EMS3', hp:540, nm:2600, hp1:595, nm1:2870 },
      }
    },
    FM: {
      '2013+': {
        '10.8L D11K 410hp': { fuel:'Diesel', cc:10800, code:'D11K', ecu:'EMS3', hp:410, nm:2100, hp1:460, nm1:2340 },
        '10.8L D11K 450hp': { fuel:'Diesel', cc:10800, code:'D11K', ecu:'EMS3', hp:450, nm:2200, hp1:500, nm1:2440 },
      }
    }
  },
  Scania: {
    'R Series': {
      '2016+': {
        '12.7L DC13 410hp': { fuel:'Diesel', cc:12740, code:'DC13', ecu:'EMS S8', hp:410, nm:2150, hp1:460, nm1:2400 },
        '12.7L DC13 450hp': { fuel:'Diesel', cc:12740, code:'DC13', ecu:'EMS S8', hp:450, nm:2350, hp1:500, nm1:2600 },
        '12.7L DC13 500hp': { fuel:'Diesel', cc:12740, code:'DC13', ecu:'EMS S8', hp:500, nm:2550, hp1:555, nm1:2810 },
        '16.4L DC16 580hp': { fuel:'Diesel', cc:16353, code:'DC16', ecu:'EMS S8', hp:580, nm:2950, hp1:640, nm1:3220 },
      }
    },
    'S Series': {
      '2016+': {
        '12.7L DC13 500hp': { fuel:'Diesel', cc:12740, code:'DC13', ecu:'EMS S8', hp:500, nm:2550, hp1:555, nm1:2810 },
        '16.4L DC16 650hp': { fuel:'Diesel', cc:16353, code:'DC16', ecu:'EMS S8', hp:650, nm:3300, hp1:710, nm1:3580 },
      }
    }
  },
  Iveco: {
    Stralis: {
      '2012+': {
        '10.3L Cursor 10 420hp': { fuel:'Diesel', cc:10308, code:'F3AE', ecu:'EDC7UC31', hp:420, nm:2000, hp1:470, nm1:2230 },
        '12.9L Cursor 13 500hp': { fuel:'Diesel', cc:12880, code:'F3BE', ecu:'EDC7UC31', hp:500, nm:2300, hp1:555, nm1:2550 },
      }
    },
    Eurocargo: {
      '2015+': {
        '4.5L Tector 5 160hp': { fuel:'Diesel', cc:4485, code:'F4AE', ecu:'EDC7UC31', hp:160, nm:650, hp1:190, nm1:750 },
        '6.7L Tector 7 280hp': { fuel:'Diesel', cc:6728, code:'F4AE', ecu:'EDC7UC31', hp:280, nm:1050, hp1:320, nm1:1200 },
      }
    }
  },
  Renault: {
    'T Range': {
      '2013+': {
        '11L DTI 11 430hp': { fuel:'Diesel', cc:10800, code:'DTI11', ecu:'EMS3', hp:430, nm:2050, hp1:490, nm1:2300 },
        '13L DTI 13 480hp': { fuel:'Diesel', cc:12800, code:'DTI13', ecu:'EMS3', hp:480, nm:2400, hp1:540, nm1:2700 },
        '13L DTI 13 520hp': { fuel:'Diesel', cc:12800, code:'DTI13', ecu:'EMS3', hp:520, nm:2550, hp1:580, nm1:2850 }
      }
    }
  }
};
