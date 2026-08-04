-- ======================================================
-- Complete Languages Transliteration Data (20×20 Matrix)
-- File: 02_languages_transliteration_insert.sql
-- Description: Full transliteration matrix - all 20 languages
--              transliterated into all 20 languages
-- ======================================================

INSERT INTO language_transliterations (
    language_id,
    transliteration_language_id,
    transliterated_name
) VALUES

-- ======================================================
-- ENGLISH (en) - language_id: 1
-- ======================================================
(1, 1, 'English'),        -- English → English
(1, 2, 'الإنجليزية'),      -- English → Arabic
(1, 3, 'ইংরেজি'),         -- English → Bangla
(1, 4, '英语'),            -- English → Chinese
(1, 5, 'Anglais'),        -- English → French
(1, 6, 'Englisch'),       -- English → German
(1, 7, 'अंग्रेज़ी'),      -- English → Hindi
(1, 8, 'Inglese'),        -- English → Italian
(1, 9, '英語'),            -- English → Japanese
(1, 10, 'ಇಂಗ್ಲಿಷ್'),      -- English → Kannada
(1, 11, '영어'),           -- English → Korean
(1, 12, 'ഇംഗ്ലീഷ്'),      -- English → Malayalam
(1, 13, 'इंग्रजी'),       -- English → Marathi
(1, 14, 'انګلیسي'),       -- English → Pashto
(1, 15, 'انگلیسی'),       -- English → Persian
(1, 16, 'Английский'),    -- English → Russian
(1, 17, 'Inglés'),        -- English → Spanish
(1, 18, 'ஆங்கிலம்'),      -- English → Tamil
(1, 19, 'ఇంగ్లీష్'),      -- English → Telugu
(1, 20, 'انگریزی'),       -- English → Urdu

-- ======================================================
-- ARABIC (ar) - language_id: 2
-- ======================================================
(2, 1, 'Arabic'),         -- Arabic → English
(2, 2, 'العربية'),        -- Arabic → Arabic
(2, 3, 'আরবি'),           -- Arabic → Bangla
(2, 4, '阿拉伯语'),        -- Arabic → Chinese
(2, 5, 'Arabe'),          -- Arabic → French
(2, 6, 'Arabisch'),       -- Arabic → German
(2, 7, 'अरबी'),           -- Arabic → Hindi
(2, 8, 'Arabo'),          -- Arabic → Italian
(2, 9, 'アラビア語'),      -- Arabic → Japanese
(2, 10, 'ಅರಬಿಕ್'),        -- Arabic → Kannada
(2, 11, '아랍어'),         -- Arabic → Korean
(2, 12, 'അറബിക്'),       -- Arabic → Malayalam
(2, 13, 'अरबी'),          -- Arabic → Marathi
(2, 14, 'عربي'),          -- Arabic → Pashto
(2, 15, 'عربی'),          -- Arabic → Persian
(2, 16, 'Арабский'),      -- Arabic → Russian
(2, 17, 'Árabe'),         -- Arabic → Spanish
(2, 18, 'அரபிக்'),        -- Arabic → Tamil
(2, 19, 'అరబిక్'),        -- Arabic → Telugu
(2, 20, 'عربی'),          -- Arabic → Urdu

-- ======================================================
-- BANGLA (bn) - language_id: 3
-- ======================================================
(3, 1, 'Bangla'),         -- Bangla → English
(3, 2, 'البنغالية'),      -- Bangla → Arabic
(3, 3, 'বাংলা'),          -- Bangla → Bangla
(3, 4, '孟加拉语'),        -- Bangla → Chinese
(3, 5, 'Bengali'),        -- Bangla → French
(3, 6, 'Bengalisch'),     -- Bangla → German
(3, 7, 'बांग्ला'),        -- Bangla → Hindi
(3, 8, 'Bengalese'),      -- Bangla → Italian
(3, 9, 'ベンガル語'),      -- Bangla → Japanese
(3, 10, 'ಬಾಂಗ್ಲಾ'),      -- Bangla → Kannada
(3, 11, '벵골어'),         -- Bangla → Korean
(3, 12, 'ബംഗാളി'),       -- Bangla → Malayalam
(3, 13, 'बंगाली'),        -- Bangla → Marathi
(3, 14, 'بنگالي'),        -- Bangla → Pashto
(3, 15, 'بنگالی'),        -- Bangla → Persian
(3, 16, 'Бенгальский'),   -- Bangla → Russian
(3, 17, 'Bengalí'),       -- Bangla → Spanish
(3, 18, 'பங்களா'),        -- Bangla → Tamil
(3, 19, 'బంగ్లా'),        -- Bangla → Telugu
(3, 20, 'بنگالی'),        -- Bangla → Urdu

-- ======================================================
-- CHINESE (zh) - language_id: 4
-- ======================================================
(4, 1, 'Chinese'),        -- Chinese → English
(4, 2, 'الصينية'),        -- Chinese → Arabic
(4, 3, 'চীনা'),           -- Chinese → Bangla
(4, 4, '中文'),            -- Chinese → Chinese
(4, 5, 'Chinois'),        -- Chinese → French
(4, 6, 'Chinesisch'),     -- Chinese → German
(4, 7, 'चीनी'),           -- Chinese → Hindi
(4, 8, 'Cinese'),         -- Chinese → Italian
(4, 9, '中国語'),          -- Chinese → Japanese
(4, 10, 'ಚೈನೀಸ್'),       -- Chinese → Kannada
(4, 11, '중국어'),         -- Chinese → Korean
(4, 12, 'ചൈനീസ്'),      -- Chinese → Malayalam
(4, 13, 'चीनी'),          -- Chinese → Marathi
(4, 14, 'چيني'),          -- Chinese → Pashto
(4, 15, 'چینی'),          -- Chinese → Persian
(4, 16, 'Китайский'),     -- Chinese → Russian
(4, 17, 'Chino'),         -- Chinese → Spanish
(4, 18, 'சீன'),           -- Chinese → Tamil
(4, 19, 'చైనీస్'),        -- Chinese → Telugu
(4, 20, 'چینی'),          -- Chinese → Urdu

-- ======================================================
-- FRENCH (fr) - language_id: 5
-- ======================================================
(5, 1, 'French'),         -- French → English
(5, 2, 'الفرنسية'),       -- French → Arabic
(5, 3, 'ফরাসি'),          -- French → Bangla
(5, 4, '法语'),            -- French → Chinese
(5, 5, 'Français'),       -- French → French
(5, 6, 'Französisch'),    -- French → German
(5, 7, 'फ्रेंच'),         -- French → Hindi
(5, 8, 'Francese'),       -- French → Italian
(5, 9, 'フランス語'),      -- French → Japanese
(5, 10, 'ಫ್ರೆಂಚ್'),      -- French → Kannada
(5, 11, '프랑스어'),       -- French → Korean
(5, 12, 'ഫ്രഞ്ച്'),      -- French → Malayalam
(5, 13, 'फ्रेंच'),        -- French → Marathi
(5, 14, 'فرانسوي'),       -- French → Pashto
(5, 15, 'فرانسوی'),       -- French → Persian
(5, 16, 'Французский'),   -- French → Russian
(5, 17, 'Francés'),       -- French → Spanish
(5, 18, 'பிரஞ்சு'),       -- French → Tamil
(5, 19, 'ఫ్రెంచ్'),      -- French → Telugu
(5, 20, 'فرانسیسی'),      -- French → Urdu

-- ======================================================
-- GERMAN (de) - language_id: 6
-- ======================================================
(6, 1, 'German'),         -- German → English
(6, 2, 'الألمانية'),      -- German → Arabic
(6, 3, 'জার্মান'),        -- German → Bangla
(6, 4, '德语'),            -- German → Chinese
(6, 5, 'Allemand'),       -- German → French
(6, 6, 'Deutsch'),        -- German → German
(6, 7, 'जर्मन'),          -- German → Hindi
(6, 8, 'Tedesco'),        -- German → Italian
(6, 9, 'ドイツ語'),        -- German → Japanese
(6, 10, 'ಜರ್ಮನ್'),       -- German → Kannada
(6, 11, '독일어'),         -- German → Korean
(6, 12, 'ജർമ്മൻ'),      -- German → Malayalam
(6, 13, 'जर्मन'),         -- German → Marathi
(6, 14, 'جرمني'),         -- German → Pashto
(6, 15, 'آلمانی'),        -- German → Persian
(6, 16, 'Немецкий'),      -- German → Russian
(6, 17, 'Alemán'),        -- German → Spanish
(6, 18, 'ஜெர்மன்'),       -- German → Tamil
(6, 19, 'జర్మన్'),        -- German → Telugu
(6, 20, 'جرمن'),          -- German → Urdu

-- ======================================================
-- HINDI (hi) - language_id: 7
-- ======================================================
(7, 1, 'Hindi'),          -- Hindi → English
(7, 2, 'الهندية'),        -- Hindi → Arabic
(7, 3, 'হিন্দি'),         -- Hindi → Bangla
(7, 4, '印地语'),          -- Hindi → Chinese
(7, 5, 'Hindi'),          -- Hindi → French
(7, 6, 'Hindi'),          -- Hindi → German
(7, 7, 'हिंदी'),          -- Hindi → Hindi
(7, 8, 'Hindi'),          -- Hindi → Italian
(7, 9, 'ヒンディー語'),    -- Hindi → Japanese
(7, 10, 'ಹಿಂದಿ'),        -- Hindi → Kannada
(7, 11, '힌디어'),         -- Hindi → Korean
(7, 12, 'ഹിന്ദി'),       -- Hindi → Malayalam
(7, 13, 'हिंदी'),         -- Hindi → Marathi
(7, 14, 'هندي'),          -- Hindi → Pashto
(7, 15, 'هندی'),          -- Hindi → Persian
(7, 16, 'Хинди'),         -- Hindi → Russian
(7, 17, 'Hindi'),         -- Hindi → Spanish
(7, 18, 'இந்தி'),         -- Hindi → Tamil
(7, 19, 'హిందీ'),        -- Hindi → Telugu
(7, 20, 'ہندی'),          -- Hindi → Urdu

-- ======================================================
-- ITALIAN (it) - language_id: 8
-- ======================================================
(8, 1, 'Italian'),        -- Italian → English
(8, 2, 'الإيطالية'),      -- Italian → Arabic
(8, 3, 'ইতালিয়ান'),      -- Italian → Bangla
(8, 4, '意大利语'),        -- Italian → Chinese
(8, 5, 'Italien'),        -- Italian → French
(8, 6, 'Italienisch'),    -- Italian → German
(8, 7, 'इतालवी'),        -- Italian → Hindi
(8, 8, 'Italiano'),       -- Italian → Italian
(8, 9, 'イタリア語'),      -- Italian → Japanese
(8, 10, 'ಇಟಾಲಿಯನ್'),    -- Italian → Kannada
(8, 11, '이탈리아어'),     -- Italian → Korean
(8, 12, 'ഇറ്റാലിയൻ'),   -- Italian → Malayalam
(8, 13, 'इटालियन'),      -- Italian → Marathi
(8, 14, 'ایټالوي'),       -- Italian → Pashto
(8, 15, 'ایتالیایی'),     -- Italian → Persian
(8, 16, 'Итальянский'),   -- Italian → Russian
(8, 17, 'Italiano'),      -- Italian → Spanish
(8, 18, 'இத்தாலியன்'),    -- Italian → Tamil
(8, 19, 'ఇటాలియన్'),     -- Italian → Telugu
(8, 20, 'اطالوی'),        -- Italian → Urdu

-- ======================================================
-- JAPANESE (ja) - language_id: 9
-- ======================================================
(9, 1, 'Japanese'),       -- Japanese → English
(9, 2, 'اليابانية'),      -- Japanese → Arabic
(9, 3, 'জাপানি'),         -- Japanese → Bangla
(9, 4, '日语'),            -- Japanese → Chinese
(9, 5, 'Japonais'),       -- Japanese → French
(9, 6, 'Japanisch'),      -- Japanese → German
(9, 7, 'जापानी'),         -- Japanese → Hindi
(9, 8, 'Giapponese'),     -- Japanese → Italian
(9, 9, '日本語'),          -- Japanese → Japanese
(9, 10, 'ಜಪಾನೀಸ್'),     -- Japanese → Kannada
(9, 11, '일본어'),         -- Japanese → Korean
(9, 12, 'ജാപ്പനീസ്'),   -- Japanese → Malayalam
(9, 13, 'जपानी'),         -- Japanese → Marathi
(9, 14, 'جاپاني'),        -- Japanese → Pashto
(9, 15, 'ژاپنی'),         -- Japanese → Persian
(9, 16, 'Японский'),      -- Japanese → Russian
(9, 17, 'Japonés'),       -- Japanese → Spanish
(9, 18, 'ஜப்பானியம்'),    -- Japanese → Tamil
(9, 19, 'జపనీస్'),       -- Japanese → Telugu
(9, 20, 'جاپانی'),        -- Japanese → Urdu

-- ======================================================
-- KANNADA (kn) - language_id: 10
-- ======================================================
(10, 1, 'Kannada'),       -- Kannada → English
(10, 2, 'الكانادا'),      -- Kannada → Arabic
(10, 3, 'কন্নড়'),        -- Kannada → Bangla
(10, 4, '卡纳达语'),       -- Kannada → Chinese
(10, 5, 'Kannada'),       -- Kannada → French
(10, 6, 'Kannada'),       -- Kannada → German
(10, 7, 'कन्नड़'),        -- Kannada → Hindi
(10, 8, 'Kannada'),       -- Kannada → Italian
(10, 9, 'カンナダ語'),     -- Kannada → Japanese
(10, 10, 'ಕನ್ನಡ'),        -- Kannada → Kannada
(10, 11, '칸나다어'),      -- Kannada → Korean
(10, 12, 'കന്നഡ'),       -- Kannada → Malayalam
(10, 13, 'कन्नड'),        -- Kannada → Marathi
(10, 14, 'کنډا'),         -- Kannada → Pashto
(10, 15, 'کانادا'),       -- Kannada → Persian
(10, 16, 'Каннада'),      -- Kannada → Russian
(10, 17, 'Canarés'),      -- Kannada → Spanish
(10, 18, 'கன்னடம்'),      -- Kannada → Tamil
(10, 19, 'కన్నడ'),        -- Kannada → Telugu
(10, 20, 'کنڑ'),          -- Kannada → Urdu

-- ======================================================
-- KOREAN (ko) - language_id: 11
-- ======================================================
(11, 1, 'Korean'),        -- Korean → English
(11, 2, 'الكورية'),       -- Korean → Arabic
(11, 3, 'কোরিয়ান'),      -- Korean → Bangla
(11, 4, '韩语'),           -- Korean → Chinese
(11, 5, 'Coréen'),        -- Korean → French
(11, 6, 'Koreanisch'),    -- Korean → German
(11, 7, 'कोरियाई'),       -- Korean → Hindi
(11, 8, 'Coreano'),       -- Korean → Italian
(11, 9, '韓国語'),         -- Korean → Japanese
(11, 10, 'ಕೊರಿಯನ್'),     -- Korean → Kannada
(11, 11, '한국어'),        -- Korean → Korean
(11, 12, 'കൊറിയൻ'),     -- Korean → Malayalam
(11, 13, 'कोरियन'),       -- Korean → Marathi
(11, 14, 'کوریایي'),      -- Korean → Pashto
(11, 15, 'کره‌ای'),       -- Korean → Persian
(11, 16, 'Корейский'),    -- Korean → Russian
(11, 17, 'Coreano'),      -- Korean → Spanish
(11, 18, 'கொரியன்'),      -- Korean → Tamil
(11, 19, 'కొరియన్'),      -- Korean → Telugu
(11, 20, 'کورین'),        -- Korean → Urdu

-- ======================================================
-- MALAYALAM (ml) - language_id: 12
-- ======================================================
(12, 1, 'Malayalam'),     -- Malayalam → English
(12, 2, 'المالايالام'),   -- Malayalam → Arabic
(12, 3, 'মালয়ালম'),      -- Malayalam → Bangla
(12, 4, '马拉雅拉姆语'),    -- Malayalam → Chinese
(12, 5, 'Malayalam'),     -- Malayalam → French
(12, 6, 'Malayalam'),     -- Malayalam → German
(12, 7, 'मलयालम'),       -- Malayalam → Hindi
(12, 8, 'Malayalam'),     -- Malayalam → Italian
(12, 9, 'マラヤーラム語'),  -- Malayalam → Japanese
(12, 10, 'ಮಲಯಾಳಂ'),     -- Malayalam → Kannada
(12, 11, '말라얄람어'),    -- Malayalam → Korean
(12, 12, 'മലയാളം'),      -- Malayalam → Malayalam
(12, 13, 'मल्याळम'),      -- Malayalam → Marathi
(12, 14, 'ملایالم'),      -- Malayalam → Pashto
(12, 15, 'مالایالم'),     -- Malayalam → Persian
(12, 16, 'Малаялам'),     -- Malayalam → Russian
(12, 17, 'Malayalam'),    -- Malayalam → Spanish
(12, 18, 'மலையாளம்'),     -- Malayalam → Tamil
(12, 19, 'మలయాళం'),      -- Malayalam → Telugu
(12, 20, 'ملیالم'),       -- Malayalam → Urdu

-- ======================================================
-- MARATHI (mr) - language_id: 13
-- ======================================================
(13, 1, 'Marathi'),       -- Marathi → English
(13, 2, 'الماراثية'),     -- Marathi → Arabic
(13, 3, 'মারাঠি'),        -- Marathi → Bangla
(13, 4, '马拉地语'),       -- Marathi → Chinese
(13, 5, 'Marathi'),       -- Marathi → French
(13, 6, 'Marathi'),       -- Marathi → German
(13, 7, 'मराठी'),         -- Marathi → Hindi
(13, 8, 'Marathi'),       -- Marathi → Italian
(13, 9, 'マラーティー語'),  -- Marathi → Japanese
(13, 10, 'ಮರಾಠಿ'),       -- Marathi → Kannada
(13, 11, '마라티어'),      -- Marathi → Korean
(13, 12, 'മറാത്തി'),     -- Marathi → Malayalam
(13, 13, 'मराठी'),        -- Marathi → Marathi
(13, 14, 'مراټي'),        -- Marathi → Pashto
(13, 15, 'مراتی'),        -- Marathi → Persian
(13, 16, 'Маратхи'),      -- Marathi → Russian
(13, 17, 'Maratí'),       -- Marathi → Spanish
(13, 18, 'மராத்தி'),      -- Marathi → Tamil
(13, 19, 'మరాఠీ'),       -- Marathi → Telugu
(13, 20, 'مراٹھی'),       -- Marathi → Urdu

-- ======================================================
-- PASHTO (ps) - language_id: 14
-- ======================================================
(14, 1, 'Pashto'),        -- Pashto → English
(14, 2, 'البشتوية'),      -- Pashto → Arabic
(14, 3, 'পশতু'),          -- Pashto → Bangla
(14, 4, '普什图语'),       -- Pashto → Chinese
(14, 5, 'Pachto'),        -- Pashto → French
(14, 6, 'Paschtu'),       -- Pashto → German
(14, 7, 'पश्तो'),         -- Pashto → Hindi
(14, 8, 'Pashto'),        -- Pashto → Italian
(14, 9, 'パシュトー語'),    -- Pashto → Japanese
(14, 10, 'ಪಷ್ಟೊ'),       -- Pashto → Kannada
(14, 11, '파슈토어'),      -- Pashto → Korean
(14, 12, 'പഷ്തോ'),       -- Pashto → Malayalam
(14, 13, 'पश्तो'),        -- Pashto → Marathi
(14, 14, 'پښتو'),         -- Pashto → Pashto
(14, 15, 'پشتو'),         -- Pashto → Persian
(14, 16, 'Пушту'),        -- Pashto → Russian
(14, 17, 'Pastún'),       -- Pashto → Spanish
(14, 18, 'பஷ்தோ'),        -- Pashto → Tamil
(14, 19, 'పష్టో'),        -- Pashto → Telugu
(14, 20, 'پشتو'),         -- Pashto → Urdu

-- ======================================================
-- PERSIAN (fa) - language_id: 15
-- ======================================================
(15, 1, 'Persian'),       -- Persian → English
(15, 2, 'الفارسية'),      -- Persian → Arabic
(15, 3, 'ফার্সি'),        -- Persian → Bangla
(15, 4, '波斯语'),         -- Persian → Chinese
(15, 5, 'Persan'),        -- Persian → French
(15, 6, 'Persisch'),      -- Persian → German
(15, 7, 'फ़ारसी'),        -- Persian → Hindi
(15, 8, 'Persiano'),      -- Persian → Italian
(15, 9, 'ペルシア語'),     -- Persian → Japanese
(15, 10, 'ಪರ್ಷಿಯನ್'),    -- Persian → Kannada
(15, 11, '페르시아어'),    -- Persian → Korean
(15, 12, 'പേർഷ്യൻ'),    -- Persian → Malayalam
(15, 13, 'फारसी'),        -- Persian → Marathi
(15, 14, 'فارسي'),        -- Persian → Pashto
(15, 15, 'فارسی'),        -- Persian → Persian
(15, 16, 'Персидский'),   -- Persian → Russian
(15, 17, 'Persa'),        -- Persian → Spanish
(15, 18, 'பாரசீக'),       -- Persian → Tamil
(15, 19, 'పర్షియన్'),    -- Persian → Telugu
(15, 20, 'فارسی'),        -- Persian → Urdu

-- ======================================================
-- RUSSIAN (ru) - language_id: 16
-- ======================================================
(16, 1, 'Russian'),       -- Russian → English
(16, 2, 'الروسية'),       -- Russian → Arabic
(16, 3, 'রুশ'),           -- Russian → Bangla
(16, 4, '俄语'),           -- Russian → Chinese
(16, 5, 'Russe'),         -- Russian → French
(16, 6, 'Russisch'),      -- Russian → German
(16, 7, 'रूसी'),          -- Russian → Hindi
(16, 8, 'Russo'),         -- Russian → Italian
(16, 9, 'ロシア語'),       -- Russian → Japanese
(16, 10, 'ರಷ್ಯನ್'),      -- Russian → Kannada
(16, 11, '러시아어'),      -- Russian → Korean
(16, 12, 'റഷ്യൻ'),      -- Russian → Malayalam
(16, 13, 'रशियन'),       -- Russian → Marathi
(16, 14, 'روسي'),         -- Russian → Pashto
(16, 15, 'روسی'),         -- Russian → Persian
(16, 16, 'Русский'),      -- Russian → Russian
(16, 17, 'Ruso'),         -- Russian → Spanish
(16, 18, 'ருசியன்'),      -- Russian → Tamil
(16, 19, 'రష్యన్'),      -- Russian → Telugu
(16, 20, 'روسی'),         -- Russian → Urdu

-- ======================================================
-- SPANISH (es) - language_id: 17
-- ======================================================
(17, 1, 'Spanish'),       -- Spanish → English
(17, 2, 'الإسبانية'),     -- Spanish → Arabic
(17, 3, 'স্প্যানিশ'),     -- Spanish → Bangla
(17, 4, '西班牙语'),       -- Spanish → Chinese
(17, 5, 'Espagnol'),      -- Spanish → French
(17, 6, 'Spanisch'),      -- Spanish → German
(17, 7, 'स्पेनिश'),       -- Spanish → Hindi
(17, 8, 'Spagnolo'),      -- Spanish → Italian
(17, 9, 'スペイン語'),     -- Spanish → Japanese
(17, 10, 'ಸ್ಪ್ಯಾನಿಷ್'),  -- Spanish → Kannada
(17, 11, '스페인어'),      -- Spanish → Korean
(17, 12, 'സ്പാനിഷ്'),   -- Spanish → Malayalam
(17, 13, 'स्पॅनिश'),     -- Spanish → Marathi
(17, 14, 'هسپانوي'),      -- Spanish → Pashto
(17, 15, 'اسپانیایی'),    -- Spanish → Persian
(17, 16, 'Испанский'),    -- Spanish → Russian
(17, 17, 'Español'),      -- Spanish → Spanish
(17, 18, 'ஸ்பானிஷ்'),     -- Spanish → Tamil
(17, 19, 'స్పానిష్'),    -- Spanish → Telugu
(17, 20, 'ہسپانوی'),      -- Spanish → Urdu

-- ======================================================
-- TAMIL (ta) - language_id: 18
-- ======================================================
(18, 1, 'Tamil'),         -- Tamil → English
(18, 2, 'التاميلية'),     -- Tamil → Arabic
(18, 3, 'তামিল'),         -- Tamil → Bangla
(18, 4, '泰米尔语'),       -- Tamil → Chinese
(18, 5, 'Tamoul'),        -- Tamil → French
(18, 6, 'Tamilisch'),     -- Tamil → German
(18, 7, 'तमिल'),          -- Tamil → Hindi
(18, 8, 'Tamil'),         -- Tamil → Italian
(18, 9, 'タミル語'),       -- Tamil → Japanese
(18, 10, 'ತಮಿಳು'),       -- Tamil → Kannada
(18, 11, '타밀어'),        -- Tamil → Korean
(18, 12, 'തമിഴ്'),       -- Tamil → Malayalam
(18, 13, 'तमिळ'),         -- Tamil → Marathi
(18, 14, 'تامل'),         -- Tamil → Pashto
(18, 15, 'تامیلی'),       -- Tamil → Persian
(18, 16, 'Тамильский'),   -- Tamil → Russian
(18, 17, 'Tamil'),        -- Tamil → Spanish
(18, 18, 'தமிழ்'),        -- Tamil → Tamil
(18, 19, 'తమిళ్'),       -- Tamil → Telugu
(18, 20, 'تمل'),          -- Tamil → Urdu

-- ======================================================
-- TELUGU (te) - language_id: 19
-- ======================================================
(19, 1, 'Telugu'),        -- Telugu → English
(19, 2, 'التيلوغوية'),    -- Telugu → Arabic
(19, 3, 'তেলুগু'),        -- Telugu → Bangla
(19, 4, '泰卢固语'),       -- Telugu → Chinese
(19, 5, 'Télougou'),      -- Telugu → French
(19, 6, 'Telugu'),        -- Telugu → German
(19, 7, 'तेलुगु'),        -- Telugu → Hindi
(19, 8, 'Telugu'),        -- Telugu → Italian
(19, 9, 'テルグ語'),       -- Telugu → Japanese
(19, 10, 'ತೆಲುಗು'),      -- Telugu → Kannada
(19, 11, '텔루구어'),      -- Telugu → Korean
(19, 12, 'തെലുങ്ക്'),    -- Telugu → Malayalam
(19, 13, 'तेलुगू'),       -- Telugu → Marathi
(19, 14, 'تيلګو'),        -- Telugu → Pashto
(19, 15, 'تلوگو'),        -- Telugu → Persian
(19, 16, 'Телугу'),       -- Telugu → Russian
(19, 17, 'Telugu'),       -- Telugu → Spanish
(19, 18, 'தெலுங்கு'),     -- Telugu → Tamil
(19, 19, 'తెలుగు'),       -- Telugu → Telugu
(19, 20, 'تیلگو'),        -- Telugu → Urdu

-- ======================================================
-- URDU (ur) - language_id: 20
-- ======================================================
(20, 1, 'Urdu'),          -- Urdu → English
(20, 2, 'الأردية'),       -- Urdu → Arabic
(20, 3, 'উর্দু'),         -- Urdu → Bangla
(20, 4, '乌尔都语'),       -- Urdu → Chinese
(20, 5, 'Ourdou'),        -- Urdu → French
(20, 6, 'Urdu'),          -- Urdu → German
(20, 7, 'उर्दू'),         -- Urdu → Hindi
(20, 8, 'Urdu'),          -- Urdu → Italian
(20, 9, 'ウルドゥー語'),   -- Urdu → Japanese
(20, 10, 'ಉರ್ದು'),       -- Urdu → Kannada
(20, 11, '우르두어'),      -- Urdu → Korean
(20, 12, 'ഉറുദു'),       -- Urdu → Malayalam
(20, 13, 'उर्दू'),        -- Urdu → Marathi
(20, 14, 'اردو'),         -- Urdu → Pashto
(20, 15, 'اردو'),         -- Urdu → Persian
(20, 16, 'Урду'),         -- Urdu → Russian
(20, 17, 'Urdu'),         -- Urdu → Spanish
(20, 18, 'உருது'),        -- Urdu → Tamil
(20, 19, 'ఉర్దూ'),       -- Urdu → Telugu
(20, 20, 'اردو');         -- Urdu → Urdu