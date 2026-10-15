export type Word = {id:string;arabic:string;meaning:string;latin:string;example:string;translation:string};
export const themes = [
 {id:1,name:"Hobi & kesukaan",arabic:"الْهِوَايَاتُ",icon:"✿",label:"Al-Hiwāyāt",description:"Ceritakan hal-hal yang kamu sukai.",color:"pink"},
 {id:2,name:"Keluarga",arabic:"الْأُسْرَةُ",icon:"⌂",label:"Al-Usrah",description:"Kenali orang-orang terdekatmu.",color:"green"},
 {id:3,name:"Di sekolah",arabic:"الْمَدْرَسَةُ",icon:"✎",label:"Al-Madrasah",description:"Kata kecil untuk hari belajar.",color:"cream"}
];
const rows: [number,string,string,string,string,string][] = [
 [1,"قِرَاءَةٌ","Membaca","qirā’ah","أُحِبُّ الْقِرَاءَةَ.","Saya suka membaca."],
 [1,"رَسْمٌ","Menggambar","rasm","أُحِبُّ الرَّسْمَ.","Saya suka menggambar."],
 [1,"سِبَاحَةٌ","Berenang","sibāḥah","أُمَارِسُ السِّبَاحَةَ.","Saya berlatih berenang."],
 [1,"كُرَةُ الْقَدَمِ","Sepak bola","kurat al-qadam","أَلْعَبُ كُرَةَ الْقَدَمِ.","Saya bermain sepak bola."],
 [1,"طَبْخٌ","Memasak","ṭabkh","أُحِبُّ الطَّبْخَ.","Saya suka memasak."],
 [1,"تَصْوِيرٌ","Fotografi","taṣwīr","هِوَايَتِي التَّصْوِيرُ.","Hobi saya fotografi."],
 [1,"كِتَابَةٌ","Menulis","kitābah","أُحِبُّ الْكِتَابَةَ.","Saya suka menulis."],
 [1,"سَفَرٌ","Bepergian","safar","أُحِبُّ السَّفَرَ.","Saya suka bepergian."],
 [1,"جَرْيٌ","Berlari","jary","أُمَارِسُ الْجَرْيَ صَبَاحًا.","Saya berlatih berlari pada pagi hari."],
 [1,"هِوَايَةٌ","Hobi","hiwāyah","الْقِرَاءَةُ هِوَايَتِي.","Membaca adalah hobi saya."],
 [2,"أَبٌ","Ayah","ab","أَبِي فِي الْبَيْتِ.","Ayah saya berada di rumah."],
 [2,"أُمٌّ","Ibu","umm","أُمِّي مُعَلِّمَةٌ.","Ibu saya seorang guru."],
 [2,"أَخٌ","Saudara laki-laki","akh","أَخِي طَالِبٌ.","Saudara laki-laki saya seorang pelajar."],
 [2,"أُخْتٌ","Saudara perempuan","ukht","أُخْتِي تَقْرَأُ كِتَابًا.","Saudara perempuan saya membaca buku."],
 [2,"جَدٌّ","Kakek","jadd","جَدِّي فِي الْحَدِيقَةِ.","Kakek saya berada di taman."],
 [2,"جَدَّةٌ","Nenek","jaddah","جَدَّتِي تَطْبُخُ.","Nenek saya memasak."],
 [2,"أُسْرَةٌ","Keluarga","usrah","أُحِبُّ أُسْرَتِي.","Saya menyayangi keluarga saya."],
 [2,"اِبْنٌ","Anak laki-laki","ibn","هَذَا اِبْنِي.","Ini anak laki-laki saya."],
 [2,"بِنْتٌ","Anak perempuan","bint","هَذِهِ بِنْتِي.","Ini anak perempuan saya."],
 [2,"بَيْتٌ","Rumah","bayt","بَيْتِي قَرِيبٌ.","Rumah saya dekat."],
 [3,"كِتَابٌ","Buku","kitāb","هَذَا كِتَابٌ جَدِيدٌ.","Ini buku baru."],
 [3,"قَلَمٌ","Pena","qalam","هَذَا قَلَمِي.","Ini pena saya."],
 [3,"مَدْرَسَةٌ","Sekolah","madrasah","أَذْهَبُ إِلَى الْمَدْرَسَةِ.","Saya pergi ke sekolah."],
 [3,"مُعَلِّمٌ","Guru laki-laki","mu‘allim","الْمُعَلِّمُ يَشْرَحُ الدَّرْسَ.","Guru menjelaskan pelajaran."],
 [3,"طَالِبٌ","Pelajar laki-laki","ṭālib","أَنَا طَالِبٌ.","Saya seorang pelajar."],
 [3,"فَصْلٌ","Kelas","faṣl","الْفَصْلُ نَظِيفٌ.","Kelas itu bersih."],
 [3,"سَبُّورَةٌ","Papan tulis","sabbūrah","السَّبُّورَةُ كَبِيرَةٌ.","Papan tulis itu besar."],
 [3,"حَقِيبَةٌ","Tas","ḥaqībah","حَقِيبَتِي جَدِيدَةٌ.","Tas saya baru."],
 [3,"دَفْتَرٌ","Buku tulis","daftar","أَكْتُبُ فِي الدَّفْتَرِ.","Saya menulis di buku tulis."],
 [3,"دَرْسٌ","Pelajaran","dars","الدَّرْسُ سَهْلٌ.","Pelajaran itu mudah."]
];
export const words = rows.map((r,i)=>({id:String(i+1),theme:r[0],arabic:r[1],meaning:r[2],latin:r[3],example:r[4],translation:r[5]}));
export type Progress = {known:string[];favorites:string[];reviews:number;lastTheme:number};
export const emptyProgress:Progress = {known:[],favorites:[],reviews:0,lastTheme:1};
