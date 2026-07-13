// scripts/add-countries-api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/admin/geography';

// All countries of the world with their data
const countriesData = [
  // ==========================================
  // Africa (continent_id: 1)
  // ==========================================
  { code: 'DZ', name: 'Algeria', native_name: 'الجزائر', capital: 'Algiers', continentId: 1, population: 43851044, area_km2: 2381741, currency_code: 'DZD', phone_code: '+213', tld: '.dz' },
  { code: 'AO', name: 'Angola', native_name: 'Angola', capital: 'Luanda', continentId: 1, population: 32866272, area_km2: 1246700, currency_code: 'AOA', phone_code: '+244', tld: '.ao' },
  { code: 'BJ', name: 'Benin', native_name: 'Bénin', capital: 'Porto-Novo', continentId: 1, population: 12123200, area_km2: 112622, currency_code: 'XOF', phone_code: '+229', tld: '.bj' },
  { code: 'BW', name: 'Botswana', native_name: 'Botswana', capital: 'Gaborone', continentId: 1, population: 2351627, area_km2: 581730, currency_code: 'BWP', phone_code: '+267', tld: '.bw' },
  { code: 'BF', name: 'Burkina Faso', native_name: 'Burkina Faso', capital: 'Ouagadougou', continentId: 1, population: 20903273, area_km2: 274200, currency_code: 'XOF', phone_code: '+226', tld: '.bf' },
  { code: 'BI', name: 'Burundi', native_name: 'Burundi', capital: 'Gitega', continentId: 1, population: 11890784, area_km2: 27834, currency_code: 'BIF', phone_code: '+257', tld: '.bi' },
  { code: 'CV', name: 'Cabo Verde', native_name: 'Cabo Verde', capital: 'Praia', continentId: 1, population: 555987, area_km2: 4033, currency_code: 'CVE', phone_code: '+238', tld: '.cv' },
  { code: 'CM', name: 'Cameroon', native_name: 'Cameroun', capital: 'Yaoundé', continentId: 1, population: 26545863, area_km2: 475442, currency_code: 'XAF', phone_code: '+237', tld: '.cm' },
  { code: 'CF', name: 'Central African Republic', native_name: 'République centrafricaine', capital: 'Bangui', continentId: 1, population: 4829764, area_km2: 622984, currency_code: 'XAF', phone_code: '+236', tld: '.cf' },
  { code: 'TD', name: 'Chad', native_name: 'Tchad', capital: "N'Djamena", continentId: 1, population: 16425859, area_km2: 1284000, currency_code: 'XAF', phone_code: '+235', tld: '.td' },
  { code: 'KM', name: 'Comoros', native_name: 'Komori', capital: 'Moroni', continentId: 1, population: 869601, area_km2: 1862, currency_code: 'KMF', phone_code: '+269', tld: '.km' },
  { code: 'CG', name: 'Congo', native_name: 'République du Congo', capital: 'Brazzaville', continentId: 1, population: 5518092, area_km2: 342000, currency_code: 'XAF', phone_code: '+242', tld: '.cg' },
  { code: 'CD', name: 'DR Congo', native_name: 'République démocratique du Congo', capital: 'Kinshasa', continentId: 1, population: 89561404, area_km2: 2344858, currency_code: 'CDF', phone_code: '+243', tld: '.cd' },
  { code: 'DJ', name: 'Djibouti', native_name: 'Djibouti', capital: 'Djibouti', continentId: 1, population: 988000, area_km2: 23200, currency_code: 'DJF', phone_code: '+253', tld: '.dj' },
  { code: 'GQ', name: 'Equatorial Guinea', native_name: 'Guinea Ecuatorial', capital: 'Malabo', continentId: 1, population: 1402985, area_km2: 28051, currency_code: 'XAF', phone_code: '+240', tld: '.gq' },
  { code: 'ER', name: 'Eritrea', native_name: 'Eritrea', capital: 'Asmara', continentId: 1, population: 3546421, area_km2: 117600, currency_code: 'ERN', phone_code: '+291', tld: '.er' },
  { code: 'SZ', name: 'Eswatini', native_name: 'Eswatini', capital: 'Mbabane', continentId: 1, population: 1160164, area_km2: 17364, currency_code: 'SZL', phone_code: '+268', tld: '.sz' },
  { code: 'ET', name: 'Ethiopia', native_name: 'ኢትዮጵያ', capital: 'Addis Ababa', continentId: 1, population: 114963588, area_km2: 1104300, currency_code: 'ETB', phone_code: '+251', tld: '.et' },
  { code: 'GA', name: 'Gabon', native_name: 'Gabon', capital: 'Libreville', continentId: 1, population: 2225734, area_km2: 267668, currency_code: 'XAF', phone_code: '+241', tld: '.ga' },
  { code: 'GM', name: 'Gambia', native_name: 'Gambia', capital: 'Banjul', continentId: 1, population: 2416664, area_km2: 10689, currency_code: 'GMD', phone_code: '+220', tld: '.gm' },
  { code: 'GN', name: 'Guinea', native_name: 'Guinée', capital: 'Conakry', continentId: 1, population: 13132795, area_km2: 245857, currency_code: 'GNF', phone_code: '+224', tld: '.gn' },
  { code: 'GW', name: 'Guinea-Bissau', native_name: 'Guiné-Bissau', capital: 'Bissau', continentId: 1, population: 1968001, area_km2: 36125, currency_code: 'XOF', phone_code: '+245', tld: '.gw' },
  { code: 'CI', name: 'Ivory Coast', native_name: 'Côte d\'Ivoire', capital: 'Yamoussoukro', continentId: 1, population: 26378274, area_km2: 322463, currency_code: 'XOF', phone_code: '+225', tld: '.ci' },
  { code: 'KE', name: 'Kenya', native_name: 'Kenya', capital: 'Nairobi', continentId: 1, population: 53771296, area_km2: 580367, currency_code: 'KES', phone_code: '+254', tld: '.ke' },
  { code: 'LS', name: 'Lesotho', native_name: 'Lesotho', capital: 'Maseru', continentId: 1, population: 2142249, area_km2: 30355, currency_code: 'LSL', phone_code: '+266', tld: '.ls' },
  { code: 'LR', name: 'Liberia', native_name: 'Liberia', capital: 'Monrovia', continentId: 1, population: 5057677, area_km2: 111369, currency_code: 'LRD', phone_code: '+231', tld: '.lr' },
  { code: 'LY', name: 'Libya', native_name: 'ليبيا', capital: 'Tripoli', continentId: 1, population: 6871292, area_km2: 1759540, currency_code: 'LYD', phone_code: '+218', tld: '.ly' },
  { code: 'MG', name: 'Madagascar', native_name: 'Madagasikara', capital: 'Antananarivo', continentId: 1, population: 27691018, area_km2: 587041, currency_code: 'MGA', phone_code: '+261', tld: '.mg' },
  { code: 'MW', name: 'Malawi', native_name: 'Malawi', capital: 'Lilongwe', continentId: 1, population: 19129955, area_km2: 118484, currency_code: 'MWK', phone_code: '+265', tld: '.mw' },
  { code: 'ML', name: 'Mali', native_name: 'Mali', capital: 'Bamako', continentId: 1, population: 20250833, area_km2: 1240192, currency_code: 'XOF', phone_code: '+223', tld: '.ml' },
  { code: 'MR', name: 'Mauritania', native_name: 'موريتانيا', capital: 'Nouakchott', continentId: 1, population: 4649658, area_km2: 1030700, currency_code: 'MRU', phone_code: '+222', tld: '.mr' },
  { code: 'MU', name: 'Mauritius', native_name: 'Maurice', capital: 'Port Louis', continentId: 1, population: 1271768, area_km2: 2040, currency_code: 'MUR', phone_code: '+230', tld: '.mu' },
  { code: 'MA', name: 'Morocco', native_name: 'المغرب', capital: 'Rabat', continentId: 1, population: 36910560, area_km2: 446550, currency_code: 'MAD', phone_code: '+212', tld: '.ma' },
  { code: 'MZ', name: 'Mozambique', native_name: 'Moçambique', capital: 'Maputo', continentId: 1, population: 31255435, area_km2: 801590, currency_code: 'MZN', phone_code: '+258', tld: '.mz' },
  { code: 'NA', name: 'Namibia', native_name: 'Namibia', capital: 'Windhoek', continentId: 1, population: 2540916, area_km2: 825615, currency_code: 'NAD', phone_code: '+264', tld: '.na' },
  { code: 'NE', name: 'Niger', native_name: 'Niger', capital: 'Niamey', continentId: 1, population: 24206644, area_km2: 1267000, currency_code: 'XOF', phone_code: '+227', tld: '.ne' },
  { code: 'NG', name: 'Nigeria', native_name: 'Nigeria', capital: 'Abuja', continentId: 1, population: 206139589, area_km2: 923768, currency_code: 'NGN', phone_code: '+234', tld: '.ng' },
  { code: 'RW', name: 'Rwanda', native_name: 'Rwanda', capital: 'Kigali', continentId: 1, population: 12952218, area_km2: 26338, currency_code: 'RWF', phone_code: '+250', tld: '.rw' },
  { code: 'ST', name: 'Sao Tome and Principe', native_name: 'São Tomé e Príncipe', capital: 'São Tomé', continentId: 1, population: 219159, area_km2: 964, currency_code: 'STN', phone_code: '+239', tld: '.st' },
  { code: 'SN', name: 'Senegal', native_name: 'Sénégal', capital: 'Dakar', continentId: 1, population: 16743927, area_km2: 196722, currency_code: 'XOF', phone_code: '+221', tld: '.sn' },
  { code: 'SC', name: 'Seychelles', native_name: 'Seychelles', capital: 'Victoria', continentId: 1, population: 98347, area_km2: 455, currency_code: 'SCR', phone_code: '+248', tld: '.sc' },
  { code: 'SL', name: 'Sierra Leone', native_name: 'Sierra Leone', capital: 'Freetown', continentId: 1, population: 7976983, area_km2: 71740, currency_code: 'SLL', phone_code: '+232', tld: '.sl' },
  { code: 'SO', name: 'Somalia', native_name: 'Soomaaliya', capital: 'Mogadishu', continentId: 1, population: 15893222, area_km2: 637657, currency_code: 'SOS', phone_code: '+252', tld: '.so' },
  { code: 'ZA', name: 'South Africa', native_name: 'South Africa', capital: 'Pretoria', continentId: 1, population: 59308690, area_km2: 1221037, currency_code: 'ZAR', phone_code: '+27', tld: '.za' },
  { code: 'SS', name: 'South Sudan', native_name: 'South Sudan', capital: 'Juba', continentId: 1, population: 11193725, area_km2: 644329, currency_code: 'SSP', phone_code: '+211', tld: '.ss' },
  { code: 'SD', name: 'Sudan', native_name: 'السودان', capital: 'Khartoum', continentId: 1, population: 43849260, area_km2: 1861484, currency_code: 'SDG', phone_code: '+249', tld: '.sd' },
  { code: 'TZ', name: 'Tanzania', native_name: 'Tanzania', capital: 'Dodoma', continentId: 1, population: 59734218, area_km2: 945087, currency_code: 'TZS', phone_code: '+255', tld: '.tz' },
  { code: 'TG', name: 'Togo', native_name: 'Togo', capital: 'Lomé', continentId: 1, population: 8278737, area_km2: 56785, currency_code: 'XOF', phone_code: '+228', tld: '.tg' },
  { code: 'TN', name: 'Tunisia', native_name: 'تونس', capital: 'Tunis', continentId: 1, population: 11818619, area_km2: 163610, currency_code: 'TND', phone_code: '+216', tld: '.tn' },
  { code: 'UG', name: 'Uganda', native_name: 'Uganda', capital: 'Kampala', continentId: 1, population: 45741007, area_km2: 241038, currency_code: 'UGX', phone_code: '+256', tld: '.ug' },
  { code: 'ZM', name: 'Zambia', native_name: 'Zambia', capital: 'Lusaka', continentId: 1, population: 18383955, area_km2: 752612, currency_code: 'ZMW', phone_code: '+260', tld: '.zm' },
  { code: 'ZW', name: 'Zimbabwe', native_name: 'Zimbabwe', capital: 'Harare', continentId: 1, population: 14862924, area_km2: 390757, currency_code: 'ZWL', phone_code: '+263', tld: '.zw' },

  // ==========================================
  // Asia (continent_id: 3)
  // ==========================================
  { code: 'AF', name: 'Afghanistan', native_name: 'افغانستان', capital: 'Kabul', continentId: 3, population: 38928346, area_km2: 652230, currency_code: 'AFN', phone_code: '+93', tld: '.af' },
  { code: 'AM', name: 'Armenia', native_name: 'Հայաստան', capital: 'Yerevan', continentId: 3, population: 2963243, area_km2: 29743, currency_code: 'AMD', phone_code: '+374', tld: '.am' },
  { code: 'AZ', name: 'Azerbaijan', native_name: 'Azərbaycan', capital: 'Baku', continentId: 3, population: 10139177, area_km2: 86600, currency_code: 'AZN', phone_code: '+994', tld: '.az' },
  { code: 'BH', name: 'Bahrain', native_name: 'البحرين', capital: 'Manama', continentId: 3, population: 1701575, area_km2: 765, currency_code: 'BHD', phone_code: '+973', tld: '.bh' },
  { code: 'BD', name: 'Bangladesh', native_name: 'বাংলাদেশ', capital: 'Dhaka', continentId: 3, population: 164689383, area_km2: 147570, currency_code: 'BDT', phone_code: '+880', tld: '.bd' },
  { code: 'BT', name: 'Bhutan', native_name: 'འབྲུག་ཡུལ།', capital: 'Thimphu', continentId: 3, population: 771608, area_km2: 38394, currency_code: 'BTN', phone_code: '+975', tld: '.bt' },
  { code: 'BN', name: 'Brunei', native_name: 'Brunei Darussalam', capital: 'Bandar Seri Begawan', continentId: 3, population: 437483, area_km2: 5765, currency_code: 'BND', phone_code: '+673', tld: '.bn' },
  { code: 'KH', name: 'Cambodia', native_name: 'កម្ពុជា', capital: 'Phnom Penh', continentId: 3, population: 16718965, area_km2: 181035, currency_code: 'KHR', phone_code: '+855', tld: '.kh' },
  { code: 'CN', name: 'China', native_name: '中国', capital: 'Beijing', continentId: 3, population: 1439323776, area_km2: 9596961, currency_code: 'CNY', phone_code: '+86', tld: '.cn' },
  { code: 'CY', name: 'Cyprus', native_name: 'Κύπρος', capital: 'Nicosia', continentId: 3, population: 1207361, area_km2: 9251, currency_code: 'EUR', phone_code: '+357', tld: '.cy' },
  { code: 'GE', name: 'Georgia', native_name: 'საქართველო', capital: 'Tbilisi', continentId: 3, population: 3989167, area_km2: 69700, currency_code: 'GEL', phone_code: '+995', tld: '.ge' },
  { code: 'IN', name: 'India', native_name: 'भारत', capital: 'New Delhi', continentId: 3, population: 1380004385, area_km2: 3287263, currency_code: 'INR', phone_code: '+91', tld: '.in' },
  { code: 'ID', name: 'Indonesia', native_name: 'Indonesia', capital: 'Jakarta', continentId: 3, population: 273523615, area_km2: 1904569, currency_code: 'IDR', phone_code: '+62', tld: '.id' },
  { code: 'IR', name: 'Iran', native_name: 'ایران', capital: 'Tehran', continentId: 3, population: 83992949, area_km2: 1648195, currency_code: 'IRR', phone_code: '+98', tld: '.ir' },
  { code: 'IQ', name: 'Iraq', native_name: 'العراق', capital: 'Baghdad', continentId: 3, population: 40222493, area_km2: 438317, currency_code: 'IQD', phone_code: '+964', tld: '.iq' },
  { code: 'IL', name: 'Israel', native_name: 'ישראל', capital: 'Jerusalem', continentId: 3, population: 8655535, area_km2: 20770, currency_code: 'ILS', phone_code: '+972', tld: '.il' },
  { code: 'JP', name: 'Japan', native_name: '日本', capital: 'Tokyo', continentId: 3, population: 126476461, area_km2: 377975, currency_code: 'JPY', phone_code: '+81', tld: '.jp' },
  { code: 'JO', name: 'Jordan', native_name: 'الأردن', capital: 'Amman', continentId: 3, population: 10203134, area_km2: 89342, currency_code: 'JOD', phone_code: '+962', tld: '.jo' },
  { code: 'KZ', name: 'Kazakhstan', native_name: 'Қазақстан', capital: 'Nur-Sultan', continentId: 3, population: 18776707, area_km2: 2724900, currency_code: 'KZT', phone_code: '+7', tld: '.kz' },
  { code: 'KW', name: 'Kuwait', native_name: 'الكويت', capital: 'Kuwait City', continentId: 3, population: 4270571, area_km2: 17818, currency_code: 'KWD', phone_code: '+965', tld: '.kw' },
  { code: 'KG', name: 'Kyrgyzstan', native_name: 'Кыргызстан', capital: 'Bishkek', continentId: 3, population: 6524195, area_km2: 199951, currency_code: 'KGS', phone_code: '+996', tld: '.kg' },
  { code: 'LA', name: 'Laos', native_name: 'ປະເທດລາວ', capital: 'Vientiane', continentId: 3, population: 7275556, area_km2: 236800, currency_code: 'LAK', phone_code: '+856', tld: '.la' },
  { code: 'LB', name: 'Lebanon', native_name: 'لبنان', capital: 'Beirut', continentId: 3, population: 6825445, area_km2: 10400, currency_code: 'LBP', phone_code: '+961', tld: '.lb' },
  { code: 'MY', name: 'Malaysia', native_name: 'Malaysia', capital: 'Kuala Lumpur', continentId: 3, population: 32365999, area_km2: 329847, currency_code: 'MYR', phone_code: '+60', tld: '.my' },
  { code: 'MV', name: 'Maldives', native_name: 'ދިވެހިރާއްޖެ', capital: 'Malé', continentId: 3, population: 540544, area_km2: 298, currency_code: 'MVR', phone_code: '+960', tld: '.mv' },
  { code: 'MN', name: 'Mongolia', native_name: 'Монгол улс', capital: 'Ulaanbaatar', continentId: 3, population: 3278290, area_km2: 1564116, currency_code: 'MNT', phone_code: '+976', tld: '.mn' },
  { code: 'MM', name: 'Myanmar', native_name: 'မြန်မာ', capital: 'Naypyidaw', continentId: 3, population: 54409800, area_km2: 676578, currency_code: 'MMK', phone_code: '+95', tld: '.mm' },
  { code: 'NP', name: 'Nepal', native_name: 'नेपाल', capital: 'Kathmandu', continentId: 3, population: 29136808, area_km2: 147181, currency_code: 'NPR', phone_code: '+977', tld: '.np' },
  { code: 'KP', name: 'North Korea', native_name: '조선민주주의인민공화국', capital: 'Pyongyang', continentId: 3, population: 25778815, area_km2: 120538, currency_code: 'KPW', phone_code: '+850', tld: '.kp' },
  { code: 'OM', name: 'Oman', native_name: 'عمان', capital: 'Muscat', continentId: 3, population: 5106626, area_km2: 309500, currency_code: 'OMR', phone_code: '+968', tld: '.om' },
  { code: 'PK', name: 'Pakistan', native_name: 'پاکستان', capital: 'Islamabad', continentId: 3, population: 220892340, area_km2: 881913, currency_code: 'PKR', phone_code: '+92', tld: '.pk' },
  { code: 'PS', name: 'Palestine', native_name: 'فلسطين', capital: 'Ramallah', continentId: 3, population: 5101414, area_km2: 6020, currency_code: 'ILS', phone_code: '+970', tld: '.ps' },
  { code: 'PH', name: 'Philippines', native_name: 'Pilipinas', capital: 'Manila', continentId: 3, population: 109581078, area_km2: 300000, currency_code: 'PHP', phone_code: '+63', tld: '.ph' },
  { code: 'QA', name: 'Qatar', native_name: 'قطر', capital: 'Doha', continentId: 3, population: 2881053, area_km2: 11586, currency_code: 'QAR', phone_code: '+974', tld: '.qa' },
  { code: 'SA', name: 'Saudi Arabia', native_name: 'المملكة العربية السعودية', capital: 'Riyadh', continentId: 3, population: 34813871, area_km2: 2149690, currency_code: 'SAR', phone_code: '+966', tld: '.sa' },
  { code: 'SG', name: 'Singapore', native_name: 'Singapore', capital: 'Singapore', continentId: 3, population: 5850342, area_km2: 728, currency_code: 'SGD', phone_code: '+65', tld: '.sg' },
  { code: 'KR', name: 'South Korea', native_name: '대한민국', capital: 'Seoul', continentId: 3, population: 51780579, area_km2: 100210, currency_code: 'KRW', phone_code: '+82', tld: '.kr' },
  { code: 'LK', name: 'Sri Lanka', native_name: 'ශ්‍රී ලංකා', capital: 'Sri Jayawardenepura Kotte', continentId: 3, population: 21413249, area_km2: 65610, currency_code: 'LKR', phone_code: '+94', tld: '.lk' },
  { code: 'SY', name: 'Syria', native_name: 'سوريا', capital: 'Damascus', continentId: 3, population: 17500658, area_km2: 185180, currency_code: 'SYP', phone_code: '+963', tld: '.sy' },
  { code: 'TW', name: 'Taiwan', native_name: '臺灣', capital: 'Taipei', continentId: 3, population: 23816775, area_km2: 36193, currency_code: 'TWD', phone_code: '+886', tld: '.tw' },
  { code: 'TJ', name: 'Tajikistan', native_name: 'Тоҷикистон', capital: 'Dushanbe', continentId: 3, population: 9537645, area_km2: 143100, currency_code: 'TJS', phone_code: '+992', tld: '.tj' },
  { code: 'TH', name: 'Thailand', native_name: 'ประเทศไทย', capital: 'Bangkok', continentId: 3, population: 69799978, area_km2: 513120, currency_code: 'THB', phone_code: '+66', tld: '.th' },
  { code: 'TL', name: 'Timor-Leste', native_name: 'Timor-Leste', capital: 'Dili', continentId: 3, population: 1318445, area_km2: 14874, currency_code: 'USD', phone_code: '+670', tld: '.tl' },
  { code: 'TR', name: 'Turkey', native_name: 'Türkiye', capital: 'Ankara', continentId: 3, population: 84339067, area_km2: 783562, currency_code: 'TRY', phone_code: '+90', tld: '.tr' },
  { code: 'TM', name: 'Turkmenistan', native_name: 'Türkmenistan', capital: 'Ashgabat', continentId: 3, population: 6031200, area_km2: 488100, currency_code: 'TMT', phone_code: '+993', tld: '.tm' },
  { code: 'AE', name: 'United Arab Emirates', native_name: 'الإمارات العربية المتحدة', capital: 'Abu Dhabi', continentId: 3, population: 9890402, area_km2: 83600, currency_code: 'AED', phone_code: '+971', tld: '.ae' },
  { code: 'UZ', name: 'Uzbekistan', native_name: 'Oʻzbekiston', capital: 'Tashkent', continentId: 3, population: 33469199, area_km2: 447400, currency_code: 'UZS', phone_code: '+998', tld: '.uz' },
  { code: 'VN', name: 'Vietnam', native_name: 'Việt Nam', capital: 'Hanoi', continentId: 3, population: 97338579, area_km2: 331212, currency_code: 'VND', phone_code: '+84', tld: '.vn' },
  { code: 'YE', name: 'Yemen', native_name: 'اليمن', capital: "Sana'a", continentId: 3, population: 29825968, area_km2: 527968, currency_code: 'YER', phone_code: '+967', tld: '.ye' },

  // ==========================================
  // Europe (continent_id: 4)
  // ==========================================
  { code: 'AL', name: 'Albania', native_name: 'Shqipëria', capital: 'Tirana', continentId: 4, population: 2877797, area_km2: 28748, currency_code: 'ALL', phone_code: '+355', tld: '.al' },
  { code: 'AD', name: 'Andorra', native_name: 'Andorra', capital: 'Andorra la Vella', continentId: 4, population: 77265, area_km2: 468, currency_code: 'EUR', phone_code: '+376', tld: '.ad' },
  { code: 'AT', name: 'Austria', native_name: 'Österreich', capital: 'Vienna', continentId: 4, population: 9006398, area_km2: 83871, currency_code: 'EUR', phone_code: '+43', tld: '.at' },
  { code: 'BY', name: 'Belarus', native_name: 'Беларусь', capital: 'Minsk', continentId: 4, population: 9449323, area_km2: 207600, currency_code: 'BYN', phone_code: '+375', tld: '.by' },
  { code: 'BE', name: 'Belgium', native_name: 'België', capital: 'Brussels', continentId: 4, population: 11589623, area_km2: 30528, currency_code: 'EUR', phone_code: '+32', tld: '.be' },
  { code: 'BA', name: 'Bosnia and Herzegovina', native_name: 'Bosna i Hercegovina', capital: 'Sarajevo', continentId: 4, population: 3280819, area_km2: 51197, currency_code: 'BAM', phone_code: '+387', tld: '.ba' },
  { code: 'BG', name: 'Bulgaria', native_name: 'България', capital: 'Sofia', continentId: 4, population: 6948445, area_km2: 110879, currency_code: 'BGN', phone_code: '+359', tld: '.bg' },
  { code: 'HR', name: 'Croatia', native_name: 'Hrvatska', capital: 'Zagreb', continentId: 4, population: 4105267, area_km2: 56594, currency_code: 'HRK', phone_code: '+385', tld: '.hr' },
  { code: 'CZ', name: 'Czech Republic', native_name: 'Česká republika', capital: 'Prague', continentId: 4, population: 10708981, area_km2: 78867, currency_code: 'CZK', phone_code: '+420', tld: '.cz' },
  { code: 'DK', name: 'Denmark', native_name: 'Danmark', capital: 'Copenhagen', continentId: 4, population: 5831404, area_km2: 43094, currency_code: 'DKK', phone_code: '+45', tld: '.dk' },
  { code: 'EE', name: 'Estonia', native_name: 'Eesti', capital: 'Tallinn', continentId: 4, population: 1326062, area_km2: 45228, currency_code: 'EUR', phone_code: '+372', tld: '.ee' },
  { code: 'FI', name: 'Finland', native_name: 'Suomi', capital: 'Helsinki', continentId: 4, population: 5540720, area_km2: 338424, currency_code: 'EUR', phone_code: '+358', tld: '.fi' },
  { code: 'FR', name: 'France', native_name: 'France', capital: 'Paris', continentId: 4, population: 65273511, area_km2: 640679, currency_code: 'EUR', phone_code: '+33', tld: '.fr' },
  { code: 'DE', name: 'Germany', native_name: 'Deutschland', capital: 'Berlin', continentId: 4, population: 83783942, area_km2: 357022, currency_code: 'EUR', phone_code: '+49', tld: '.de' },
  { code: 'GR', name: 'Greece', native_name: 'Ελλάδα', capital: 'Athens', continentId: 4, population: 10423054, area_km2: 131957, currency_code: 'EUR', phone_code: '+30', tld: '.gr' },
  { code: 'HU', name: 'Hungary', native_name: 'Magyarország', capital: 'Budapest', continentId: 4, population: 9660351, area_km2: 93028, currency_code: 'HUF', phone_code: '+36', tld: '.hu' },
  { code: 'IS', name: 'Iceland', native_name: 'Ísland', capital: 'Reykjavik', continentId: 4, population: 341243, area_km2: 103000, currency_code: 'ISK', phone_code: '+354', tld: '.is' },
  { code: 'IE', name: 'Ireland', native_name: 'Ireland', capital: 'Dublin', continentId: 4, population: 4937786, area_km2: 70273, currency_code: 'EUR', phone_code: '+353', tld: '.ie' },
  { code: 'IT', name: 'Italy', native_name: 'Italia', capital: 'Rome', continentId: 4, population: 60461826, area_km2: 301340, currency_code: 'EUR', phone_code: '+39', tld: '.it' },
  { code: 'LV', name: 'Latvia', native_name: 'Latvija', capital: 'Riga', continentId: 4, population: 1886198, area_km2: 64589, currency_code: 'EUR', phone_code: '+371', tld: '.lv' },
  { code: 'LI', name: 'Liechtenstein', native_name: 'Liechtenstein', capital: 'Vaduz', continentId: 4, population: 38137, area_km2: 160, currency_code: 'CHF', phone_code: '+423', tld: '.li' },
  { code: 'LT', name: 'Lithuania', native_name: 'Lietuva', capital: 'Vilnius', continentId: 4, population: 2722289, area_km2: 65300, currency_code: 'EUR', phone_code: '+370', tld: '.lt' },
  { code: 'LU', name: 'Luxembourg', native_name: 'Lëtzebuerg', capital: 'Luxembourg', continentId: 4, population: 625978, area_km2: 2586, currency_code: 'EUR', phone_code: '+352', tld: '.lu' },
  { code: 'MT', name: 'Malta', native_name: 'Malta', capital: 'Valletta', continentId: 4, population: 441543, area_km2: 316, currency_code: 'EUR', phone_code: '+356', tld: '.mt' },
  { code: 'MD', name: 'Moldova', native_name: 'Moldova', capital: 'Chișinău', continentId: 4, population: 4033963, area_km2: 33851, currency_code: 'MDL', phone_code: '+373', tld: '.md' },
  { code: 'MC', name: 'Monaco', native_name: 'Monaco', capital: 'Monaco', continentId: 4, population: 39242, area_km2: 2, currency_code: 'EUR', phone_code: '+377', tld: '.mc' },
  { code: 'ME', name: 'Montenegro', native_name: 'Crna Gora', capital: 'Podgorica', continentId: 4, population: 628066, area_km2: 13812, currency_code: 'EUR', phone_code: '+382', tld: '.me' },
  { code: 'NL', name: 'Netherlands', native_name: 'Nederland', capital: 'Amsterdam', continentId: 4, population: 17134872, area_km2: 41543, currency_code: 'EUR', phone_code: '+31', tld: '.nl' },
  { code: 'MK', name: 'North Macedonia', native_name: 'Северна Македонија', capital: 'Skopje', continentId: 4, population: 2083374, area_km2: 25713, currency_code: 'MKD', phone_code: '+389', tld: '.mk' },
  { code: 'NO', name: 'Norway', native_name: 'Norge', capital: 'Oslo', continentId: 4, population: 5421241, area_km2: 385207, currency_code: 'NOK', phone_code: '+47', tld: '.no' },
  { code: 'PL', name: 'Poland', native_name: 'Polska', capital: 'Warsaw', continentId: 4, population: 38386000, area_km2: 312696, currency_code: 'PLN', phone_code: '+48', tld: '.pl' },
  { code: 'PT', name: 'Portugal', native_name: 'Portugal', capital: 'Lisbon', continentId: 4, population: 10196709, area_km2: 92090, currency_code: 'EUR', phone_code: '+351', tld: '.pt' },
  { code: 'RO', name: 'Romania', native_name: 'România', capital: 'Bucharest', continentId: 4, population: 19237691, area_km2: 238391, currency_code: 'RON', phone_code: '+40', tld: '.ro' },
  { code: 'RU', name: 'Russia', native_name: 'Россия', capital: 'Moscow', continentId: 4, population: 145934462, area_km2: 17098242, currency_code: 'RUB', phone_code: '+7', tld: '.ru' },
  { code: 'SM', name: 'San Marino', native_name: 'San Marino', capital: 'San Marino', continentId: 4, population: 33931, area_km2: 61, currency_code: 'EUR', phone_code: '+378', tld: '.sm' },
  { code: 'RS', name: 'Serbia', native_name: 'Србија', capital: 'Belgrade', continentId: 4, population: 8737371, area_km2: 77474, currency_code: 'RSD', phone_code: '+381', tld: '.rs' },
  { code: 'SK', name: 'Slovakia', native_name: 'Slovensko', capital: 'Bratislava', continentId: 4, population: 5459642, area_km2: 49035, currency_code: 'EUR', phone_code: '+421', tld: '.sk' },
  { code: 'SI', name: 'Slovenia', native_name: 'Slovenija', capital: 'Ljubljana', continentId: 4, population: 2078938, area_km2: 20273, currency_code: 'EUR', phone_code: '+386', tld: '.si' },
  { code: 'ES', name: 'Spain', native_name: 'España', capital: 'Madrid', continentId: 4, population: 46754778, area_km2: 505992, currency_code: 'EUR', phone_code: '+34', tld: '.es' },
  { code: 'SE', name: 'Sweden', native_name: 'Sverige', capital: 'Stockholm', continentId: 4, population: 10099265, area_km2: 450295, currency_code: 'SEK', phone_code: '+46', tld: '.se' },
  { code: 'CH', name: 'Switzerland', native_name: 'Schweiz', capital: 'Bern', continentId: 4, population: 8654622, area_km2: 41284, currency_code: 'CHF', phone_code: '+41', tld: '.ch' },
  { code: 'UA', name: 'Ukraine', native_name: 'Україна', capital: 'Kyiv', continentId: 4, population: 43733759, area_km2: 603500, currency_code: 'UAH', phone_code: '+380', tld: '.ua' },
  { code: 'GB', name: 'United Kingdom', native_name: 'United Kingdom', capital: 'London', continentId: 4, population: 67886011, area_km2: 243610, currency_code: 'GBP', phone_code: '+44', tld: '.uk' },
  { code: 'VA', name: 'Vatican City', native_name: 'Vaticano', capital: 'Vatican City', continentId: 4, population: 801, area_km2: 0.44, currency_code: 'EUR', phone_code: '+379', tld: '.va' },

  // ==========================================
  // North America (continent_id: 5)
  // ==========================================
  { code: 'AG', name: 'Antigua and Barbuda', native_name: 'Antigua and Barbuda', capital: "St. John's", continentId: 5, population: 97929, area_km2: 442, currency_code: 'XCD', phone_code: '+1-268', tld: '.ag' },
  { code: 'BS', name: 'Bahamas', native_name: 'Bahamas', capital: 'Nassau', continentId: 5, population: 393244, area_km2: 13880, currency_code: 'BSD', phone_code: '+1-242', tld: '.bs' },
  { code: 'BB', name: 'Barbados', native_name: 'Barbados', capital: 'Bridgetown', continentId: 5, population: 287375, area_km2: 430, currency_code: 'BBD', phone_code: '+1-246', tld: '.bb' },
  { code: 'BZ', name: 'Belize', native_name: 'Belize', capital: 'Belmopan', continentId: 5, population: 397628, area_km2: 22966, currency_code: 'BZD', phone_code: '+501', tld: '.bz' },
  { code: 'CA', name: 'Canada', native_name: 'Canada', capital: 'Ottawa', continentId: 5, population: 37742154, area_km2: 9984670, currency_code: 'CAD', phone_code: '+1', tld: '.ca' },
  { code: 'CR', name: 'Costa Rica', native_name: 'Costa Rica', capital: 'San José', continentId: 5, population: 5094118, area_km2: 51100, currency_code: 'CRC', phone_code: '+506', tld: '.cr' },
  { code: 'CU', name: 'Cuba', native_name: 'Cuba', capital: 'Havana', continentId: 5, population: 11326616, area_km2: 109884, currency_code: 'CUP', phone_code: '+53', tld: '.cu' },
  { code: 'DM', name: 'Dominica', native_name: 'Dominica', capital: 'Roseau', continentId: 5, population: 71986, area_km2: 751, currency_code: 'XCD', phone_code: '+1-767', tld: '.dm' },
  { code: 'DO', name: 'Dominican Republic', native_name: 'República Dominicana', capital: 'Santo Domingo', continentId: 5, population: 10847910, area_km2: 48671, currency_code: 'DOP', phone_code: '+1-809', tld: '.do' },
  { code: 'SV', name: 'El Salvador', native_name: 'El Salvador', capital: 'San Salvador', continentId: 5, population: 6486205, area_km2: 21041, currency_code: 'USD', phone_code: '+503', tld: '.sv' },
  { code: 'GD', name: 'Grenada', native_name: 'Grenada', capital: "St. George's", continentId: 5, population: 112523, area_km2: 344, currency_code: 'XCD', phone_code: '+1-473', tld: '.gd' },
  { code: 'GT', name: 'Guatemala', native_name: 'Guatemala', capital: 'Guatemala City', continentId: 5, population: 17915886, area_km2: 108889, currency_code: 'GTQ', phone_code: '+502', tld: '.gt' },
  { code: 'HT', name: 'Haiti', native_name: 'Haïti', capital: 'Port-au-Prince', continentId: 5, population: 11402528, area_km2: 27750, currency_code: 'HTG', phone_code: '+509', tld: '.ht' },
  { code: 'HN', name: 'Honduras', native_name: 'Honduras', capital: 'Tegucigalpa', continentId: 5, population: 9904608, area_km2: 112492, currency_code: 'HNL', phone_code: '+504', tld: '.hn' },
  { code: 'JM', name: 'Jamaica', native_name: 'Jamaica', capital: 'Kingston', continentId: 5, population: 2961167, area_km2: 10991, currency_code: 'JMD', phone_code: '+1-876', tld: '.jm' },
  { code: 'MX', name: 'Mexico', native_name: 'México', capital: 'Mexico City', continentId: 5, population: 128932753, area_km2: 1964375, currency_code: 'MXN', phone_code: '+52', tld: '.mx' },
  { code: 'NI', name: 'Nicaragua', native_name: 'Nicaragua', capital: 'Managua', continentId: 5, population: 6624554, area_km2: 130375, currency_code: 'NIO', phone_code: '+505', tld: '.ni' },
  { code: 'PA', name: 'Panama', native_name: 'Panamá', capital: 'Panama City', continentId: 5, population: 4314767, area_km2: 75417, currency_code: 'PAB', phone_code: '+507', tld: '.pa' },
  { code: 'TT', name: 'Trinidad and Tobago', native_name: 'Trinidad and Tobago', capital: 'Port of Spain', continentId: 5, population: 1399488, area_km2: 5130, currency_code: 'TTD', phone_code: '+1-868', tld: '.tt' },
  { code: 'US', name: 'United States', native_name: 'United States', capital: 'Washington D.C.', continentId: 5, population: 331002651, area_km2: 9833517, currency_code: 'USD', phone_code: '+1', tld: '.us' },

  // ==========================================
  // South America (continent_id: 7)
  // ==========================================
  { code: 'AR', name: 'Argentina', native_name: 'Argentina', capital: 'Buenos Aires', continentId: 7, population: 45195774, area_km2: 2780400, currency_code: 'ARS', phone_code: '+54', tld: '.ar' },
  { code: 'BO', name: 'Bolivia', native_name: 'Bolivia', capital: 'Sucre', continentId: 7, population: 11673021, area_km2: 1098581, currency_code: 'BOB', phone_code: '+591', tld: '.bo' },
  { code: 'BR', name: 'Brazil', native_name: 'Brasil', capital: 'Brasília', continentId: 7, population: 212559417, area_km2: 8515767, currency_code: 'BRL', phone_code: '+55', tld: '.br' },
  { code: 'CL', name: 'Chile', native_name: 'Chile', capital: 'Santiago', continentId: 7, population: 19116201, area_km2: 756102, currency_code: 'CLP', phone_code: '+56', tld: '.cl' },
  { code: 'CO', name: 'Colombia', native_name: 'Colombia', capital: 'Bogotá', continentId: 7, population: 50882891, area_km2: 1141748, currency_code: 'COP', phone_code: '+57', tld: '.co' },
  { code: 'EC', name: 'Ecuador', native_name: 'Ecuador', capital: 'Quito', continentId: 7, population: 17643054, area_km2: 283561, currency_code: 'USD', phone_code: '+593', tld: '.ec' },
  { code: 'GY', name: 'Guyana', native_name: 'Guyana', capital: 'Georgetown', continentId: 7, population: 786552, area_km2: 214969, currency_code: 'GYD', phone_code: '+592', tld: '.gy' },
  { code: 'PY', name: 'Paraguay', native_name: 'Paraguay', capital: 'Asunción', continentId: 7, population: 7132538, area_km2: 406752, currency_code: 'PYG', phone_code: '+595', tld: '.py' },
  { code: 'PE', name: 'Peru', native_name: 'Perú', capital: 'Lima', continentId: 7, population: 32971854, area_km2: 1285216, currency_code: 'PEN', phone_code: '+51', tld: '.pe' },
  { code: 'SR', name: 'Suriname', native_name: 'Suriname', capital: 'Paramaribo', continentId: 7, population: 586634, area_km2: 163820, currency_code: 'SRD', phone_code: '+597', tld: '.sr' },
  { code: 'UY', name: 'Uruguay', native_name: 'Uruguay', capital: 'Montevideo', continentId: 7, population: 3473730, area_km2: 176215, currency_code: 'UYU', phone_code: '+598', tld: '.uy' },
  { code: 'VE', name: 'Venezuela', native_name: 'Venezuela', capital: 'Caracas', continentId: 7, population: 28435940, area_km2: 912050, currency_code: 'VES', phone_code: '+58', tld: '.ve' },

  // ==========================================
  // Oceania (continent_id: 6)
  // ==========================================
  { code: 'AU', name: 'Australia', native_name: 'Australia', capital: 'Canberra', continentId: 6, population: 25499884, area_km2: 7692024, currency_code: 'AUD', phone_code: '+61', tld: '.au' },
  { code: 'FJ', name: 'Fiji', native_name: 'Fiji', capital: 'Suva', continentId: 6, population: 896445, area_km2: 18272, currency_code: 'FJD', phone_code: '+679', tld: '.fj' },
  { code: 'KI', name: 'Kiribati', native_name: 'Kiribati', capital: 'Tarawa', continentId: 6, population: 119449, area_km2: 811, currency_code: 'AUD', phone_code: '+686', tld: '.ki' },
  { code: 'MH', name: 'Marshall Islands', native_name: 'Marshall Islands', capital: 'Majuro', continentId: 6, population: 59190, area_km2: 181, currency_code: 'USD', phone_code: '+692', tld: '.mh' },
  { code: 'FM', name: 'Micronesia', native_name: 'Micronesia', capital: 'Palikir', continentId: 6, population: 115224, area_km2: 702, currency_code: 'USD', phone_code: '+691', tld: '.fm' },
  { code: 'NR', name: 'Nauru', native_name: 'Nauru', capital: 'Yaren', continentId: 6, population: 10834, area_km2: 21, currency_code: 'AUD', phone_code: '+674', tld: '.nr' },
  { code: 'NZ', name: 'New Zealand', native_name: 'New Zealand', capital: 'Wellington', continentId: 6, population: 4822233, area_km2: 268838, currency_code: 'NZD', phone_code: '+64', tld: '.nz' },
  { code: 'PW', name: 'Palau', native_name: 'Palau', capital: 'Ngerulmud', continentId: 6, population: 18094, area_km2: 459, currency_code: 'USD', phone_code: '+680', tld: '.pw' },
  { code: 'PG', name: 'Papua New Guinea', native_name: 'Papua New Guinea', capital: 'Port Moresby', continentId: 6, population: 8947024, area_km2: 462840, currency_code: 'PGK', phone_code: '+675', tld: '.pg' },
  { code: 'WS', name: 'Samoa', native_name: 'Samoa', capital: 'Apia', continentId: 6, population: 198414, area_km2: 2842, currency_code: 'WST', phone_code: '+685', tld: '.ws' },
  { code: 'SB', name: 'Solomon Islands', native_name: 'Solomon Islands', capital: 'Honiara', continentId: 6, population: 686884, area_km2: 28896, currency_code: 'SBD', phone_code: '+677', tld: '.sb' },
  { code: 'TO', name: 'Tonga', native_name: 'Tonga', capital: "Nuku'alofa", continentId: 6, population: 105695, area_km2: 747, currency_code: 'TOP', phone_code: '+676', tld: '.to' },
  { code: 'TV', name: 'Tuvalu', native_name: 'Tuvalu', capital: 'Funafuti', continentId: 6, population: 11792, area_km2: 26, currency_code: 'AUD', phone_code: '+688', tld: '.tv' },
  { code: 'VU', name: 'Vanuatu', native_name: 'Vanuatu', capital: 'Port Vila', continentId: 6, population: 307145, area_km2: 12189, currency_code: 'VUV', phone_code: '+678', tld: '.vu' }
];

async function addCountries() {
  console.log('🌍 Adding countries using Admin API...\n');
  console.log(`📊 Total countries to add: ${countriesData.length}\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  // Process in batches to avoid overwhelming the server
  const batchSize = 10;
  for (let i = 0; i < countriesData.length; i += batchSize) {
    const batch = countriesData.slice(i, i + batchSize);
    console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}...`);

    for (const country of batch) {
      try {
        const response = await axios.post(`${API_URL}/countries`, country);
        if (response.status === 201 || response.status === 200) {
          console.log(`✅ Added: ${country.name} (${country.code})`);
          success++;
        }
      } catch (error) {
        if (error.response?.status === 409) {
          console.log(`⏭️ Skipped: ${country.name} (${country.code}) - Already exists`);
          skipped++;
        } else {
          console.log(`❌ Failed: ${country.name} (${country.code}) - ${error.response?.data?.message || error.message}`);
          failed++;
        }
      }
    }

    // Small delay between batches
    if (i + batchSize < countriesData.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY:');
  console.log(`✅ Added: ${success} countries`);
  console.log(`⏭️ Skipped (already exist): ${skipped} countries`);
  console.log(`❌ Failed: ${failed} countries`);
  console.log(`📦 Total: ${countriesData.length} countries processed`);
  console.log('='.repeat(60));

  // Get final count
  try {
    const response = await axios.get(`${API_URL}/countries`);
    console.log(`\n📋 Total countries in database: ${response.data.data?.length || 0}`);
  } catch (error) {
    console.log('❌ Failed to fetch updated country list');
  }
}

// Run the script
addCountries();