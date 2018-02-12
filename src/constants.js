import firebase from 'firebase';


const firebaseConfig = {
        apiKey: "AIzaSyDE8NZE2jaNKhzwjByFRqXf5Sm5K3NADqY",
        authDomain: "linkbook-42b28.firebaseapp.com",
        databaseURL: "https://linkbook-42b28.firebaseio.com",
        projectId: "linkbook-42b28",
        storageBucket: "linkbook-42b28.appspot.com",
        messagingSenderId: "59078078591"
}; 

const myFirebase = firebase.initializeApp(firebaseConfig);

//Google Custom Search Engine stuff!
const googleKey = "AIzaSyCpQ5CkdlqSPywmeu_lhz3uWNSSMAHyny4";  // AIzaSyCpQ5CkdlqSPywmeu_lhz3uWNSSMAHyny4
const fileType = "filetype%3Ahtml+OR+filetype%3Ahtm";
const cx1 = "cx=005579053927430989962:lqwgft535oi";
const cx2 = "cx=005579053927430989962:9qysdklbzos"; 
const cx3 = "cx=005579053927430989962:hjvbd5o9ypk";
const cx4 = "cx=005579053927430989962:3yc-pilyvzg";
const cx5 = "cx=005579053927430989962:71icgbjtv7m";
const cx6 = "cx=005579053927430989962:qyyhychfj2m";
const cx7 = "cx=005579053927430989962:b9y5tc67mhs";

const googleUrl = `https://www.googleapis.com/customsearch/v1?key=${googleKey}&${fileType}`;
//Youtube stuff
const youtubeKey = 'AIzaSyAex9r8nBUpai_MsMl603GpSXSvIwRdiF4'; //AIzaSyAex9r8nBUpai_MsMl603GpSXSvIwRdiF4
const youtubeUrl = 'https://www.googleapis.com/youtube/v3/search';

const NEWS = 'Actualités';
const ENCYCLOPEDIAS = 'Encyclopédies';
const REVIEWS = 'Avis de lecteurs' ;
const ON_THE_WEB = 'Sur le web';
const AUDIO = 'Audio';
const VIDEOS = 'Vidéos';
const SOCIAL = 'Social';
const BLOG = 'Blog';

export {
    myFirebase,
    googleUrl,
    cx1, cx2, cx3, cx4, cx5, cx6, cx7,
    youtubeKey,
    youtubeUrl,
    NEWS, ENCYCLOPEDIAS, REVIEWS, AUDIO, VIDEOS, ON_THE_WEB, SOCIAL, BLOG
}


