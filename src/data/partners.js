// city, country, lat, lng, partner name, specialties
const raw = [
// === PORTUGAL ===
['Porto','Portugal',41.15,-8.63,'Porto Performance',['Stage 1-3','DPF/EGR','Gearbox']],
['Lisbon','Portugal',38.72,-9.14,'Lisboa Tuning',['Stage 1-2','E85','ECU Clone']],
['Faro','Portugal',37.02,-7.94,'Algarve Remap',['Stage 1-2','DPF/EGR']],
['Braga','Portugal',41.55,-8.43,'Braga Performance',['Stage 1','FlexFuel']],
// === FRANCE ===
['Paris','France',48.86,2.35,'Paris ECU Lab',['Full Service','Motorsport','Custom Dyno']],
['Nice','France',43.71,7.26,"Côte d'Azur Remap",['Stage 1-3','FlexFuel','Diagnostic']],
['Strasbourg','France',48.57,7.75,'Alsace Performance',['Stage 1-2','DPF/EGR','TCU']],
['Lyon','France',45.76,4.84,'Lyon Motorsport',['Stage 1-3','E85','Pops & Bangs']],
['Bordeaux','France',44.84,-0.58,'Gironde Tuning',['Stage 1-2','Emission Solutions']],
['Toulouse','France',43.60,1.44,'Occitanie Remap',['Stage 1-2','ECU Management']],
['Agen','France',44.20,0.62,'Agen Performance',['Stage 1','DPF/EGR','AdBlue OFF']],
['Annecy','France',45.90,6.13,'Alpes Chiptuning',['Stage 1-2','FlexFuel']],
['Marseille','France',43.30,5.37,'Marseille ECU Lab',['Stage 1-3','E85']],
['Nantes','France',47.22,-1.55,'Nantes Performance',['Stage 1-2','DPF/EGR']],
['Lille','France',50.63,3.06,'Nord Tuning',['Stage 1-2','TCU']],
['Montpellier','France',43.61,3.88,'Hérault Performance',['Stage 1','FlexFuel']],
// === UNITED KINGDOM ===
['London','United Kingdom',51.51,-0.13,'London ECU Works',['Full Service','Motorsport','Dyno']],
['Crawley','United Kingdom',51.11,-0.19,'Sussex Performance',['Stage 1-3','Gearbox','Motorsport']],
['Manchester','United Kingdom',53.48,-2.24,'Manchester ECU Works',['Full Service','Custom Maps','Dyno']],
['Birmingham','United Kingdom',52.49,-1.89,'Midlands Tuning',['Stage 1-3','DPF/EGR']],
['Leeds','United Kingdom',53.80,-1.55,'Yorkshire Performance',['Stage 1-2','E85']],
['Glasgow','United Kingdom',55.86,-4.25,'Glasgow Remap',['Stage 1-2','Gearbox']],
['Edinburgh','United Kingdom',55.95,-3.19,'Edinburgh Motorsport',['Stage 1-3','FlexFuel']],
['Liverpool','United Kingdom',53.41,-2.98,'Mersey Tuning',['Stage 1-2','DPF/EGR']],
['Bristol','United Kingdom',51.45,-2.59,'Bristol ECU Lab',['Stage 1-2','TCU']],
// === GERMANY ===
['Düsseldorf','Germany',51.23,6.77,'Rhein Performance',['Stage 1-3','TCU','Full Service']],
['Munich','Germany',48.14,11.58,'Bayern Tuning',['Stage 1-3','Motorsport','Dyno']],
['Berlin','Germany',52.52,13.41,'Berlin ECU Center',['Full Service','E85']],
['Hamburg','Germany',53.55,9.99,'Hamburg Performance',['Stage 1-2','DPF/EGR']],
['Frankfurt','Germany',50.11,8.68,'Frankfurt Remap',['Stage 1-3','Gearbox']],
['Stuttgart','Germany',48.78,9.18,'Stuttgart Motorsport',['Stage 1-3','Dyno','TCU']],
['Cologne','Germany',50.94,6.96,'Köln Tuning',['Stage 1-2','FlexFuel']],
// === SWITZERLAND ===
['Genève','Switzerland',46.20,6.14,'Geneva Motorsport',['Stage 1-2','Luxury & Sports']],
['Zürich','Switzerland',47.38,8.54,'Zürich Performance',['Stage 1-3','Full Service']],
// === ITALY ===
['Rome','Italy',41.90,12.50,'Roma ECU Lab',['Stage 1-3','Full Service']],
['Milan','Italy',45.46,9.19,'Milano Tuning',['Stage 1-3','Motorsport','Dyno']],
['Napoli','Italy',40.85,14.27,'Napoli Tuning',['Stage 1-2','DPF/EGR','ECU Clone']],
['Turin','Italy',45.07,7.69,'Torino Performance',['Stage 1-2','Gearbox']],
['Sicilia','Italy',37.60,14.02,'Sicilia Performance',['Stage 1','Emission Solutions']],
['Florence','Italy',43.77,11.25,'Firenze Remap',['Stage 1-2','E85']],
['Bologna','Italy',44.49,11.34,'Bologna Motorsport',['Stage 1-3','TCU']],
// === SPAIN ===
['Madrid','Spain',40.42,-3.70,'Madrid Chiptuning',['Stage 1-3','Full Service','Dyno']],
['Barcelona','Spain',41.39,2.17,'Barcelona ECU Lab',['Stage 1-3','Motorsport']],
['Valencia','Spain',39.47,-0.38,'Valencia Performance',['Stage 1-2','E85']],
['Seville','Spain',37.39,-5.98,'Sevilla Tuning',['Stage 1-2','DPF/EGR']],
// === NETHERLANDS ===
['Amsterdam','Netherlands',52.37,4.90,'Amsterdam Performance',['Stage 1-3','Full Service']],
['Rotterdam','Netherlands',51.92,4.48,'Rotterdam Tuning',['Stage 1-2','TCU']],
// === BELGIUM ===
['Brussels','Belgium',50.85,4.35,'Brussels ECU Center',['Stage 1-2','DPF/EGR']],
// === DENMARK ===
['Copenhagen','Denmark',55.68,12.57,'Copenhagen Tuning',['Stage 1-3','Full Service','Dyno']],
['Aarhus','Denmark',56.16,10.21,'Aarhus Performance',['Stage 1-2','DPF/EGR']],
['Odense','Denmark',55.40,10.39,'Odense Remap',['Stage 1','FlexFuel']],
// === SWEDEN ===
['Stockholm','Sweden',59.33,18.07,'Stockholm Performance',['Stage 1-3','E85']],
// === NORWAY ===
['Oslo','Norway',59.91,10.75,'Oslo Tuning',['Stage 1-2','FlexFuel']],
// === POLAND ===
['Warsaw','Poland',52.23,21.01,'Warsaw ECU Lab',['Stage 1-3','Full Service']],
['Krakow','Poland',50.06,19.94,'Kraków Performance',['Stage 1-2','DPF/EGR']],
// === CZECH REPUBLIC ===
['Prague','Czech Republic',50.08,14.44,'Prague Chiptuning',['Stage 1-3','Motorsport']],
// === AUSTRIA ===
['Vienna','Austria',48.21,16.37,'Wien Performance',['Stage 1-2','Luxury & Sports']],
// === HUNGARY ===
['Budapest','Hungary',47.50,19.04,'Budapest Tuning',['Stage 1-2','DPF/EGR']],
// === ROMANIA ===
['Bucharest','Romania',44.43,26.10,'Bucharest ECU Center',['Stage 1-2','Gearbox']],
// === CROATIA ===
['Zagreb','Croatia',45.81,15.98,'Zagreb Performance',['Stage 1-2','DPF/EGR']],
// === GREECE ===
['Athens','Greece',37.98,23.73,'Athens Tuning',['Stage 1-2','E85']],
// === SERBIA ===
['Belgrade','Serbia',44.79,20.47,'Belgrade ECU Lab',['Stage 1-3','Full Service','Dyno']],
['Novi Sad','Serbia',45.27,19.83,'Novi Sad Performance',['Stage 1-2','DPF/EGR']],
['Niš','Serbia',43.32,21.90,'Niš Tuning',['Stage 1','Gearbox']],
// === BULGARIA ===
['Sofia','Bulgaria',42.70,23.32,'Sofia Chiptuning',['Stage 1-3','Full Service']],
['Plovdiv','Bulgaria',42.15,24.75,'Plovdiv Performance',['Stage 1-2','DPF/EGR']],
['Varna','Bulgaria',43.21,27.91,'Varna Tuning',['Stage 1-2','E85']],
// === NORTH MACEDONIA ===
['Skopje','North Macedonia',41.99,21.43,'Skopje ECU Center',['Stage 1-2','DPF/EGR','AdBlue OFF']],
['Bitola','North Macedonia',41.03,21.33,'Bitola Tuning',['Stage 1','Emission Solutions']],
// === ALBANIA ===
['Tirana','Albania',41.33,19.82,'Tirana Performance',['Stage 1-2','DPF/EGR']],
['Durrës','Albania',41.32,19.45,'Durrës Remap',['Stage 1','ECU Clone']],
['Vlorë','Albania',40.47,19.49,'Vlorë Tuning',['Stage 1-2','FlexFuel']],
// === KOSOVO ===
['Pristina','Kosovo',42.66,21.17,'Pristina Remap',['Stage 1-2','DPF/EGR','AdBlue OFF']],
// === TURKEY ===
['Istanbul','Turkey',41.01,28.98,'Istanbul ECU Center',['Stage 1-3','Truck/Agri','Full Service']],
['Ankara','Turkey',39.93,32.86,'Ankara Performance',['Stage 1-2','DPF/EGR']],
['Izmir','Turkey',38.42,27.13,'Izmir Tuning',['Stage 1-3','Motorsport']],
['Antalya','Turkey',36.90,30.69,'Antalya Remap',['Stage 1-2','E85']],
['Bursa','Turkey',40.19,29.06,'Bursa ECU Lab',['Stage 1-2','Gearbox']],
// === UAE / DUBAI ===
['Dubai','UAE',25.20,55.27,'Dubai Performance HQ',['Full Service','Luxury','Motorsport']],
['Abu Dhabi','UAE',24.45,54.65,'Abu Dhabi Tuning',['Stage 1-3','Dyno','Full Service']],
['Sharjah','UAE',25.34,55.41,'Sharjah ECU Center',['Stage 1-2','DPF/EGR']],
// === SAUDI ARABIA ===
['Riyadh','Saudi Arabia',24.71,46.67,'Riyadh Performance',['Stage 1-3','Full Service']],
['Jeddah','Saudi Arabia',21.49,39.19,'Jeddah Tuning',['Stage 1-2','Motorsport']],
// === QATAR ===
['Doha','Qatar',25.29,51.53,'Doha ECU Lab',['Stage 1-3','Luxury','Dyno']],
// === KUWAIT ===
['Kuwait City','Kuwait',29.38,47.99,'Kuwait Performance',['Stage 1-2','DPF/EGR']],
// === BAHRAIN ===
['Manama','Bahrain',26.23,50.59,'Bahrain Tuning',['Stage 1-2','Motorsport']],
// === MOROCCO ===
['Casablanca','Morocco',33.57,-7.59,'Casablanca ECU Center',['Stage 1-3','Full Service','Dyno']],
['Marrakech','Morocco',31.63,-8.01,'Marrakech Performance',['Stage 1-2','DPF/EGR']],
['Rabat','Morocco',34.02,-6.83,'Rabat Tuning',['Stage 1-2','E85']],
['Tangier','Morocco',35.78,-5.81,'Tangier Remap',['Stage 1','FlexFuel']],
['Fez','Morocco',34.03,-5.00,'Fez Chiptuning',['Stage 1-2','Emission Solutions']],
// === SOUTH AFRICA ===
['Johannesburg','South Africa',-26.20,28.05,'Joburg Performance',['Stage 1-3','Full Service']],
// === USA — FLORIDA ===
['Miami','USA',25.76,-80.19,'Miami Performance',['Stage 1-3','Full Service','Dyno']],
['Fort Lauderdale','USA',26.12,-80.14,'Broward Tuning',['Stage 1-2','E85']],
['Tampa','USA',27.95,-82.46,'Tampa ECU Lab',['Stage 1-3','Motorsport']],
['Orlando','USA',28.54,-81.38,'Orlando Remap',['Stage 1-2','DPF/EGR']],
['Jacksonville','USA',30.33,-81.66,'Jax Performance',['Stage 1-2','Gearbox']],
// === USA — CALIFORNIA ===
['Los Angeles','USA',34.05,-118.24,'LA Chiptuning',['Full Service','Motorsport','Dyno']],
['San Diego','USA',32.72,-117.16,'San Diego ECU Lab',['Stage 1-3','E85']],
['San Francisco','USA',37.77,-122.42,'Bay Area Tuning',['Stage 1-3','FlexFuel']],
// === USA — NEW YORK AREA ===
['New York','USA',40.71,-74.01,'NYC Performance',['Full Service','Luxury','Dyno']],
['Brooklyn','USA',40.65,-73.95,'Brooklyn ECU Works',['Stage 1-3','Custom Maps']],
// === USA — 10 MORE CITIES ===
['Houston','USA',29.76,-95.37,'Houston Tuning',['Stage 1-3','Truck/Agri']],
['Dallas','USA',32.78,-96.80,'Dallas Performance',['Stage 1-3','Full Service']],
['Austin','USA',30.27,-97.74,'Austin Remap',['Stage 1-2','E85']],
['Chicago','USA',41.88,-87.63,'Chicago ECU Center',['Stage 1-3','Full Service','Dyno']],
['Detroit','USA',42.33,-83.05,'Detroit Motorsport',['Stage 1-3','Gearbox','Dyno']],
['Atlanta','USA',33.75,-84.39,'Atlanta Performance',['Stage 1-2','DPF/EGR']],
['Denver','USA',39.74,-104.99,'Denver Tuning',['Stage 1-2','E85']],
['Seattle','USA',47.61,-122.33,'Seattle ECU Lab',['Stage 1-2','FlexFuel']],
['Phoenix','USA',33.45,-112.07,'Phoenix Performance',['Stage 1-2','DPF/EGR']],
['Las Vegas','USA',36.17,-115.14,'Vegas Chiptuning',['Stage 1-3','Motorsport']],
['San Antonio','USA',29.42,-98.49,'San Antonio Tuning',['Stage 1-2','Truck/Agri']],
['Nashville','USA',36.16,-86.78,'Nashville Performance',['Stage 1-2','Custom Maps']],
// === CANADA ===
['Toronto','Canada',43.65,-79.38,'Toronto ECU Lab',['Stage 1-3','Full Service','Dyno']],
['Montreal','Canada',45.50,-73.57,'Montréal Performance',['Stage 1-3','E85','FlexFuel']],
['Vancouver','Canada',49.28,-123.12,'Vancouver Tuning',['Stage 1-2','DPF/EGR']],
['Calgary','Canada',51.05,-114.07,'Calgary Remap',['Stage 1-2','Truck/Agri']],
['Ottawa','Canada',45.42,-75.70,'Ottawa Performance',['Stage 1-2','Gearbox']],
// === COLOMBIA ===
['Bogotá','Colombia',4.71,-74.07,'Bogotá ECU Center',['Stage 1-3','Full Service']],
['Medellín','Colombia',6.25,-75.56,'Medellín Performance',['Stage 1-2','DPF/EGR']],
['Cali','Colombia',3.45,-76.53,'Cali Tuning',['Stage 1-2','E85']],
['Barranquilla','Colombia',10.96,-74.78,'Barranquilla Remap',['Stage 1','Emission Solutions']],
['Cartagena','Colombia',10.39,-75.51,'Cartagena Performance',['Stage 1-2','FlexFuel']],
// === VENEZUELA ===
['Caracas','Venezuela',10.48,-66.90,'Caracas ECU Lab',['Stage 1-3','Full Service']],
['Maracaibo','Venezuela',10.63,-71.64,'Maracaibo Tuning',['Stage 1-2','DPF/EGR']],
['Valencia','Venezuela',10.16,-67.99,'Valencia Performance',['Stage 1-2','E85']],
['Barquisimeto','Venezuela',10.07,-69.32,'Barquisimeto Remap',['Stage 1','Gearbox']],
// === BRAZIL ===
['São Paulo','Brazil',-23.55,-46.63,'São Paulo Tuning',['Stage 1-3','Full Service','Dyno']],
['Rio de Janeiro','Brazil',-22.91,-43.17,'Rio Performance',['Stage 1-2','Motorsport']],
// === CHINA ===
['Beijing','China',39.90,116.40,'Beijing ECU Center',['Stage 1-3','Full Service','Dyno']],
['Shanghai','China',31.23,121.47,'Shanghai Performance',['Stage 1-3','Luxury','Motorsport']],
['Guangzhou','China',23.13,113.26,'Guangzhou Tuning',['Stage 1-2','DPF/EGR']],
['Shenzhen','China',22.54,114.06,'Shenzhen ECU Lab',['Stage 1-3','Full Service']],
['Chengdu','China',30.57,104.07,'Chengdu Performance',['Stage 1-2','E85']],
['Hangzhou','China',30.27,120.15,'Hangzhou Remap',['Stage 1-2','TCU']],
// === THAILAND ===
['Bangkok','Thailand',13.76,100.50,'Bangkok Performance',['Stage 1-3','Full Service','Dyno']],
['Chiang Mai','Thailand',18.79,98.98,'Chiang Mai Tuning',['Stage 1-2','DPF/EGR']],
['Pattaya','Thailand',12.93,100.88,'Pattaya ECU Lab',['Stage 1-2','E85']],
['Phuket','Thailand',7.88,98.39,'Phuket Remap',['Stage 1','FlexFuel']],
// === JAPAN ===
['Tokyo','Japan',35.68,139.69,'Tokyo Performance',['Stage 1-3','Motorsport','Dyno']],
// === SOUTH KOREA ===
['Seoul','South Korea',37.57,126.98,'Seoul ECU Center',['Stage 1-3','Full Service']],
// === MALAYSIA ===
['Kuala Lumpur','Malaysia',3.14,101.69,'KL Performance',['Stage 1-2','DPF/EGR']],
// === SINGAPORE ===
['Singapore','Singapore',1.35,103.82,'Singapore Tuning',['Stage 1-3','Luxury']],
// === AUSTRALIA ===
['Sydney','Australia',-33.87,151.21,'Sydney ECU Lab',['Stage 1-3','Full Service','Dyno']],
['Melbourne','Australia',-37.81,144.96,'Melbourne Performance',['Stage 1-2','Motorsport']],
// === NEW ZEALAND ===
['Auckland','New Zealand',-36.85,174.76,'Auckland Tuning',['Stage 1-2','E85']],
];

// Build full partner objects
export const PARTNERS = raw.map(([city, country, lat, lng, partner, specialties]) => ({
  city, country, lat, lng, dLat: lat, dLng: lng, status: 'active', specialties, partner
}));

export const COUNTRY_FLAGS = {
  'Portugal':'🇵🇹','France':'🇫🇷','United Kingdom':'🇬🇧','Germany':'🇩🇪',
  'Switzerland':'🇨🇭','Italy':'🇮🇹','Spain':'🇪🇸','Netherlands':'🇳🇱',
  'Belgium':'🇧🇪','Denmark':'🇩🇰','Sweden':'🇸🇪','Norway':'🇳🇴',
  'Poland':'🇵🇱','Czech Republic':'🇨🇿','Austria':'🇦🇹','Hungary':'🇭🇺',
  'Romania':'🇷🇴','Croatia':'🇭🇷','Greece':'🇬🇷',
  'Serbia':'🇷🇸','Bulgaria':'🇧🇬','North Macedonia':'🇲🇰',
  'Albania':'🇦🇱','Kosovo':'🇽🇰','Turkey':'🇹🇷',
  'UAE':'🇦🇪','Saudi Arabia':'🇸🇦','Qatar':'🇶🇦','Kuwait':'🇰🇼','Bahrain':'🇧🇭',
  'Morocco':'🇲🇦','South Africa':'🇿🇦',
  'USA':'🇺🇸','Canada':'🇨🇦','Colombia':'🇨🇴','Venezuela':'🇻🇪','Brazil':'🇧🇷',
  'China':'🇨🇳','Thailand':'🇹🇭','Japan':'🇯🇵','South Korea':'🇰🇷',
  'Malaysia':'🇲🇾','Singapore':'🇸🇬',
  'Australia':'🇦🇺','New Zealand':'🇳🇿'
};

export const PARTNER_COUNT = PARTNERS.length;
export const COUNTRY_COUNT = [...new Set(PARTNERS.map(p => p.country))].length;
